let currentExamQCount = 20;
let currentExamTimeMinutes = 45;
function getSavedExamQCount() {
    const maxQ = (typeof QUIZ_QUESTIONS !== "undefined" && QUIZ_QUESTIONS.length) ? QUIZ_QUESTIONS.length : 255;
    const v = parseInt(localStorage.getItem("quiz_exam_q_count") || "20", 10);
    return (!isNaN(v) && v >= 5 && v <= maxQ) ? v : Math.min(20, maxQ);
}
function getSavedExamTimeMinutes() {
    const v = parseInt(localStorage.getItem("quiz_exam_time_min") || "45", 10);
    return (!isNaN(v) && v >= 0 && v <= 180) ? v : 45;
}
function getExamInstantFeedback() {
    return localStorage.getItem("quiz_exam_instant_feedback") === "true";
}
function setExamInstantFeedback(val) {
    localStorage.setItem("quiz_exam_instant_feedback", val ? "true" : "false");
    const toggle = document.getElementById("exam-instant-feedback-toggle");
    if (toggle) toggle.checked = !!val;
    vibrate(8);
}
function toggleExamInstantFeedback() {
    const current = getExamInstantFeedback();
    setExamInstantFeedback(!current);
}
function updateExamCardSubtitle() {
    const el = document.getElementById("exam-mode-subtitle");
    if (!el) return;
    const q = getSavedExamQCount();
    const t = getSavedExamTimeMinutes();
    const instant = getExamInstantFeedback();
    const qStr = `${q} ${pluralRu(q, 'вопрос', 'вопроса', 'вопросов')}`;
    const tStr = t > 0 ? `${t} ${pluralRu(t, 'минута', 'минуты', 'минут')}` : 'без таймера';
    const instantStr = instant ? ' · ответы сразу' : '';
    el.textContent = `${qStr} · ${tStr}${instantStr}`;
}
function openExamModal() {
    if (localStorage.getItem("quiz_discipline_chosen") !== "true") {
        if (typeof openWelcomeDisciplineModal === "function") {
            openWelcomeDisciplineModal();
            return;
        }
    }
    vibrate(10);
    currentExamQCount = getSavedExamQCount();
    currentExamTimeMinutes = getSavedExamTimeMinutes();
    syncExamModalUI();
    const modal = document.getElementById("exam-config-modal");
    if (modal) {
        modal.classList.add("active");
        updateTelegramBackButton();
    }
}
function closeExamModal() {
    const modal = document.getElementById("exam-config-modal");
    if (modal) {
        modal.classList.remove("active");
        updateTelegramBackButton();
    }
}
function onExamModalOverlayClick(e) {
    if (e.target && e.target.id === "exam-config-modal") {
        closeExamModal();
    }
}
function stepExamQCount(delta) {
    vibrate(8);
    const maxQ = (typeof QUIZ_QUESTIONS !== "undefined" && QUIZ_QUESTIONS.length) ? QUIZ_QUESTIONS.length : 255;
    let next = currentExamQCount + delta;
    if (next < 5) next = 5;
    if (next > maxQ) next = maxQ;
    currentExamQCount = next;
    syncExamModalUI();
}
function stepExamTime(delta) {
    vibrate(8);
    let next = currentExamTimeMinutes + delta;
    if (next < 0) next = 0;
    if (next > 180) next = 180;
    currentExamTimeMinutes = next;
    syncExamModalUI();
}
function syncExamModalUI() {
    const maxQ = (typeof QUIZ_QUESTIONS !== "undefined" && QUIZ_QUESTIONS.length) ? QUIZ_QUESTIONS.length : 255;
    if (currentExamQCount > maxQ) currentExamQCount = maxQ;
    const qVal = document.getElementById("exam-stepper-q-val");
    if (qVal) qVal.textContent = currentExamQCount === maxQ ? `Все (${maxQ})` : currentExamQCount;
    const tVal = document.getElementById("exam-stepper-time-val");
    if (tVal) tVal.textContent = currentExamTimeMinutes === 0 ? "Без лимита" : `${currentExamTimeMinutes} мин`;
    const toggle = document.getElementById("exam-instant-feedback-toggle");
    if (toggle) toggle.checked = getExamInstantFeedback();
    const sumTitle = document.getElementById("exam-summary-title");
    const sumSub = document.getElementById("exam-summary-sub");
    if (sumTitle) {
        const qStr = `${currentExamQCount} ${pluralRu(currentExamQCount, 'вопрос', 'вопроса', 'вопросов')}`;
        const tStr = currentExamTimeMinutes > 0 ? `${currentExamTimeMinutes} ${pluralRu(currentExamTimeMinutes, 'минута', 'минуты', 'минут')}` : 'без таймера';
        sumTitle.textContent = `${qStr} · ${tStr}`;
    }
    if (sumSub) {
        const feedbackNote = getExamInstantFeedback() ? " · Верные ответы подсвечиваются сразу" : "";
        if (currentExamTimeMinutes > 0) {
            const perQ = (currentExamTimeMinutes / currentExamQCount).toFixed(1);
            sumSub.textContent = `В среднем ~${perQ} мин на 1 вопрос${feedbackNote}`;
        } else {
            sumSub.textContent = `Спокойное прохождение без таймера${feedbackNote}`;
        }
    }
}
function confirmStartExam() {
    vibrate(12);
    localStorage.setItem("quiz_exam_q_count", currentExamQCount.toString());
    localStorage.setItem("quiz_exam_time_min", currentExamTimeMinutes.toString());
    updateExamCardSubtitle();
    closeExamModal();
    startExam(currentExamQCount, currentExamTimeMinutes);
}