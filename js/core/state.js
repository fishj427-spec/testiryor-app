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
    return localStorage.getItem("quiz_theme_mode") || "system";
}

function getSystemTheme() {
    try {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
            return "light";
        }
    } catch (e) {}
    return "dark";
}

function getEffectiveTheme() {
    const mode = getThemeMode();
    if (mode === "system") {
        return getSystemTheme();
    }
    return mode === "light" ? "light" : "dark";
}

function getSavedTheme() {
    return getEffectiveTheme();
}

function applyTheme(theme) {
    const effective = (theme === "light" || theme === "dark") ? theme : getEffectiveTheme();
    document.body.className = "theme-" + effective;
    localStorage.setItem("quiz_theme", effective);
}

function setThemeMode(mode) {
    localStorage.setItem("quiz_theme_mode", mode);
    applyTheme();
    if (typeof renderSettings === "function") {
        renderSettings();
    }
}

function toggleSystemTheme() {
    const currentMode = getThemeMode();
    if (currentMode === "system") {
        const eff = getEffectiveTheme();
        setThemeMode(eff === "dark" ? "light" : "dark");
    } else {
        setThemeMode("system");
    }
}

try {
    if (window.matchMedia) {
        const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleThemeChange = () => {
            if (getThemeMode() === "system") {
                applyTheme();
                if (typeof renderSettings === "function") {
                    renderSettings();
                }
            }
        };
        if (themeMediaQuery.addEventListener) {
            themeMediaQuery.addEventListener("change", handleThemeChange);
        } else if (themeMediaQuery.addListener) {
            themeMediaQuery.addListener(handleThemeChange);
        }
    }
} catch (e) {}
function loadSettings() { const s = localStorage.getItem("quiz_settings"); if (s) state.settings = JSON.parse(s); }
function saveSettings() { localStorage.setItem("quiz_settings", JSON.stringify(state.settings)); }
// [ОНБОРДИНГ] Онбординг