function goToOnboarding(step) {
    document.getElementById(`screen-onboard-${step-1}`).classList.remove("active");
    setTimeout(() => document.getElementById(`screen-onboard-${step}`).classList.add("active"), 300);
}
function skipOnboarding() {
    localStorage.setItem("visited","true");
    screenHistory = ["screen-home"];
    try { window.history.replaceState({ screen: "screen-home" }, "", window.location.href); } catch (e) {}
    navigateTo("screen-home", false);
    const hasChosen = localStorage.getItem("quiz_discipline_chosen") === "true";
    if (!hasChosen && typeof openWelcomeDisciplineModal === "function") {
        setTimeout(openWelcomeDisciplineModal, 250);
    }
}
function finishOnboarding() {
    localStorage.setItem("visited","true");
    screenHistory = ["screen-home"];
    try { window.history.replaceState({ screen: "screen-home" }, "", window.location.href); } catch (e) {}
    navigateTo("screen-home", false);
    const hasChosen = localStorage.getItem("quiz_discipline_chosen") === "true";
    if (!hasChosen && typeof openWelcomeDisciplineModal === "function") {
        setTimeout(openWelcomeDisciplineModal, 250);
    }
}
