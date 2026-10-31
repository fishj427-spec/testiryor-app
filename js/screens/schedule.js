// [РАСПИСАНИЕ ЗАНЯТИЙ] Интеграция с порталом УГНТУ (rasp.rusoil.net)
// Поддерживает два режима:
// 1. "synced" (VPN / Офлайн) — актуальная локальная база с API УГНТУ, открывается мгновенно под любым зарубежным VPN.
//    Показывает СЕГОДНЯ и будущие дни. Прошедшие дни НЕ показываются вообще.
// 2. "portal" (Прямой сайт) — встроенный фрейм rasp.rusoil.net для поиска других групп и преподавателей.

let scheduleViewMode = 'synced'; // 'synced' или 'portal'
let scheduleFilter = 'classes_only'; // 'all' или 'classes_only'
let scheduleSelectedWeek = 'auto'; // 'auto', 'all', или номер недели (например, 9, 10...)

// Считываем параметры из URL, если переданы
try {
    const _sp = typeof window !== "undefined" && window.location ? new URLSearchParams(window.location.search) : null;
    if (_sp) {
        if (_sp.has("mode")) {
            scheduleViewMode = _sp.get("mode") === "portal" ? "portal" : "synced";
        }
        if (_sp.has("week")) {
            const _w = _sp.get("week");
            scheduleSelectedWeek = _w === "all" ? "all" : (parseInt(_w, 10) || _w);
        }
        if (_sp.has("filter")) {
            scheduleFilter = _sp.get("filter");
        }
    }
} catch (e) {}

function showScheduleToast(text) {
    let toast = document.getElementById("schedule-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "schedule-toast";
        toast.className = "schedule-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.remove("show");
    void toast.offsetWidth; // force reflow
    toast.classList.add("show");
    if (window._scheduleToastTimer) clearTimeout(window._scheduleToastTimer);
    window._scheduleToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function copyScheduleLink(link, event) {
    if (event) event.stopPropagation();
    if (typeof vibrate === "function") vibrate(10);
    const textToCopy = link || "https://oiledu.ru";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showScheduleToast("✓ Ссылка скопирована");
        }).catch(() => {
            fallbackCopyText(textToCopy);
        });
    } else {
        fallbackCopyText(textToCopy);
    }
}

function fallbackCopyText(text) {
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showScheduleToast("✓ Ссылка скопирована");
    } catch (e) {
        showScheduleToast("Ссылка: " + text);
    }
}

function switchScheduleMode(mode) {
    if (typeof vibrate === "function") vibrate(8);
    scheduleViewMode = mode;
    renderSchedule();
}

function setScheduleFilter(filter) {
    if (typeof vibrate === "function") vibrate(8);
    scheduleFilter = filter;
    renderSchedule();
}

function setScheduleWeek(week) {
    if (typeof vibrate === "function") vibrate(8);
    scheduleSelectedWeek = week;
    renderSchedule();
}

function parseDayDate(rawDateStr) {
    if (!rawDateStr) return null;
    const parts = rawDateStr.split('.');
    if (parts.length === 3) {
        return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
    }
    return null;
}

function getTodayMidnight() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function getTodayRawDate() {
    const today = new Date();
    const d = String(today.getDate()).padStart(2, '0');
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    return `${d}.${m}.${y}`;
}

function scrollToTodaySchedule() {
    if (typeof vibrate === "function") vibrate(12);
    const todayCard = document.querySelector(".schedule-day-card.is-today");
    if (todayCard) {
        todayCard.scrollIntoView({ behavior: "smooth", block: "start" });
        showScheduleToast("Сегодня");
    } else {
        // Если сегодня скрыто фильтром недели, переключаем на 'all'
        if (scheduleSelectedWeek !== 'all') {
            scheduleSelectedWeek = 'all';
            renderSchedule();
            setTimeout(() => {
                const retryCard = document.querySelector(".schedule-day-card.is-today");
                if (retryCard) {
                    retryCard.scrollIntoView({ behavior: "smooth", block: "start" });
                    showScheduleToast("Сегодня");
                } else {
                    showScheduleToast("Сегодня нет в расписании");
                }
            }, 60);
        } else {
            showScheduleToast("Сегодня нет в расписании");
        }
    }
}

function showPortalLoading(show) {
    const overlay = document.getElementById("portal-loading-overlay");
    if (overlay) {
        if (show) overlay.classList.add("visible");
        else overlay.classList.remove("visible");
    }
}

function onPortalIframeLoad() {
    showPortalLoading(false);
}

function reloadSchedulePortal() {
    if (typeof vibrate === "function") vibrate(10);
    const frame = document.getElementById("schedule-portal-frame");
    if (frame) {
        showPortalLoading(true);
        try {
            frame.contentWindow.location.reload();
        } catch (e) {
            frame.src = "https://rasp.rusoil.net/?t=" + Date.now();
        }
    }
    showScheduleToast("Обновление rasp.rusoil.net...");
}

function openScheduleExternal() {
    if (typeof vibrate === "function") vibrate(10);
    const url = "https://rasp.rusoil.net/";
    if (window.Telegram?.WebApp?.openLink) {
        window.Telegram.WebApp.openLink(url);
    } else {
        window.open(url, "_blank");
    }
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderSchedule() {
    const container = document.getElementById("schedule-content");
    if (!container) return;

    const data = (typeof window !== "undefined" && window.SCHEDULE_DATA) ? window.SCHEDULE_DATA : [];
    const meta = (typeof window !== "undefined" && window.SCHEDULE_METADATA) ? window.SCHEDULE_METADATA : { group: "ББПЭ-23-31" };
    const todayStr = getTodayRawDate();
    const todayMidnight = getTodayMidnight();

    // 1. Обогащаем дни статусом: isToday и isPast
    const enrichedDays = data.map(d => {
        const dDate = parseDayDate(d.rawDate);
        const isToday = (d.rawDate === todayStr);
        const isPast = Boolean(dDate && (dDate.getTime() < todayMidnight.getTime()) && !isToday);
        return {
            ...d,
            isToday,
            isPast
        };
    });

    // 2. Строгое правило: прошлые дни НЕ показываем вообще!
    // Оставляем только СЕГОДНЯ и будущие дни
    const currentAndFutureDays = enrichedDays.filter(d => !d.isPast);

    // 3. Определяем текущую неделю и список актуальных недель (только текущая и будущие)
    let currentWeekNumber = 9; // Fallback
    const availableWeeksSet = new Set();
    enrichedDays.forEach(d => {
        if (d.rawDate === todayStr && d.weekNumber) {
            currentWeekNumber = d.weekNumber;
        }
    });

    currentAndFutureDays.forEach(d => {
        if (d.weekNumber) {
            availableWeeksSet.add(d.weekNumber);
        }
    });
    if (currentWeekNumber) availableWeeksSet.add(currentWeekNumber);
    const weeksList = Array.from(availableWeeksSet).sort((a, b) => a - b);

    // Если неделя 'auto', открываем актуальную текущую неделю
    let effectiveWeek = scheduleSelectedWeek;
    if (effectiveWeek === 'auto') {
        effectiveWeek = currentWeekNumber;
    }

    // Собираем шапку с переключателем режимов
    let html = `
        <!-- [ВЕРХНЯЯ ПАНЕЛЬ РАСПИСАНИЯ] -->
        <div class="schedule-top-nav">
            <div class="schedule-top-title-area">
                <div class="schedule-mode-toggle">
                    <button type="button" class="schedule-mode-btn ${scheduleViewMode === 'synced' ? 'active' : ''}" onclick="switchScheduleMode('synced')" title="Расписание с API УГНТУ (работает под любым VPN)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                        VPN / Офлайн
                    </button>
                    <button type="button" class="schedule-mode-btn ${scheduleViewMode === 'portal' ? 'active' : ''}" onclick="switchScheduleMode('portal')" title="Официальный онлайн-портал rasp.rusoil.net">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        Сайт УГНТУ
                    </button>
                </div>
            </div>

            <div class="schedule-top-actions">
    `;

    if (scheduleViewMode === 'synced') {
        html += `
                <button type="button" class="schedule-today-btn" onclick="scrollToTodaySchedule()" title="Перейти к сегодняшнему дню">
                    <span class="schedule-today-dot"></span>
                    Сегодня
                </button>
        `;
    } else {
        html += `
                <button type="button" class="schedule-action-btn" onclick="reloadSchedulePortal()" title="Обновить портал rasp.rusoil.net">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M23 4v6h-6"/>
                        <path d="M1 20v-6h6"/>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                    </svg>
                </button>
                <button type="button" class="schedule-action-btn" onclick="openScheduleExternal()" title="Открыть rasp.rusoil.net в браузере">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                </button>
        `;
    }

    html += `
            </div>
        </div>
    `;

    // Отображаем выбранный режим
    if (scheduleViewMode === 'portal') {
        html += `
            <!-- Предупреждение о блокировке зарубежных VPN -->
            <div class="schedule-portal-warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>Сервер УГНТУ блокирует зарубежные IP. Если страница не открывается, отключите VPN или переключитесь на «VPN / Офлайн».</span>
            </div>

            <!-- Вью портала rasp.rusoil.net -->
            <div class="schedule-portal-view" id="schedule-portal-view">
                <div class="portal-loading-overlay visible" id="portal-loading-overlay">
                    <div class="portal-spinner"></div>
                    <div class="portal-loading-text">Загрузка расписания УГНТУ...</div>
                </div>
                <iframe id="schedule-portal-frame" src="https://rasp.rusoil.net/" class="schedule-portal-iframe" onload="onPortalIframeLoad()" allow="clipboard-write; fullscreen"></iframe>
            </div>
        `;
        container.innerHTML = html;
        return;
    }

    // Режим "synced" (VPN / Офлайн)
    // Фильтрация:
    let visibleDays = currentAndFutureDays;

    // Фильтр по неделе
    if (effectiveWeek !== 'all') {
        visibleDays = visibleDays.filter(d => d.weekNumber === Number(effectiveWeek));
    }

    // Фильтр "С парами" / "Все дни"
    // Сегодняшний день (isToday) показываем ВСЕГДА, даже если сегодня выходной / нет пар!
    if (scheduleFilter === 'classes_only') {
        visibleDays = visibleDays.filter(d => d.hasClasses || d.isToday);
    }

    html += `
        <div class="schedule-synced-view" id="schedule-synced-view">
            <!-- Плашка информации о группе и источнике -->
            <div class="schedule-meta-bar">
                <div class="schedule-meta-group">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Группа ${escapeHtml(meta.group || "ББПЭ-23-31")}
                </div>
                <div class="schedule-meta-sync" title="База синхронизирована с официальным API УГНТУ">
                    ● rasp.rusoil.net (актуальное)
                </div>
            </div>

            <!-- Горизонтальная прокрутка недель -->
            <div class="schedule-weeks-bar">
                <button class="schedule-week-chip ${effectiveWeek === 'all' ? 'active' : ''}" onclick="setScheduleWeek('all')">
                    Все недели
                </button>
                ${weeksList.map(w => `
                    <button class="schedule-week-chip ${effectiveWeek == w ? 'active' : ''}" onclick="setScheduleWeek(${w})">
                        ${w} нед
                    </button>
                `).join('')}
            </div>

            <!-- Фильтр по дням с парами -->
            <div class="schedule-filter-bar">
                <button class="schedule-filter-btn ${scheduleFilter === 'classes_only' ? 'active' : ''}" onclick="setScheduleFilter('classes_only')">
                    С парами
                </button>
                <button class="schedule-filter-btn ${scheduleFilter === 'all' ? 'active' : ''}" onclick="setScheduleFilter('all')">
                    Все дни
                </button>
            </div>

            <div class="schedule-list">
    `;

    if (visibleDays.length === 0) {
        html += `
            <div class="schedule-empty-state">
                <div class="schedule-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </div>
                <div class="schedule-empty-title">В этой неделе нет предстоящих занятий</div>
                <div class="schedule-empty-subtitle">Выберите другую неделю или режим «Все дни»</div>
            </div>
        `;
    } else {
        visibleDays.forEach(day => {
            const todayClass = day.isToday ? 'is-today' : '';
            const weekBadge = day.week ? `<span class="schedule-day-week-badge">${escapeHtml(day.week)}</span>` : '';
            const todayBadge = day.isToday ? `<span class="schedule-day-today-badge">СЕГОДНЯ</span>` : '';

            html += `
                <div class="schedule-day-card ${todayClass}" data-date="${escapeHtml(day.rawDate || day.date)}">
                    <div class="schedule-day-header">
                        <div class="schedule-day-title-wrap">
                            <span class="schedule-day-date">${escapeHtml(day.date)}</span>
                            ${todayBadge}
                        </div>
                        ${weekBadge}
                    </div>
            `;

            if (!day.hasClasses || !day.classes || day.classes.length === 0) {
                if (day.isToday) {
                    html += `
                        <div class="schedule-no-classes-card today-rest">
                            <svg class="schedule-no-classes-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 12h8"/>
                            </svg>
                            <span>Сегодня пар нет — выходной день</span>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="schedule-no-classes-card">
                            <svg class="schedule-no-classes-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                                <line x1="6" y1="1" x2="6" y2="4"/>
                                <line x1="10" y1="1" x2="10" y2="4"/>
                                <line x1="14" y1="1" x2="14" y2="4"/>
                            </svg>
                            <span>Нет занятий</span>
                        </div>
                    `;
                }
            } else {
                html += `<div class="schedule-classes-group">`;
                day.classes.forEach(c => {
                    const vid = (c.type || "").toLowerCase();
                    const typeClass = vid.includes('экзамен') ? 'type-exam' :
                                      (vid.includes('консульт') ? 'type-consult' :
                                      (vid.includes('лекц') ? 'type-lecture' : 'type-practice'));

                    const linkButtons = c.hasLink ? `
                        <div class="schedule-class-actions">
                            <a href="${escapeHtml(c.link || 'https://oiledu.ru')}" target="_blank" rel="noopener noreferrer" class="schedule-link-btn" onclick="if(typeof vibrate==='function')vibrate(8)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Перейти в oiledu.ru
                            </a>
                            <button type="button" class="schedule-copy-btn" onclick="copyScheduleLink('${escapeHtml(c.link || 'https://oiledu.ru')}', event)" title="Скопировать ссылку">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                                Скопировать
                            </button>
                        </div>
                    ` : '';

                    html += `
                        <div class="schedule-class-card ${typeClass}">
                            <div class="schedule-class-top">
                                <div class="schedule-class-subject">${escapeHtml(c.subject)}</div>
                            </div>

                            <div class="schedule-class-badge-row">
                                <span class="schedule-pair-badge ${typeClass}">
                                    <span class="schedule-pair-num">№ ${c.number || 1}</span>
                                    <span class="schedule-pair-type">${escapeHtml(c.type || "пара")}</span>
                                </span>
                                <span class="schedule-pair-time">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    ${escapeHtml(c.time || "")}
                                </span>
                            </div>

                            <div class="schedule-class-details">
                                <div class="schedule-detail-row">
                                    ${c.room ? `
                                        <span class="schedule-detail-room">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                                <circle cx="12" cy="10" r="3"/>
                                            </svg>
                                            ${escapeHtml(c.room)}
                                        </span>
                                    ` : ''}
                                    ${c.room && c.teacher ? `<span class="schedule-detail-sep">•</span>` : ''}
                                    ${c.teacher ? `
                                        <span class="schedule-detail-teacher">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                            ${escapeHtml(c.teacher)}
                                        </span>
                                    ` : ''}
                                </div>
                            </div>

                            ${linkButtons}
                        </div>
                    `;
                });
                html += `</div>`;
            }

            html += `</div>`;
        });
    }

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Автоматически центрируем активную неделю в полосе переключателей
    setTimeout(() => {
        const activeChip = container.querySelector('.schedule-week-chip.active');
        if (activeChip && typeof activeChip.scrollIntoView === 'function') {
            activeChip.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
        }
    }, 40);
}

if (typeof window !== "undefined") {
    window.renderSchedule = renderSchedule;
    window.switchScheduleMode = switchScheduleMode;
    window.setScheduleFilter = setScheduleFilter;
    window.setScheduleWeek = setScheduleWeek;
    window.scrollToTodaySchedule = scrollToTodaySchedule;
    window.copyScheduleLink = copyScheduleLink;
    window.reloadSchedulePortal = reloadSchedulePortal;
    window.openScheduleExternal = openScheduleExternal;
    window.onPortalIframeLoad = onPortalIframeLoad;
    window.showScheduleToast = showScheduleToast;
}
