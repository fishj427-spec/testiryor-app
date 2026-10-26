// [НАСТРОЙКИ ПРИЛОЖЕНИЯ]
function renderSettings() {
    const el = document.getElementById("settings-content");
    if (!el) return;
    const mode = typeof getThemeMode === "function" ? getThemeMode() : (localStorage.getItem("quiz_theme_mode") || "system");
    const effective = typeof getEffectiveTheme === "function" ? getEffectiveTheme() : (localStorage.getItem("quiz_theme") || "dark");
    const isSystem = mode === "system";

    el.innerHTML = `
        <!-- Карточка 1: Переключение темы в одну строчку -->
        <div class="profile-menu-group">
            <div class="profile-theme-row">
                <span class="profile-menu-title">ТЕМА</span>
                <div class="theme-buttons-row">
                    <button type="button" class="theme-mode-btn ${effective === 'dark' ? 'is-active' : ''}" onclick="setThemeMode('dark')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                        ТЁМНАЯ
                    </button>
                    <button type="button" class="theme-mode-btn ${effective === 'light' ? 'is-active' : ''}" onclick="setThemeMode('light')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                        СВЕТЛАЯ
                    </button>
                </div>
            </div>
        </div>

        <!-- Карточка 2: Сбросить статистику тестирования -->
        <button type="button" class="profile-danger-btn" onclick="confirmResetSession()">
            СБРОСИТЬ СТАТИСТИКУ ТЕСТИРОВАНИЯ
        </button>

        <!-- Карточка 3: Справка и критерии оценок (единственный пункт) -->
        <div class="profile-menu-group" style="margin-top:4px;">
            <div class="profile-menu-item" onclick="openAboutModal()" role="button" tabindex="0">
                <div class="profile-menu-left">
                    <svg class="profile-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <span class="profile-menu-title">СПРАВКА И КРИТЕРИИ ОЦЕНОК</span>
                </div>
                <svg class="profile-menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
        </div>

        <div class="settings-footer" style="margin-top:14px;text-align:center;">
            <div class="app-version" style="font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-muted)">QUIZAPP · 2026</div>
        </div>
    `;
}

function confirmResetSession() {
    if (confirm("Вы уверены, что хотите сбросить статистику тестирования и историю ответов?")) {
        localStorage.removeItem("quiz_all_stats");
        localStorage.removeItem("quiz_streak");
        localStorage.removeItem("quiz_last_play");
        localStorage.removeItem("quiz_activity");
        if (typeof renderStats === "function") renderStats();
        alert("Статистика тестирования сброшена.");
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
