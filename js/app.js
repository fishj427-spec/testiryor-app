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
    const hasVisited = localStorage.getItem("visited");
    const hasChosenDiscipline = localStorage.getItem("quiz_discipline_chosen") === "true";
    if (hasVisited === "true") {
        screenHistory = ["screen-home"];
        try {
            window.history.replaceState({ screen: "screen-home" }, "", window.location.href);
        } catch (e) {}
        navigateTo("screen-home", false);
        if (!hasChosenDiscipline) {
            setTimeout(() => {
                if (typeof openWelcomeDisciplineModal === "function") {
                    openWelcomeDisciplineModal();
                }
            }, 250);
        }
    } else {
        screenHistory = [];
        document.getElementById("screen-onboard-1").classList.add("active");
        document.getElementById("tab-bar").style.display = "none";
    }
});
