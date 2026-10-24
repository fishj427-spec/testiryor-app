let currentQuestionTag = "all";
function getQuestionType(q) {
    const disc = (typeof getActiveDiscipline === "function") ? getActiveDiscipline() : null;
    if (disc && typeof disc.getTagForQuestion === "function") {
        return disc.getTagForQuestion(q);
    }
    if (!q || !q.text) return { id: "question", label: "Теория", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' };
    const t = q.text.toLowerCase();
    const isFormula = t.includes("рассчитывается") || 
                      t.includes("определяется как") || 
                      t.includes("определяется следующим образом") || 
                      t.includes("по формуле") || 
                      t.includes("формул") ||
                      t.includes("выражается формулой") ||
                      t.includes("расчет ведется") ||
                      t.includes("∑") ||
                      t.includes("трц");
    const hasNumbersInText = /\d+[\s\u00a0]*(млн|тыс|руб|р\.|т|%|чел|ед|дн|м2|шт|смен)/.test(t) ||
                             t.includes("составит:") || 
                             t.includes("составит руб") ||
                             t.includes("составит %") ||
                             t.includes("составит ед") ||
                             t.includes("составит дней") ||
                             t.includes("составит (тыс") ||
                             (t.includes("определить") && /\d+/.test(t));
    if (hasNumbersInText && !t.includes("не менее 2") && !t.includes("в течение")) {
        return {
            id: "task",
            label: "Задача",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>'
        };
    }
    if (isFormula) {
        return {
            id: "formula",
            label: "Формула",
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4H6l7 8-7 8h12"/></svg>'
        };
    }
    return {
        id: "question",
        label: "Теория",
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
    };
}
function getActiveTagFilters() {
    const disc = (typeof getActiveDiscipline === "function") ? getActiveDiscipline() : null;
    if (disc && Array.isArray(disc.tagFilters) && disc.tagFilters.length > 0) {
        return disc.tagFilters;
    }
    return [
        { id: "all", label: "Все", iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
        { id: "question", label: "Теория", iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
        { id: "task", label: "Задачи", iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/></svg>' },
        { id: "formula", label: "Формулы", iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 4H6l7 8-7 8h12"/></svg>' }
    ];
}
function getQuestionTagCounts() {
    const questions = (typeof QUIZ_QUESTIONS !== "undefined" && Array.isArray(QUIZ_QUESTIONS)) ? QUIZ_QUESTIONS : [];
    const counts = { all: questions.length };
    const tags = getActiveTagFilters();
    tags.forEach(t => { if (t.id !== "all") counts[t.id] = 0; });
    questions.forEach(q => {
        const type = getQuestionType(q).id;
        if (counts[type] !== undefined) counts[type]++;
    });
    return counts;
}
function renderQuestionTagFilters() {
    const container = document.getElementById("questions-tag-filter");
    if (!container) return;
    const tags = getActiveTagFilters();
    const counts = getQuestionTagCounts();
    if (!tags.some(t => t.id === currentQuestionTag)) {
        currentQuestionTag = "all";
    }
    let html = "";
    tags.forEach(t => {
        const isActive = t.id === currentQuestionTag;
        const count = counts[t.id] ?? 0;
        html += `<button type="button" class="q-filter-tag${isActive ? ' active' : ''}" data-type="${t.id}" onclick="setQuestionTagFilter('${t.id}')">
            ${t.iconSvg}
            <span>${t.label}</span>
            <span class="q-tag-count" id="count-tag-${t.id}">${count}</span>
        </button>`;
    });
    container.innerHTML = html;
}
function setQuestionTagFilter(tag) {
    currentQuestionTag = tag;
    vibrate(8);
    const buttons = document.querySelectorAll(".q-filter-tag");
    buttons.forEach(btn => {
        if (btn.dataset.type === tag) btn.classList.add("active");
        else btn.classList.remove("active");
    });
    filterQuestions();
}
function updateQuestionTagCounts() {
    renderQuestionTagFilters();
}
function renderAllQuestions(filter = "") {
    renderQuestionTagFilters();
    const container = document.getElementById("questions-list-container");
    const countEl = document.getElementById("search-count");
    if (!container || !countEl) return;
    const query = filter.toLowerCase().trim();
    let questions = (typeof QUIZ_QUESTIONS !== "undefined" && Array.isArray(QUIZ_QUESTIONS)) ? QUIZ_QUESTIONS : [];
    if (currentQuestionTag && currentQuestionTag !== "all") {
        questions = questions.filter(q => getQuestionType(q).id === currentQuestionTag);
    }
    if (query) { 
        questions = questions.filter(q => q.text.toLowerCase().includes(query) || q.options.some(a => a.toLowerCase().includes(query))); 
    }
    const tags = getActiveTagFilters();
    const activeTagMeta = tags.find(t => t.id === currentQuestionTag);
    const tagPlural = activeTagMeta ? (activeTagMeta.pluralName || activeTagMeta.label) : "";
    const totalQ = (typeof QUIZ_QUESTIONS !== "undefined" && Array.isArray(QUIZ_QUESTIONS)) ? QUIZ_QUESTIONS.length : 0;
    if (currentQuestionTag !== "all" && tagPlural) {
        countEl.textContent = `Найдено: ${questions.length} из ${totalQ} (${tagPlural})`;
    } else {
        countEl.textContent = `Найдено: ${questions.length} из ${totalQ}`;
    }
    let html = "";
    questions.forEach((q) => {
        const realIdx = QUIZ_QUESTIONS.indexOf(q);
        const typeInfo = getQuestionType(q);
        const multi = Array.isArray(q.correct) && q.correct.length > 1;
        const multiBadge = multi ? '<span class="multi-badge">Несколько ответов</span>' : '';
        const badgeText = q.variantLabel || typeInfo.label;
        html += `<div class="question-list-item">
            <div class="question-list-num">
                <span>Вопрос ${realIdx + 1}</span>
                <span class="q-type-badge q-badge-${typeInfo.id}" onclick="setQuestionTagFilter('${typeInfo.id}')" title="Фильтровать по: ${typeInfo.label}">${typeInfo.icon} ${badgeText}</span>
                ${multiBadge}
            </div>
            <div class="question-list-text">${q.text}</div>
            <div class="question-list-answers">`;
        q.options.forEach((a, ai) => {
            let isCorrect = Array.isArray(q.correct) ? q.correct.includes(ai) : ai === q.correct;
            if (!isCorrect) return;
            html += `<div class="question-list-answer is-correct">${a}</div>`;
        });
        html += `</div></div>`;
    });
    container.innerHTML = html || '<div class="no-data"><h3>Ничего не найдено</h3><p>Попробуйте изменить поисковый запрос или выбрать другой тег</p></div>';
}
function filterQuestions() { 
    renderAllQuestions(document.getElementById("search-input").value); 
}