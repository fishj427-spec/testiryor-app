function openTestReview() { 
    state.reviewQuestions = [...state.quizQuestions];
    state.reviewUserAnswers = [...state.userAnswers]; 
    navigateTo("screen-review");
}
function renderTestReview() {
    const container = document.getElementById("review-list-container");
    const countEl = document.getElementById("review-count");
    if (!container || !countEl) return;
    countEl.textContent = `Вопросов в тесте: ${state.reviewQuestions.length}`;
    let html = "";
    state.reviewQuestions.forEach((q, qIdx) => {
        const userAnswer = state.reviewUserAnswers[qIdx];
        const isCorrect = Array.isArray(q.correct) 
            ? (Array.isArray(userAnswer) && new Set(q.correct).size === new Set(userAnswer).size && q.correct.every(v => userAnswer.includes(v))) 
            : (userAnswer === q.correct);
        const statusIcon = isCorrect ? SVG_ICONS.checkCircle : SVG_ICONS.xCircle;
        const multiLabel = Array.isArray(q.correct) ? ' <span class="multi-badge">Несколько ответов</span>' : '';
        const borderColor = isCorrect ? 'var(--success)' : 'var(--error)';
        const typeInfo = getQuestionType(q);
        html += `<div class="question-list-item" style="border-left: 4px solid ${borderColor}">
            <div class="question-list-num" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">${statusIcon} <span>Вопрос ${qIdx + 1}</span><span class="q-type-badge q-badge-${typeInfo.id}">${typeInfo.icon} ${typeInfo.label}</span>${multiLabel}</div>
            <div class="question-list-text">${q.text}</div>
            <div class="question-list-answers review-answers">`;
        q.options.forEach((a, ai) => {
            const isUserSelected = Array.isArray(q.correct) ? (Array.isArray(userAnswer) && userAnswer.includes(ai)) : (userAnswer === ai);
            const isCorrectAnswer = Array.isArray(q.correct) ? q.correct.includes(ai) : (ai === q.correct);

            // Оставляем только верные ответы и ответы, выбранные пользователем. Остальные скрываем.
            if (!isCorrectAnswer && !isUserSelected) return;
            let className = "question-list-answer";
            let prefix = "";

            if (isCorrectAnswer && isUserSelected) { className += " is-correct"; prefix = `<span class="review-prefix-icon">${SVG_ICONS.checkCircle}</span> Вы выбрали: `; }
            else if (isCorrectAnswer) { className += " is-correct"; prefix = `<span class="review-prefix-icon">${SVG_ICONS.checkCircle}</span> Верный ответ: `; }
            else if (isUserSelected) { className += " wrong"; prefix = `<span class="review-prefix-icon">${SVG_ICONS.xCircle}</span> Вы выбрали: `; }
            html += `<div class="${className}">${prefix}${a}</div>`;
        });
        const hasUserAnswer = Array.isArray(userAnswer) ? (userAnswer && userAnswer.length > 0) : (userAnswer !== undefined && userAnswer !== null);
        if (!hasUserAnswer) {
            html += `<div class="question-list-answer wrong"><span class="review-prefix-icon">${SVG_ICONS.xCircle}</span> Вы не дали ответ</div>`;
        }
        html += `</div></div>`;
    });
    container.innerHTML = html;
}
// [НАСТРОЙКА КОНТРОЛЬНОЙ] Логика плажки выбора вопросов и таймера