// [НАСТРОЙКИ ПРИЛОЖЕНИЯ]
function renderSettings() {
    const el = document.getElementById("settings-content");
    if (!el) return;
    el.innerHTML = `
        <!-- Карточка 1: Сбросить статистику тестирования -->
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
