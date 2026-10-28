// Инициализация Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.setHeaderColor('#000000');
    tg.setBackgroundColor('#000000');
    document.body.classList.add('is-telegram');
    tg.ready();
}

window.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeExamModal();
        closeRehearsalModal();
        closeAboutModal();
        if (typeof closeWelcomeDisciplineModal === "function") {
            closeWelcomeDisciplineModal();
        }
    }
});
// [ИНИЦИАЛИЗАЦИЯ] Старт приложения
document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getSavedTheme());
    if (typeof applyCustomTheme === "function") applyCustomTheme();
    loadSettings();
    if (typeof initModalDragToDismiss === "function") initModalDragToDismiss();
    if (typeof setActiveDiscipline === "function") {
        setActiveDiscipline(getActiveDisciplineId(), true);
    }
    const tagFilterEl = document.getElementById("questions-tag-filter");
    if (tagFilterEl) {
        tagFilterEl.addEventListener("wheel", (e) => {
            if (e.deltaY !== 0 && !e.shiftKey) {
                e.preventDefault();
                tagFilterEl.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }
    try {
        if (window.Telegram?.WebApp?.BackButton) {
            window.Telegram.WebApp.BackButton.onClick(() => goBack());
        }
    } catch (e) {}
    const urlParams = typeof window !== "undefined" && window.location ? new URLSearchParams(window.location.search) : null;
    const hasVisited = (urlParams && urlParams.has("preview")) || localStorage.getItem("visited") === "true";
    if (hasVisited) {
        const customScreen = urlParams ? urlParams.get("screen") : null;
        const startScreen = customScreen ? (customScreen.startsWith("screen-") ? customScreen : `screen-${customScreen}`) : "screen-home";
        screenHistory = [startScreen];
        try {
            window.history.replaceState({ screen: startScreen }, "", window.location.href);
        } catch (e) {}
        navigateTo(startScreen, false);
    } else {
        screenHistory = [];
        document.getElementById("screen-onboard-1").classList.add("active");
        document.getElementById("tab-bar").style.display = "none";
    }
});
