// [НАСТРОЙКИ] Экран настроек, фонового паттерна и истории изменений

const BG_PATTERNS = {
    dots: {
        name: "Точки",
        icon: "•",
        desc: "Тактическая сетка точек",
        css: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
        size: "20px 20px"
    },
    grid: {
        name: "Клетка",
        icon: "▦",
        desc: "Инженерная сетка линий",
        css: "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        size: "24px 24px"
    },
    cross: {
        name: "Крестики",
        icon: "✚",
        desc: "Тактические перекрестия",
        css: "radial-gradient(rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px), radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
        size: "30px 30px"
    },
    none: {
        name: "Без текстуры",
        icon: "⬛",
        desc: "Чистый глубокий цвет",
        css: "none",
        size: "auto"
    }
};

const CHANGELOG_DATA = [
    {
        version: "3.1.0",
        date: "28 октября 2026",
        badge: "major",
        badgeText: "Новые функции",
        groups: [
            {
                type: "new",
                label: "Нововведения",
                items: [
                    "Экран «Расписание»: полноценное расписание занятий на 52 дня (недели 9–16) со всеми парами, аудиториями, преподавателями и ссылками",
                    "Фоновые паттерны в Настройках: выбор текстуры фона приложения (Точки, Клетка, Крестики, Без текстуры)",
                    "Интерактивные фильтры: быстрый переход по неделям и режим «С парами»"
                ]
            },
            {
                type: "change",
                label: "Улучшения",
                items: [
                    "Бесшовный фон: полноэкранное покрытие тактическим паттерном без обрезки по краям экрана смартфона",
                    "Адаптивная навигация: скорректированы шрифты нижней панели — надписи «РАСПИСАНИЕ» и «СТАТИСТИКА» больше не обрезаются"
                ]
            },
            {
                type: "fix",
                label: "Исправления",
                items: [
                    "Устранение горизонтального сдвига на экранах с вырезами и закруглениями благодаря параметру viewport-fit=cover",
                    "Исправлен статус базы билетов по санитарии и гигиене труда — подтверждена полнота экзаменационных вопросов"
                ]
            }
        ]
    },
    {
        version: "3.0.0",
        date: "26 октября 2026",
        badge: "major",
        badgeText: "Крупный релиз",
        groups: [
            {
                type: "new",
                label: "Нововведения",
                items: [
                    "Интеграция формул KaTeX: качественный математический рендеринг уравнений и формул во всех тестах",
                    "Каталог дисциплин: расширена база предметов с возможностью мгновенного переключения",
                    "Обновленный таймер: улучшенная визуализация оставшегося времени экзамена"
                ]
            },
            {
                type: "change",
                label: "Улучшения",
                items: [
                    "Оптимизация производительности рендеринга больших списков вопросов",
                    "Улучшена адаптивность модальных окон на устройствах с небольшим экраном"
                ]
            }
        ]
    },
    {
        version: "2.1.0",
        date: "25 октября 2026",
        badge: "minor",
        badgeText: "Обновление",
        groups: [
            {
                type: "new",
                label: "Нововведения",
                items: [
                    "Система тегов в вопросах: быстрый поиск по разделам и темам дисциплины",
                    "Виброотклик (haptic feedback) при переключении фильтров и выборе ответов"
                ]
            },
            {
                type: "fix",
                label: "Исправления",
                items: [
                    "Исправлен подсчет серии ежедневных тренировок (streak) при переходе через полночь",
                    "Корректное сохранение прогресса незавершенных тестов"
                ]
            }
        ]
    },
    {
        version: "2.0.0",
        date: "23 октября 2026",
        badge: "major",
        badgeText: "Платформа 2.0",
        groups: [
            {
                type: "new",
                label: "Нововведения",
                items: [
                    "Новый тактический тёмный дизайн интерфейса с акцентной подсветкой",
                    "Два режима подготовки: «Контрольная» (на время без подсказок) и «Репетиционный» (с моментальным разбором ошибок)",
                    "Детальная аналитика: статистика правильных ответов, точность и динамика прохождения тестов"
                ]
            }
        ]
    }
];

// Состояние открытых карточек версий
let changelogExpandedState = {
    "3.1.0": true
};
let isChangelogSectionOpen = true;

function applyCustomTheme() {
    const savedPattern = localStorage.getItem("quiz_bg_pattern") || "dots";
    const pat = BG_PATTERNS[savedPattern] || BG_PATTERNS.dots;

    const root = document.documentElement;

    // Очищаем старые инлайн переопределения цветов, если они были сохранены ранее
    root.style.removeProperty("--primary");
    root.style.removeProperty("--primary-dark");
    root.style.removeProperty("--primary-light");
    root.style.removeProperty("--accent");
    root.style.removeProperty("--shadow-glow");
    root.style.removeProperty("--grad-primary");
    root.style.removeProperty("--grad-accent");
    root.style.removeProperty("--bg-base");
    root.style.removeProperty("--bg-surface");
    root.style.removeProperty("--card-bg");
    root.style.removeProperty("--tab-bg");

    // Применяем выбранный фоновый паттерн
    root.style.setProperty("--bg-pattern-image", pat.css);
    root.style.setProperty("--bg-pattern-size", pat.size);
}

function setBgPattern(key) {
    if (!BG_PATTERNS[key]) return;
    vibrate(10);
    localStorage.setItem("quiz_bg_pattern", key);
    applyCustomTheme();
    renderSettings();
}

function toggleChangelogSection() {
    isChangelogSectionOpen = !isChangelogSectionOpen;
    vibrate(8);
    renderSettings();
}

function toggleChangelogEntry(version) {
    changelogExpandedState[version] = !changelogExpandedState[version];
    vibrate(8);
    renderSettings();
}

function toggleAllChangelog() {
    const allExpanded = CHANGELOG_DATA.every(e => changelogExpandedState[e.version]);
    CHANGELOG_DATA.forEach(e => {
        changelogExpandedState[e.version] = !allExpanded;
    });
    vibrate(10);
    renderSettings();
}

function renderSettings() {
    const el = document.getElementById("settings-content");
    if (!el) return;

    const curPattern = localStorage.getItem("quiz_bg_pattern") || "dots";
    const totalVersions = CHANGELOG_DATA.length;
    const anyExpanded = CHANGELOG_DATA.some(e => changelogExpandedState[e.version]);

    let html = `
        <!-- [РАЗДЕЛ: ФОНОВЫЙ ПАТТЕРН] -->
        <div class="settings-card">
            <div class="settings-card-header">
                <div class="settings-card-title-row">
                    <svg class="settings-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span class="settings-card-title">Фоновый паттерн</span>
                </div>
            </div>

            <div class="pattern-picker">
                ${Object.entries(BG_PATTERNS).map(([k, p]) => {
                    const isActive = curPattern === k;
                    return `
                        <button type="button" class="pattern-btn ${isActive ? 'active' : ''}" onclick="setBgPattern('${k}')">
                            <span class="pattern-icon">${p.icon}</span>
                            <div class="pattern-info">
                                <span class="pattern-title">${p.name}</span>
                                <span class="pattern-desc">${p.desc}</span>
                            </div>
                        </button>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- [РАЗДЕЛ: ИСТОРИЯ ВЕРСИЙ / CHANGELOG] -->
        <div class="settings-card changelog-settings-card">
            <div class="settings-card-header clickable" onclick="toggleChangelogSection()" role="button" tabindex="0">
                <div class="settings-card-title-row">
                    <svg class="settings-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                    <span class="settings-card-title">Список изменений</span>
                    <span class="changelog-badge-latest">v${CHANGELOG_DATA[0].version}</span>
                </div>
                <div class="changelog-chevron ${isChangelogSectionOpen ? 'open' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
            </div>

            ${isChangelogSectionOpen ? `
                <div class="changelog-inner-wrap">
                    <div class="changelog-toolbar">
                        <span class="changelog-toolbar-badge">${totalVersions} версии</span>
                        <button type="button" class="changelog-toggle-all-btn" onclick="toggleAllChangelog()">
                            ${anyExpanded ? "Свернуть всё" : "Развернуть всё"}
                        </button>
                    </div>

                    <div class="changelog-timeline">
                        ${CHANGELOG_DATA.map((entry, idx) => {
                            const isExp = !!changelogExpandedState[entry.version];
                            const bc = entry.badge === "major" ? "badge-major" : "badge-minor";
                            return `
                                <div class="changelog-entry ${isExp ? 'expanded' : ''}" data-version="${entry.version}">
                                    <div class="changelog-dot"></div>
                                    <div class="changelog-header-card" onclick="toggleChangelogEntry('${entry.version}')" role="button" tabindex="0">
                                        <div class="changelog-header-main">
                                            <div class="changelog-version-row">
                                                <h3 class="changelog-version-title">v${entry.version}</h3>
                                                <span class="version-badge ${bc}">${entry.badgeText}</span>
                                            </div>
                                            <div class="changelog-date">
                                                <span>${entry.date}</span>
                                                <span class="changelog-status-hint">• ${isExp ? "Скрыть" : "Подробнее"}</span>
                                            </div>
                                        </div>
                                        <div class="changelog-chevron-btn ${isExp ? 'open' : ''}">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="6 9 12 15 18 9"/>
                                            </svg>
                                        </div>
                                    </div>

                                    ${isExp ? `
                                        <div class="changelog-body-open">
                                            <div class="changelog-changes">
                                                ${entry.groups.map(group => {
                                                    const typeClass = group.type === "new" ? "tag-new" : group.type === "change" ? "tag-change" : "tag-fix";
                                                    const tagLabel = group.type === "new" ? "НОВОЕ" : group.type === "change" ? "ИЗМЕНЕНИЕ" : "ИСПРАВЛЕНО";
                                                    return `
                                                        <div class="change-group">
                                                            <div class="change-group-title">
                                                                <span class="change-group-dot"></span>
                                                                ${group.label}
                                                            </div>
                                                            ${group.items.map(item => `
                                                                <div class="change-item">
                                                                    <span class="change-tag ${typeClass}">${tagLabel}</span>
                                                                    <span class="change-item-text">${item}</span>
                                                                </div>
                                                            `).join('')}
                                                        </div>
                                                    `;
                                                }).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>

        <!-- [РАЗДЕЛ: ДАННЫЕ И СИСТЕМА] -->
        <div class="profile-menu-group" style="margin-top:14px;">
            <div class="profile-menu-item" onclick="openAboutModal()" role="button" tabindex="0">
                <div class="profile-menu-left">
                    <svg class="profile-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    <span class="profile-menu-title">О проекте и критериях оценки</span>
                </div>
                <svg class="profile-menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </div>
        </div>

        <button type="button" class="profile-danger-btn" onclick="confirmResetSession()" style="margin-top:10px;">
            Сбросить статистику
        </button>

        <div class="settings-footer" style="margin-top:16px;text-align:center;">
            <div class="app-version" style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted)">QUIZAPP v3.1.0 • 2026</div>
        </div>
    `;

    el.innerHTML = html;
}

function confirmResetSession() {
    if (confirm("Вы уверены, что хотите сбросить всю сохранённую статистику?")) {
        localStorage.removeItem("quiz_all_stats");
        localStorage.removeItem("quiz_streak");
        localStorage.removeItem("quiz_last_play");
        localStorage.removeItem("quiz_activity");
        if (typeof renderStats === "function") renderStats();
        alert("Статистика успешно сброшена.");
    }
}

function resetStats() {
    confirmResetSession();
}

function resetOnboarding() {
    localStorage.removeItem("visited");
    localStorage.removeItem("quiz_discipline_chosen");
    screenHistory = ["screen-home"];
    navigateTo("screen-home");
    const tb = document.getElementById("tab-bar");
    if (tb) tb.style.display = "none";
    const ob = document.getElementById("screen-onboard-1");
    if (ob) ob.classList.add("active");
}

if (typeof window !== "undefined") {
    window.BG_PATTERNS = BG_PATTERNS;
    window.CHANGELOG_DATA = CHANGELOG_DATA;
    window.applyCustomTheme = applyCustomTheme;
    window.setBgPattern = setBgPattern;
    window.toggleChangelogSection = toggleChangelogSection;
    window.toggleChangelogEntry = toggleChangelogEntry;
    window.toggleAllChangelog = toggleAllChangelog;
    window.renderSettings = renderSettings;
    window.confirmResetSession = confirmResetSession;
    window.resetStats = resetStats;
    window.resetOnboarding = resetOnboarding;
}
