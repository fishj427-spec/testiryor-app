function openAboutModal() {
    vibrate(10);
    const modal = document.getElementById("about-info-modal");
    if (modal) {
        const disc = typeof getActiveDiscipline === "function" ? getActiveDiscipline() : null;
        const sub = modal.querySelector(".exam-modal-subtitle");
        if (sub && disc) {
            sub.textContent = `QuizApp: ${disc.title} v2.9.0`;
        }
        modal.classList.add("active");
        updateTelegramBackButton();
    }
}
function closeAboutModal() {
    const modal = document.getElementById("about-info-modal");
    if (modal) {
        modal.classList.remove("active");
        updateTelegramBackButton();
    }
}
function onAboutModalOverlayClick(e) {
    if (e.target && e.target.id === "about-info-modal") {
        closeAboutModal();
    }
}