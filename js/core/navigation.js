var screenHistory = ["screen-disciplines"];
function updateTelegramBackButton() {
    try {
        if (window.Telegram?.WebApp?.BackButton) {
            if (canGoBack()) {
                window.Telegram.WebApp.BackButton.show();
            } else {
                window.Telegram.WebApp.BackButton.hide();
            }
        }
    } catch (e) {}
}
function navigateTo(screenId, addToHistory = true) {
    if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
    document.getElementById("timeup-overlay")?.classList.remove("active");
    const tabScreens = ["screen-home", "screen-stats", "screen-settings", "screen-changelog", "screen-questions", "screen-review", "screen-disciplines"];
    const isTab = tabScreens.includes(screenId);
    document.getElementById("tab-bar").style.display = isTab ? "flex" : "none";
    if (addToHistory && screenHistory[screenHistory.length - 1] !== screenId) {
        screenHistory.push(screenId);
        try {
            window.history.pushState({ screen: screenId }, "", window.location.href);
        } catch (e) {}
    }
    updateTelegramBackButton();
    document.querySelectorAll(".tab-item").forEach(t => t.classList.remove("active"));
    const tabId = screenId.replace('screen-', '');
    let activeTab = document.querySelector(`.tab-item[data-tab="${tabId}"]`);
    if (!activeTab && (screenId === "screen-home" || screenId === "screen-disciplines" || screenId === "screen-questions" || screenId === "screen-review")) {
        activeTab = document.querySelector(`.tab-item[data-tab="disciplines"]`);
    }
    if (activeTab) activeTab.classList.add("active");
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) setTimeout(() => target.classList.add("active"), 50);
    if (screenId === "screen-home") renderHome();
    if (screenId === "screen-stats") renderStats();
    if (screenId === "screen-settings") renderSettings();
    if (screenId === "screen-changelog") renderChangelog();
    if (screenId === "screen-disciplines") {
        if (typeof renderDisciplines === "function") renderDisciplines();
    }
    if (screenId === "screen-questions") { 
        document.getElementById("search-input").value = ""; 
        currentQuestionTag = "all";
        state.reviewMode = false;
        if (typeof renderQuestionTagFilters === "function") renderQuestionTagFilters();
        renderAllQuestions();
    }
    if (screenId === "screen-review") renderTestReview();
}
function canGoBack() {
    const modal = document.getElementById("exam-config-modal");
    if (modal && modal.classList.contains("active")) return true;
    const rehearsalModal = document.getElementById("rehearsal-config-modal");
    if (rehearsalModal && rehearsalModal.classList.contains("active")) return true;
    const aboutModal = document.getElementById("about-info-modal");
    if (aboutModal && aboutModal.classList.contains("active")) return true;
    if (screenHistory.length > 1) return true;
    if (document.getElementById("screen-onboard-2")?.classList.contains("active")) return true;
    if (document.getElementById("screen-onboard-3")?.classList.contains("active")) return true;
    return false;
}
function handleBackGesture() {
    const modal = document.getElementById("exam-config-modal");
    if (modal && modal.classList.contains("active")) {
        closeExamModal();
        return;
    }
    const rehearsalModal = document.getElementById("rehearsal-config-modal");
    if (rehearsalModal && rehearsalModal.classList.contains("active")) {
        closeRehearsalModal();
        return;
    }
    const aboutModal = document.getElementById("about-info-modal");
    if (aboutModal && aboutModal.classList.contains("active")) {
        closeAboutModal();
        return;
    }
    if (document.getElementById("screen-onboard-3")?.classList.contains("active")) {
        document.getElementById("screen-onboard-3").classList.remove("active");
        setTimeout(() => document.getElementById("screen-onboard-2")?.classList.add("active"), 50);
        return;
    }
    if (document.getElementById("screen-onboard-2")?.classList.contains("active")) {
        document.getElementById("screen-onboard-2").classList.remove("active");
        setTimeout(() => document.getElementById("screen-onboard-1")?.classList.add("active"), 50);
        return;
    }
    goBack();
}
function goBack() {
    const modal = document.getElementById("exam-config-modal");
    if (modal && modal.classList.contains("active")) {
        closeExamModal();
        return;
    }
    const rehearsalModal = document.getElementById("rehearsal-config-modal");
    if (rehearsalModal && rehearsalModal.classList.contains("active")) {
        closeRehearsalModal();
        return;
    }
    const aboutModal = document.getElementById("about-info-modal");
    if (aboutModal && aboutModal.classList.contains("active")) {
        closeAboutModal();
        return;
    }
    if (screenHistory.length > 1) {
        if (window.history.state && window.history.state.screen) {
            window.history.back();
        } else {
            screenHistory.pop();
            const prev = screenHistory[screenHistory.length - 1];
            navigateTo(prev, false);
        }
    }
}
function goHome() {
    screenHistory = ["screen-home"];
    state.reviewMode = false;
    try {
        window.history.pushState({ screen: "screen-home" }, "", window.location.href);
    } catch (e) {}
    navigateTo("screen-home", false);
}
// Слушатель системного жеста «Назад» / кнопки браузера (Android / iOS)
window.addEventListener("popstate", (e) => {
    if (screenHistory.length > 1) {
        screenHistory.pop();
        const prev = screenHistory[screenHistory.length - 1] || "screen-disciplines";
        navigateTo(prev, false);
    }
});
function initBackGesture() {}
// [СОСТОЯНИЕ] Состояние приложения