const state = {
    quizMode: null,
    currentQuestionIndex: 0,
    quizQuestions: [],
    shuffledAnswers: [],
    userAnswers: [],
    correctCount: 0,
    timerValue: 45 * 60,
    timerInterval: null,
    settings: {},
    reviewQuestions: [],
    reviewUserAnswers: []
};
/*
* ═══════════════════════════════════════════════════════════════
*  [БАЗА ВОПРОСОВ] Оптимизированный массив вопросов (255 вопросов)
* ═══════════════════════════════════════════════════════════════
*/
function getThemeMode() {
    return "dark";
}

function getSystemTheme() {
    return "dark";
}

function getEffectiveTheme() {
    return "dark";
}

function getSavedTheme() {
    return "dark";
}

function applyTheme(theme) {
    document.body.className = "theme-dark";
    if (document.documentElement) {
        document.documentElement.className = "theme-dark";
    }
    localStorage.setItem("quiz_theme", "dark");
    localStorage.setItem("quiz_theme_mode", "dark");
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        try {
            tg.setHeaderColor("#000000");
            tg.setBackgroundColor("#000000");
        } catch (e) {}
    }
}

function setThemeMode(mode) {
    applyTheme();
    if (typeof renderSettings === "function") {
        renderSettings();
    }
}

function toggleSystemTheme() {}
function loadSettings() { const s = localStorage.getItem("quiz_settings"); if (s) state.settings = JSON.parse(s); }
function saveSettings() { localStorage.setItem("quiz_settings", JSON.stringify(state.settings)); }
// [ОНБОРДИНГ] Онбординг