function renderDisciplines() {
    const container = document.getElementById("disciplines-list");
    if (!container) return;
    const activeId = getActiveDisciplineId();
    const allDisciplines = Object.values(DISCIPLINES_DATA);
    const backBtn = document.getElementById("disciplines-back-btn");
    if (backBtn) {
        backBtn.style.display = (screenHistory.length > 1) ? "flex" : "none";
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
            <p class="disc-description">${d.description}</p>
            <div class="disc-tags-row">
                ${tagsHtml}
            </div>
            <div class="disc-footer">
                <div class="disc-stats">
                    <span class="disc-stat-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                        <strong>${qCount}</strong> ${pluralRu(qCount, 'вопрос', 'вопроса', 'вопросов')}
                    </span>
                    <span class="disc-stat-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Экзамен + Обучение
                    </span>
                </div>
                <div class="disc-action">
                    ${isActive ? `
                        <span class="disc-active-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            Активна
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
    renderDisciplines();
    setTimeout(() => {
        navigateTo("screen-home");
    }, 200);
}
