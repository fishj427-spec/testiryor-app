var screenHistory = ["screen-home"];
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
    const tabScreens = ["screen-home", "screen-stats", "screen-settings", "screen-schedule", "screen-questions", "screen-review", "screen-disciplines"];
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
    if (!activeTab && (screenId === "screen-questions" || screenId === "screen-review")) {
        activeTab = document.querySelector(`.tab-item[data-tab="home"]`);
    }
    if (activeTab) activeTab.classList.add("active");
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(screenId);
    if (target) target.classList.add("active");
    if (screenId === "screen-home") renderHome();
    if (screenId === "screen-stats") renderStats();
    if (screenId === "screen-settings") renderSettings();
    if (screenId === "screen-schedule") renderSchedule();
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
        const prev = screenHistory[screenHistory.length - 1] || "screen-home";
        navigateTo(prev, false);
    }
});
// [СМАХИВАНИЕ ВНИЗ: ЗАКРЫТИЕ ШТОРОК/МОДАЛОК ЖЕСТОМ]
function initModalDragToDismiss() {
    const configs = [
        { overlayId: "about-info-modal", cardSelector: ".about-modal-card", closeFn: () => (typeof closeAboutModal === "function" ? closeAboutModal() : null) },
        { overlayId: "exam-config-modal", cardSelector: ".exam-modal-card", closeFn: () => (typeof closeExamModal === "function" ? closeExamModal() : null) },
        { overlayId: "rehearsal-config-modal", cardSelector: ".rehearsal-modal-card", closeFn: () => (typeof closeRehearsalModal === "function" ? closeRehearsalModal() : null) },
        { overlayId: "welcome-discipline-modal", cardSelector: ".welcome-discipline-modal-card", closeFn: () => (typeof closeWelcomeDisciplineModal === "function" ? closeWelcomeDisciplineModal() : null) }
    ];

    configs.forEach(cfg => {
        const overlay = document.getElementById(cfg.overlayId);
        if (!overlay || overlay._dragInitialized) return;
        overlay._dragInitialized = true;

        const card = overlay.querySelector(cfg.cardSelector);
        if (!card) return;

        let startY = 0;
        let startX = 0;
        let isDragging = false;
        let startTime = 0;
        let startedOnHandle = false;

        function getY(e) {
            if (e.touches && e.touches.length > 0) return e.touches[0].clientY;
            if (e.changedTouches && e.changedTouches.length > 0) return e.changedTouches[0].clientY;
            return e.clientY;
        }

        function getX(e) {
            if (e.touches && e.touches.length > 0) return e.touches[0].clientX;
            if (e.changedTouches && e.changedTouches.length > 0) return e.changedTouches[0].clientX;
            return e.clientX;
        }

        function onStart(e) {
            if (!overlay.classList.contains("active")) return;
            const target = e.target;
            if (target.closest("button, input, select, textarea, .stepper-btn, .theme-mode-btn, a, .exam-modal-close")) {
                return;
            }

            const handle = card.querySelector(".modal-drag-handle");
            const header = card.querySelector(".exam-modal-header");
            const isHandle = handle && (handle === target || handle.contains(target));
            const isHeader = header && (header === target || header.contains(target));

            startedOnHandle = !!(isHandle || isHeader);

            // Если касание внутри контента, разрешаем жест только при прокрутке в самом верху
            if (!startedOnHandle && card.scrollTop > 5) {
                return;
            }

            startY = getY(e);
            startX = getX(e);
            startTime = Date.now();
            isDragging = false;
        }

        function onMove(e) {
            if (startY === 0) return;
            const y = getY(e);
            const x = getX(e);
            const deltaY = y - startY;
            const deltaX = x - startX;

            if (!startedOnHandle && card.scrollTop > 5) {
                startY = 0;
                isDragging = false;
                return;
            }

            if (!isDragging) {
                // Если преобладает горизонтальное движение при старте вне хэндла, игнорируем
                if (!startedOnHandle && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
                    startY = 0;
                    return;
                }

                if (deltaY > 6) {
                    isDragging = true;
                    card.style.transition = "none";
                    overlay.style.transition = "none";
                    document.body.style.userSelect = "none";
                    document.body.style.webkitUserSelect = "none";
                    const handle = card.querySelector(".modal-drag-handle");
                    if (handle) handle.classList.add("is-dragging");
                } else if (deltaY < -6 && !startedOnHandle) {
                    startY = 0;
                    return;
                }
            }

            if (isDragging) {
                if (e.cancelable) e.preventDefault();
                if (deltaY > 0) {
                    card.style.transform = `translateY(${deltaY}px)`;
                    const progress = Math.min(1, deltaY / 320);
                    overlay.style.backgroundColor = `rgba(0, 0, 0, ${Math.max(0.12, 0.65 * (1 - progress * 0.75))})`;
                } else {
                    card.style.transform = `translateY(${deltaY * 0.15}px)`;
                }
            }
        }

        function onEnd(e) {
            if (startY === 0 && !isDragging) return;
            const y = getY(e);
            const deltaY = y - startY;
            const timeDiff = Math.max(1, Date.now() - startTime);
            const velocity = deltaY / timeDiff;

            const handle = card.querySelector(".modal-drag-handle");
            if (handle) handle.classList.remove("is-dragging");
            document.body.style.userSelect = "";
            document.body.style.webkitUserSelect = "";

            startY = 0;

            if (isDragging) {
                isDragging = false;
                // Порог закрытия: сдвиг вниз > 75px или резкий смах (velocity > 0.35)
                const shouldDismiss = deltaY > 75 || (velocity > 0.35 && deltaY > 25);

                if (shouldDismiss) {
                    card.style.transition = "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)";
                    card.style.transform = "translateY(110%)";
                    overlay.style.transition = "opacity 0.22s ease";
                    overlay.style.opacity = "0";
                    if (typeof vibrate === "function") vibrate(10);

                    setTimeout(() => {
                        cfg.closeFn();
                        card.style.transform = "";
                        card.style.transition = "";
                        overlay.style.opacity = "";
                        overlay.style.transition = "";
                        overlay.style.backgroundColor = "";
                    }, 220);
                } else {
                    card.style.transition = "transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)";
                    card.style.transform = "translateY(0)";
                    overlay.style.transition = "background-color 0.26s ease";
                    overlay.style.backgroundColor = "";

                    setTimeout(() => {
                        card.style.transition = "";
                        overlay.style.transition = "";
                    }, 270);
                }
            }
        }

        // Слушатели touch для мобильных устройств
        card.addEventListener("touchstart", onStart, { passive: true });
        window.addEventListener("touchmove", onMove, { passive: false });
        window.addEventListener("touchend", onEnd, { passive: true });
        window.addEventListener("touchcancel", onEnd, { passive: true });

        // Слушатели мыши / pointer для десктопа
        card.addEventListener("mousedown", onStart);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onEnd);

        // Тап по самой плашке ручки также мягко закрывает модалку
        const handleEl = card.querySelector(".modal-drag-handle");
        if (handleEl) {
            handleEl.addEventListener("click", () => {
                if (!isDragging) {
                    if (typeof vibrate === "function") vibrate(8);
                    cfg.closeFn();
                }
            });
        }
    });
}
function initBackGesture() {
    initModalDragToDismiss();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initModalDragToDismiss);
} else {
    initModalDragToDismiss();
}

