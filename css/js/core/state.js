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
function getSavedTheme() { return localStorage.getItem("quiz_theme") || "dark"; }
function applyTheme(theme) { document.body.className = "theme-" + theme; localStorage.setItem("quiz_theme", theme); }
function loadSettings() { const s = localStorage.getItem("quiz_settings"); if (s) state.settings = JSON.parse(s); }
function saveSettings() { localStorage.setItem("quiz_settings", JSON.stringify(state.settings)); }
// [ОНБОРДИНГ] Онбординг