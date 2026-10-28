// [НАСТРОЙКИ] Экран настроек, персонализации темы и истории изменений

const ACCENT_COLORS = {
    red: { name: "Рубин", hex: "#EF4444", dark: "#DC2626", light: "#F87171", glow: "rgba(239, 68, 68, 0.35)" },
    emerald: { name: "Изумруд", hex: "#10B981", dark: "#059669", light: "#34D399", glow: "rgba(16, 185, 129, 0.35)" },
    cyan: { name: "Лазурь", hex: "#06B6D4", dark: "#0891B2", light: "#22D3EE", glow: "rgba(6, 182, 212, 0.35)" },
    purple: { name: "Индиго", hex: "#8B5CF6", dark: "#7C3AED", light: "#A78BFA", glow: "rgba(139, 92, 246, 0.35)" },
    amber: { name: "Янтарь", hex: "#F59E0B", dark: "#D97706", light: "#FBBF24", glow: "rgba(245, 158, 11, 0.35)" },
    rose: { name: "Коралл", hex: "#F43F5E", dark: "#E11D48", light: "#FB7185", glow: "rgba(244, 63, 94, 0.35)" }
};

const THEME_SHADES = {
    oled: { name: "OLED Black", hex: "#000000", surface: "#0a0a0c", card: "#131316", border: "rgba(255, 255, 255, 0.10)" },
    graphite: { name: "Графит", hex: "#0e0f13", surface: "#15161c", card: "#1c1d24", border: "rgba(255, 255, 255, 0.12)" },
    navy: { name: "Полночь", hex: "#090d16", surface: "#101726", card: "#172033", border: "rgba(255, 255, 255, 0.12)" }
};

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
                    "Персонализация в Настройках: детальная настройка темы — 6 фирменных акцентных цветов, 3 оттенка тёмного фона и 4 вида текстуры",
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
                    "Закрытие смахиванием вниз (Drag-to-dismiss) для всех шторок и модальных окон",
                    "Новая навигация: вкладка «Тест» вынесена на 1-е место, а «Предмет» расположен по центру",
                    "Специализированные иконки предметов для «Экономики» и «Санитарии и гигиены труда»"
                ]
            },
            {
                type: "change",
                label: "Изменения",
                items: [
                    "Тематические фильтры вопросов («Дозиметрия», «Виды излучений», «Источники излучения», «Лазерная безопасность»)",
                    "Стандартизация скруглений до 5–10 px и очистка интерфейса от лишних элементов"
                ]
            }
        ]
    },
    {
        version: "2.1.0",
        date: "25 октября 2026",
        badge: "update",
        badgeText: "Обновление",
        groups: [
            {
                type: "new",
                label: "Нововведения",
                items: [
                    "Режим «Контрольная»: случайная выборка вопросов с настраиваемым таймером и строгими критериями",
                    "Подробный разбор теста с цветовой индикацией ошибок"
                ]
            }
        ]
    },
    {
        version: "2.0.0",
        date: "24 октября 2026",
        badge: "update",
        badgeText: "Архитектура",
        groups: [
            {
                type: "new",
                label: "Нововведения",
                items: [
                    "Модульная архитектура экранов и данных",
                    "Поддержка PWA и оффлайн-режим"
                ]
            }
        ]
    }
];

let changelogExpandedState = { "3.1.0": true, "3.0.0": false, "2.1.0": false, "2.0.0": false };
let isChangelogSectionOpen = true;

function applyCustomTheme() {
    const savedAccent = localStorage.getItem("quiz_accent_color") || "red";
    const savedShade = localStorage.getItem("quiz_theme_shade") || "oled";
    const savedPattern = localStorage.getItem("quiz_bg_pattern") || "dots";

    const acc = ACCENT_COLORS[savedAccent] || ACCENT_COLORS.red;
    const shade = THEME_SHADES[savedShade] || THEME_SHADES.oled;
    const pat = BG_PATTERNS[savedPattern] || BG_PATTERNS.dots;

    const root = document.documentElement;
    root.style.setProperty("--primary", acc.hex);
    root.style.setProperty("--primary-dark", acc.dark);
    root.style.setProperty("--primary-light", acc.light);
    root.style.setProperty("--accent", acc.hex);
    root.style.setProperty("--shadow-glow", acc.glow);
    root.style.setProperty("--grad-primary", `linear-gradient(135deg, ${acc.hex}, ${acc.dark})`);
    root.style.setProperty("--grad-accent", `linear-gradient(135deg, ${acc.hex}, ${acc.dark})`);

    root.style.setProperty("--bg-base", shade.hex);
    root.style.setProperty("--bg-surface", shade.surface);
    root.style.setProperty("--card-bg", shade.card);
    root.style.setProperty("--tab-bg", shade.hex);

    root.style.setProperty("--bg-pattern-image", pat.css);
    root.style.setProperty("--bg-pattern-size", pat.size);
}

function setAccentColor(key) {
    if (!ACCENT_COLORS[key]) return;
    vibrate(10);
    localStorage.setItem("quiz_accent_color", key);
    applyCustomTheme();
    renderSettings();
}

function setThemeShade(key) {
    if (!THEME_SHADES[key]) return;
    vibrate(10);
    localStorage.setItem("quiz_theme_shade", key);
    applyCustomTheme();
    renderSettings();
}

function setBgPattern(key) {
    if (!BG_PATTERNS[key]) return;
    vibrate(10);
    localStorage.setItem("quiz_bg_pattern", key);
    applyCustomTheme();
    renderSettings();
}

function toggleChangelogSection() {
    vibrate(8);
    isChangelogSectionOpen = !isChangelogSectionOpen;
    renderSettings();
}

function toggleChangelogEntry(version) {
    vibrate(8);
    changelogExpandedState[version] = !changelogExpandedState[version];
    renderSettings();
}

function toggleAllChangelog() {
    vibrate(10);
    const anyExpanded = CHANGELOG_DATA.some(e => changelogExpandedState[e.version]);
    const nextState = !anyExpanded;
    CHANGELOG_DATA.forEach(e => {
        changelogExpandedState[e.version] = nextState;
    });
    renderSettings();
}

function renderSettings() {
    const el = document.getElementById("settings-content");
    if (!el) return;

    const curAccent = localStorage.getItem("quiz_accent_color") || "red";
    const curShade = localStorage.getItem("quiz_theme_shade") || "oled";
    const curPattern = localStorage.getItem("quiz_bg_pattern") || "dots";

    const totalVersions = CHANGELOG_DATA.length;
    const anyExpanded = CHANGELOG_DATA.some(e => changelogExpandedState[e.version]);

    let html = `
        <!-- [РАЗДЕЛ: ПЕРСОНАЛИЗАЦИЯ И ТЕМА] -->
        <div class="settings-card">
            <div class="settings-card-header">
                <div class="settings-card-title-row">
                    <svg class="settings-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m4.93 4.93 4.24 4.24"/>
                        <path d="m14.83 14.83 4.24 4.24"/>
                        <path d="m14.83 9.17 4.24-4.24"/>
                        <path d="m4.93 19.07 4.24-4.24"/>
                    </svg>
                    <span class="settings-card-title">Оформление и тема</span>
                </div>
            </div>

            <!-- 1. Акцентный цвет -->
            <div class="settings-group">
                <div class="settings-group-label">АКЦЕНТНЫЙ ЦВЕТ ИНТЕРФЕЙСА</div>
                <div class="accent-swatches">
                    ${Object.entries(ACCENT_COLORS).map(([k, acc]) => {
                        const isActive = curAccent === k;
                        return `
                            <button type="button" class="accent-swatch ${isActive ? 'active' : ''}" 
                                style="--swatch-color: ${acc.hex}; --swatch-glow: ${acc.glow};"
                                onclick="setAccentColor('${k}')" 
                                title="${acc.name}">
                                ${isActive ? `
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                ` : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- 2. Оттенок темного фона -->
            <div class="settings-group">
                <div class="settings-group-label">ОТТЕНОК ФОНА (DARK THEME)</div>
                <div class="shade-picker">
                    ${Object.entries(THEME_SHADES).map(([k, s]) => {
                        const isActive = curShade === k;
                        return `
                            <button type="button" class="shade-btn ${isActive ? 'active' : ''}" onclick="setThemeShade('${k}')">
                                <span class="shade-preview" style="background:${s.hex}; border: 1px solid ${s.border};"></span>
                                <span class="shade-name">${s.name}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- 3. Фоновый паттерн -->
            <div class="settings-group" style="margin-bottom: 2px;">
                <div class="settings-group-label">ФОНОВЫЙ ПАТТЕРН</div>
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
        </div>

        <!-- [РАЗДЕЛ: СПИСОК ИЗМЕНЕНИЙ / CHANGELOG] -->
        <div class="settings-card changelog-settings-card">
            <div class="settings-card-header clickable" onclick="toggleChangelogSection()" role="button" tabindex="0">
                <div class="settings-card-title-row">
                    <svg class="settings-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    <span class="settings-card-title">Список изменений</span>
                    <span class="version-badge badge-major" style="margin-left: 6px;">v3.1.0</span>
                </div>
                <div class="changelog-chevron-btn ${isChangelogSectionOpen ? 'open' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
            </div>

            ${isChangelogSectionOpen ? `
                <div class="changelog-inner-wrap">
                    <div class="changelog-toolbar">
                        <div class="changelog-toolbar-info">
                            <span class="changelog-toolbar-badge">${totalVersions} ${pluralRu(totalVersions, "версия", "версии", "версий")}</span>
                        </div>
                        <button type="button" class="changelog-toggle-all-btn ${anyExpanded ? '' : 'all-collapsed'}" onclick="toggleAllChangelog()">
                            <span>${anyExpanded ? "Свернуть всё" : "Развернуть всё"}</span>
                            <svg class="changelog-toggle-all-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="18 15 12 9 6 15"/>
                            </svg>
                        </button>
                    </div>

                    <div class="changelog-timeline">
                        ${CHANGELOG_DATA.map((entry, idx) => {
                            const isExp = changelogExpandedState[entry.version];
                            const bc = entry.badge === "major" ? "badge-major" : "badge-update";
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
                                                <span class="changelog-status-hint">· ${isExp ? "Скрыть" : "Подробнее"}</span>
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
                                                    const typeClass = group.type === "new" ? "tag-new" : group.type === "fix" ? "tag-fix" : "tag-change";
                                                    const dotClass = group.type === "new" ? "dot-new" : group.type === "fix" ? "dot-fix" : "dot-change";
                                                    const tagLabel = group.type === "new" ? "Новое" : group.type === "fix" ? "Исправлено" : "Изменение";
                                                    return `
                                                        <div class="change-group">
                                                            <div class="change-group-title">
                                                                <span class="change-group-dot ${dotClass}"></span>
                                                                <span>${group.label}</span>
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
    window.ACCENT_COLORS = ACCENT_COLORS;
    window.THEME_SHADES = THEME_SHADES;
    window.BG_PATTERNS = BG_PATTERNS;
    window.CHANGELOG_DATA = CHANGELOG_DATA;
    window.applyCustomTheme = applyCustomTheme;
    window.setAccentColor = setAccentColor;
    window.setThemeShade = setThemeShade;
    window.setBgPattern = setBgPattern;
    window.toggleChangelogSection = toggleChangelogSection;
    window.toggleChangelogEntry = toggleChangelogEntry;
    window.toggleAllChangelog = toggleAllChangelog;
    window.renderSettings = renderSettings;
    window.confirmResetSession = confirmResetSession;
    window.resetStats = resetStats;
    window.resetOnboarding = resetOnboarding;
}
