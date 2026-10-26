let currentRehearsalTag = "all";
function getSavedRehearsalTag() {
    const t = localStorage.getItem("quiz_rehearsal_tag") || "all";
    const tags = (typeof getActiveTagFilters === "function") ? getActiveTagFilters() : [];
    return tags.some(item => item.id === t) ? t : "all";
}
function getRehearsalTagCounts() {
    if (typeof getQuestionTagCounts === "function") {
        return getQuestionTagCounts();
    }
    const total = (typeof QUIZ_QUESTIONS !== "undefined") ? QUIZ_QUESTIONS.length : 25;
    return { all: total };
}
function updateRehearsalCardSubtitle() {
    const el = document.getElementById("rehearsal-mode-subtitle");
    if (!el) return;
    const tag = getSavedRehearsalTag();
    const counts = getRehearsalTagCounts();
    const tags = (typeof getActiveTagFilters === "function") ? getActiveTagFilters() : [];
    const meta = tags.find(t => t.id === tag);
    const label = meta ? meta.label : "Все вопросы";
    const count = counts[tag] ?? counts.all ?? 0;
    el.textContent = `${label} (${count}) · без ограничений`;
}
function openRehearsalModal() {
    if (localStorage.getItem("quiz_discipline_chosen") !== "true") {
        if (typeof openWelcomeDisciplineModal === "function") {
            openWelcomeDisciplineModal();
            return;
        }
    }
    vibrate(10);
    currentRehearsalTag = getSavedRehearsalTag();
    syncRehearsalModalUI();
    const modal = document.getElementById("rehearsal-config-modal");
    if (modal) {
        modal.classList.add("active");
        updateTelegramBackButton();
    }
}
function closeRehearsalModal() {
    const modal = document.getElementById("rehearsal-config-modal");
    if (modal) {
        modal.classList.remove("active");
        updateTelegramBackButton();
    }
}
function onRehearsalModalOverlayClick(e) {
    if (e.target && e.target.id === "rehearsal-config-modal") {
        closeRehearsalModal();
    }
}
function selectRehearsalTag(tag) {
    vibrate(8);
    currentRehearsalTag = tag;
    syncRehearsalModalUI();
}
function renderRehearsalOptionsList() {
    const list = document.getElementById("rehearsal-options-list");
    if (!list) return;
    const tags = (typeof getActiveTagFilters === "function") ? getActiveTagFilters() : [];
    const counts = getRehearsalTagCounts();
    if (!tags.some(t => t.id === currentRehearsalTag)) {
        currentRehearsalTag = "all";
    }
    let html = "";
    tags.forEach(t => {
        const isActive = t.id === currentRehearsalTag;
        const count = counts[t.id] ?? 0;
        const desc = t.desc || (t.id === "all" ? "Полная база заданий" : t.label);
        html += `
        <div class="rehearsal-option-card${isActive ? ' active' : ''}" data-tag="${t.id}" onclick="selectRehearsalTag('${t.id}')">
            <div class="rehearsal-opt-left">
                <div class="rehearsal-opt-icon ${t.id}">
                    ${t.iconSvg}
                </div>
                <div class="rehearsal-opt-text">
                    <h4>${t.label}</h4>
                    <p>${desc}</p>
                </div>
            </div>
            <span class="rehearsal-opt-badge" id="rehearsal-count-${t.id}">${count}</span>
        </div>
        `;
    });
    list.innerHTML = html;
}
function syncRehearsalModalUI() {
    renderRehearsalOptionsList();
    const sumTitle = document.getElementById("rehearsal-summary-title");
    const sumSub = document.getElementById("rehearsal-summary-sub");
    const counts = getRehearsalTagCounts();
    const tags = (typeof getActiveTagFilters === "function") ? getActiveTagFilters() : [];
    const meta = tags.find(t => t.id === currentRehearsalTag) || tags[0] || { label: "Все вопросы", desc: "Полная база" };
    const count = counts[currentRehearsalTag] ?? counts.all ?? 0;
    if (sumTitle) {
        sumTitle.textContent = `${meta.label} - ${count} ${pluralRu(count, 'задание', 'задания', 'заданий')}`;
    }
    if (sumSub) {
        sumSub.textContent = meta.desc || "Тренировка без ограничения по времени";
    }
}
function confirmStartRehearsal() {
    vibrate(12);
    localStorage.setItem("quiz_rehearsal_tag", currentRehearsalTag);
    updateRehearsalCardSubtitle();
    closeRehearsalModal();
    startRehearsal(currentRehearsalTag);
}