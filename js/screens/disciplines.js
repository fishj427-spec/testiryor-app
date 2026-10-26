function renderDisciplines() {
    const container = document.getElementById("disciplines-list");
    if (!container) return;
    const activeId = getActiveDisciplineId();
    const allDisciplines = Object.values(DISCIPLINES_DATA);
    
    const banner = document.getElementById("disciplines-first-open-banner");
    if (banner) {
        const hasChosen = localStorage.getItem("quiz_discipline_chosen") === "true";
        banner.style.display = hasChosen ? "none" : "flex";
    }

    let html = "";
    allDisciplines.forEach(d => {
        const isActive = d.id === activeId;
        const qCount = d.questions.length;
        const tagsHtml = (d.tags || []).slice(0, 4).map(t => `<span class="disc-tag">${t}</span>`).join("");
        html += `
        <div class="discipline-card${isActive ? ' is-active' : ''}" onclick="selectDisciplineAndFeedback('${d.id}')" role="button" tabindex="0">
            <div class="disc-card-header">
                <div class="disc-icon-box" style="background:${d.gradient};box-shadow:0 6px 16px ${d.accentLight}">
                    ${d.iconSvg}
                </div>
                <div class="disc-header-info">
                    <div class="disc-title-row">
                        <h3 class="disc-title">${d.title}</h3>
                    </div>
                    <div class="disc-full-title">${d.fullTitle}</div>
                </div>
            </div>
            
            <div class="disc-tags-row">
                ${tagsHtml}
            </div>
            <div class="disc-footer">
                <div class="disc-stats">
                    <span class="disc-stat-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                        <strong>${qCount}</strong> ${pluralRu(qCount, 'вопрос', 'вопроса', 'вопросов')}
                    </span>
                </div>
                <div class="disc-action">
                    ${isActive ? `
                        <span class="disc-active-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            Активен
                        </span>
                    ` : ''}
                </div>
            </div>
        </div>
        `;
    });
    container.innerHTML = html;
}

function selectDisciplineAndFeedback(id) {
    setActiveDiscipline(id);
    localStorage.setItem("quiz_discipline_chosen", "true");
    const banner = document.getElementById("disciplines-first-open-banner");
    if (banner) banner.style.display = "none";
    if (typeof closeWelcomeDisciplineModal === "function") {
        closeWelcomeDisciplineModal();
    }
    renderDisciplines();
    setTimeout(() => {
        navigateTo("screen-home");
    }, 200);
}

function renderWelcomeDisciplineModal() {
    const list = document.getElementById("welcome-discipline-list");
    if (!list) return;
    const disciplines = Object.values(DISCIPLINES_DATA || {});
    const activeId = getActiveDisciplineId();

    let html = "";
    disciplines.forEach(d => {
        const qCount = d.questions.length;
        const isActive = d.id === activeId;
        const tags = (d.tags || []).slice(0, 3).join(" • ");
        html += `
        <div class="welcome-disc-card${isActive ? ' is-selected' : ''}" onclick="selectDisciplineFromWelcomeModal('${d.id}')" role="button" tabindex="0">
            <div class="welcome-disc-icon-box" style="background:${d.gradient};box-shadow:0 6px 16px ${d.accentLight}">
                ${d.iconSvg}
            </div>
            <div class="welcome-disc-info">
                <div class="welcome-disc-title-row">
                    <h4 class="welcome-disc-name">${d.title}</h4>
                    <span class="welcome-disc-qcount">${qCount} ${pluralRu(qCount, 'вопрос', 'вопроса', 'вопросов')}</span>
                </div>
                <div class="welcome-disc-full">${d.fullTitle}</div>
                ${tags ? `<div class="welcome-disc-tags">${tags}</div>` : ''}
            </div>
            <div class="welcome-disc-action">
                <span class="welcome-disc-select-btn">
                    Выбрать
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
            </div>
        </div>
        `;
    });
    list.innerHTML = html;
}

function openWelcomeDisciplineModal() {
    const modal = document.getElementById("welcome-discipline-modal");
    if (!modal) return;
    renderWelcomeDisciplineModal();
    modal.classList.add("active");
    if (typeof vibrate === "function") vibrate(10);
}

function closeWelcomeDisciplineModal() {
    const modal = document.getElementById("welcome-discipline-modal");
    if (!modal) return;
    modal.classList.remove("active");
}

function onWelcomeDisciplineOverlayClick(e) {
    if (e.target && e.target.id === "welcome-discipline-modal") {
        closeWelcomeDisciplineModal();
    }
}

function selectDisciplineFromWelcomeModal(id) {
    if (typeof setActiveDiscipline === "function") {
        setActiveDiscipline(id);
    }
    localStorage.setItem("quiz_discipline_chosen", "true");
    if (typeof vibrate === "function") vibrate(20);
    closeWelcomeDisciplineModal();
    const banner = document.getElementById("disciplines-first-open-banner");
    if (banner) banner.style.display = "none";
    if (typeof renderDisciplines === "function") {
        renderDisciplines();
    }
}

function onQuestionsCardClick() {
    if (localStorage.getItem("quiz_discipline_chosen") !== "true") {
        if (typeof openWelcomeDisciplineModal === "function") {
            openWelcomeDisciplineModal();
            return;
        }
    }
    navigateTo('screen-questions');
}

if (typeof window !== "undefined") {
    window.renderDisciplines = renderDisciplines;
    window.selectDisciplineAndFeedback = selectDisciplineAndFeedback;
    window.renderWelcomeDisciplineModal = renderWelcomeDisciplineModal;
    window.openWelcomeDisciplineModal = openWelcomeDisciplineModal;
    window.closeWelcomeDisciplineModal = closeWelcomeDisciplineModal;
    window.onWelcomeDisciplineOverlayClick = onWelcomeDisciplineOverlayClick;
    window.selectDisciplineFromWelcomeModal = selectDisciplineFromWelcomeModal;
    window.onQuestionsCardClick = onQuestionsCardClick;
}
