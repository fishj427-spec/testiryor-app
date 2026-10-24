function startExam(customQCount, customTimeMinutes) { 
    state.quizMode = "exam"; 
    state.showInstantFeedback = (typeof getExamInstantFeedback === "function") ? getExamInstantFeedback() : false;
    const qCount = (typeof customQCount === "number" && customQCount > 0) ? Math.min(customQCount, QUIZ_QUESTIONS.length) : getSavedExamQCount();
    const timeMinutes = (typeof customTimeMinutes === "number") ? customTimeMinutes : getSavedExamTimeMinutes();
    state.examTimeMinutes = timeMinutes;
    state.quizQuestions = shuffleArray([...QUIZ_QUESTIONS]).slice(0, qCount); 
    state.currentQuestionIndex = 0; 
    state.correctCount = 0; 
    state.userAnswers = new Array(state.quizQuestions.length).fill(undefined); 
    const badge = document.getElementById("quiz-mode-badge"); 
    badge.innerHTML = `${SVG_ICONS.exam} Контрольная (${qCount} в.)`; 
    badge.className = "quiz-mode-badge badge-exam-badge"; 
    const timer = document.getElementById("quiz-timer"); 
    if (timeMinutes > 0) {
        state.timerValue = timeMinutes * 60; 
        timer.style.display = "flex"; 
        updateTimerDisplay(); 
        timer.className = "quiz-timer"; 
    } else {
        state.timerValue = 0;
        timer.style.display = "none";
    }
    const timeupDesc = document.getElementById("timeup-desc");
    if (timeupDesc && timeMinutes > 0) {
        timeupDesc.textContent = `${timeMinutes} ${pluralRu(timeMinutes, 'минута', 'минуты', 'минут')} истекли. Посмотрим твой результат.`;
    }
    document.getElementById("timeup-overlay").classList.remove("active"); 
    navigateTo("screen-quiz"); 
    setTimeout(() => loadQuestion(), 400); 
    if (timeMinutes > 0) {
        startExamTimer(); 
    }
}
// [НАСТРОЙКА РЕПЕТИЦИОННОГО] Выбор тегов или всех вопросов
function startRehearsal(selectedTag = "all") { 
    state.quizMode = "rehearsal"; 
    state.rehearsalTag = selectedTag || "all";
    let pool = [...QUIZ_QUESTIONS];
    if (selectedTag && selectedTag !== "all") {
        pool = pool.filter(q => getQuestionType(q).id === selectedTag);
    }
    state.quizQuestions = shuffleArray(pool); 
    state.currentQuestionIndex = 0; 
    state.correctCount = 0; 
    state.userAnswers = new Array(state.quizQuestions.length).fill(undefined); 
    const tags = (typeof getActiveTagFilters === "function") ? getActiveTagFilters() : [];
    const meta = tags.find(t => t.id === selectedTag);
    const label = meta ? meta.label : (selectedTag === "all" ? "Все вопросы" : "Репетиционный");
    const badge = document.getElementById("quiz-mode-badge"); 
    badge.innerHTML = `${SVG_ICONS.rehearsal} ${label} (${state.quizQuestions.length} в.)`; 
    badge.className = "quiz-mode-badge badge-rehearsal-badge"; 
    document.getElementById("quiz-timer").style.display = "none"; 
    document.getElementById("timeup-overlay").classList.remove("active"); 
    navigateTo("screen-quiz"); 
    setTimeout(() => loadQuestion(), 400); 
}
function loadQuestion() { 
    const q = state.quizQuestions[state.currentQuestionIndex]; 
    const total = state.quizQuestions.length; 
    const current = state.currentQuestionIndex + 1; 
    const pct = (state.currentQuestionIndex / total) * 100; 
    document.getElementById("progress-fill").style.width = pct + "%"; 
    document.getElementById("progress-counter").textContent = `${current} / ${total}`; 
    document.getElementById("question-text").textContent = q.text; 
    const hint = document.getElementById("question-hint"); 
    if (Array.isArray(q.correct)) { hint.style.display = "flex"; document.getElementById("hint-text").textContent = `Выберите ${q.correct.length} правильных ответа(ов)`; } else { hint.style.display = "none"; } 
    const answerIndices = q.options.map((_, i) => i); 
    state.shuffledAnswers = shuffleArray(answerIndices); 
    const list = document.getElementById("answers-list"); 
    list.innerHTML = ""; 
    const savedAnswer = state.userAnswers[state.currentQuestionIndex]; 
    if (Array.isArray(q.correct)) {
        const selectedIndices = savedAnswer || [];
        const isInstant = (state.quizMode === "rehearsal" || state.showInstantFeedback);
        state.shuffledAnswers.forEach((origIdx, i) => {
            const isSelected = selectedIndices.includes(origIdx);
            const btn = document.createElement("button");
            let cls = "answer-btn";
            if (isSelected) {
                cls += " selected";
                if (isInstant) {
                    if (q.correct.includes(origIdx)) {
                        cls += " correct";
                    } else {
                        cls += " wrong";
                    }
                }
            }
            btn.className = cls;
            btn.innerHTML = `<div class="answer-checkbox"></div><span>${q.options[origIdx]}</span>`;
            btn.onclick = () => toggleAnswer(btn, origIdx);
            list.appendChild(btn);
        });
    } else {
        state.shuffledAnswers.forEach((origIdx, i) => {
            const isSelected = savedAnswer === origIdx;
            const btn = document.createElement("button");
            btn.className = "answer-btn" + (isSelected ? " selected" : "");
            btn.innerHTML = `<span class="answer-letter">${getAnswerLetter(i)}</span><span>${q.options[origIdx]}</span>`;
            btn.onclick = () => {
                if ((state.quizMode === "rehearsal" || state.showInstantFeedback) && state.userAnswers[state.currentQuestionIndex] === undefined) {
                    selectSingleAnswerRehearsal(btn, origIdx);
                } else {
                    selectSingleAnswer(btn, origIdx);
                }
            };
            list.appendChild(btn);
        });
    } 
    // Восстановление выбора при возврате
    if (savedAnswer !== undefined && savedAnswer !== null) {
        if (Array.isArray(q.correct)) { savedAnswer.forEach(idx => { const btnIdx = state.shuffledAnswers.indexOf(idx); if (btnIdx !== -1) list.children[btnIdx]?.classList.add('selected'); }); } 
        else { const btnIdx = state.shuffledAnswers.indexOf(savedAnswer); if (btnIdx !== -1) list.children[btnIdx]?.classList.add('selected'); }
    } 
    // [FIX] Восстановление интерфейса репетиционного режима при возврате
    if ((state.quizMode === "rehearsal" || state.showInstantFeedback) && savedAnswer !== undefined && savedAnswer !== null) {
        const allBtns = list.querySelectorAll(".answer-btn");
        if (!Array.isArray(q.correct)) {
            allBtns.forEach(b => b.classList.add("disabled"));
            const correctIdx = q.correct;
            const correctBtnIdx = state.shuffledAnswers.indexOf(correctIdx);
            if (correctBtnIdx !== -1) allBtns[correctBtnIdx].classList.add("correct");
            if (savedAnswer !== correctIdx) {
                const wrongBtnIdx = state.shuffledAnswers.indexOf(savedAnswer);
                if (wrongBtnIdx !== -1) allBtns[wrongBtnIdx].classList.add("wrong");
            }
        } else {
            (Array.isArray(savedAnswer) ? savedAnswer : []).forEach(userIdx => {
                const idx = state.shuffledAnswers.indexOf(userIdx);
                if (idx !== -1) {
                    if (q.correct.includes(userIdx)) {
                        allBtns[idx].classList.add("correct");
                        allBtns[idx].classList.remove("wrong");
                    } else {
                        allBtns[idx].classList.add("wrong");
                        allBtns[idx].classList.remove("correct");
                    }
                }
            });
        }
    } 
    updateNavButtons(); 
}
function hasAnswer() { const saved = state.userAnswers[state.currentQuestionIndex]; if (saved === undefined || saved === null) return false; if (Array.isArray(saved)) return saved.length > 0; return true; }
function toggleAnswer(btn, origIdx) {
    const q = state.quizQuestions[state.currentQuestionIndex];
    const isInstant = (state.quizMode === "rehearsal" || state.showInstantFeedback);
    const isNowSelected = btn.classList.toggle("selected");
    
    if (isInstant) {
        const isCorrect = Array.isArray(q.correct) ? q.correct.includes(origIdx) : (origIdx === q.correct);
        if (isNowSelected) {
            if (isCorrect) {
                btn.classList.add("correct");
                btn.classList.remove("wrong");
                vibrate(10);
            } else {
                btn.classList.add("wrong");
                btn.classList.remove("correct");
                vibrate(150);
            }
        } else {
            btn.classList.remove("correct", "wrong");
            vibrate(8);
        }
    } else {
        vibrate(8);
    }
    
    const allBtns = document.querySelectorAll(".answer-btn");
    const selected = [];
    allBtns.forEach((b) => {
        if (b.classList.contains("selected")) {
            const btnIdx = Array.from(allBtns).indexOf(b);
            selected.push(state.shuffledAnswers[btnIdx]);
        }
    });
    state.userAnswers[state.currentQuestionIndex] = selected;
    updateNavButtons();
}
function selectSingleAnswer(btn, origIdx) { document.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("selected")); btn.classList.add("selected"); state.userAnswers[state.currentQuestionIndex] = origIdx; updateNavButtons(); }
function selectSingleAnswerRehearsal(btn, origIdx) { const q = state.quizQuestions[state.currentQuestionIndex]; const allBtns = document.querySelectorAll(".answer-btn"); allBtns.forEach(b => b.classList.add("disabled")); state.userAnswers[state.currentQuestionIndex] = origIdx; if (origIdx === q.correct) { btn.classList.add("correct"); state.correctCount++; } else { btn.classList.add("wrong"); vibrate(150); const correctBtnIdx = state.shuffledAnswers.indexOf(q.correct); if (correctBtnIdx !== -1) allBtns[correctBtnIdx].classList.add("correct"); } updateNavButtons(); }
function updateNavButtons() { const prevBtn = document.getElementById("btn-prev"); const nextBtn = document.getElementById("btn-next"); const total = state.quizQuestions.length; prevBtn.disabled = state.currentQuestionIndex === 0; if (hasAnswer()) nextBtn.classList.add("active"); else nextBtn.classList.remove("active"); if (state.currentQuestionIndex === total - 1) { nextBtn.innerHTML = `${SVG_ICONS.check} Завершить`; if (hasAnswer()) nextBtn.classList.add("btn-submit"); else nextBtn.classList.remove("btn-submit"); } else { nextBtn.innerHTML = `Далее ${SVG_ICONS.chevronRight}`; nextBtn.classList.remove("btn-submit"); } }
function goToPrevQuestion() { if (state.currentQuestionIndex > 0) { state.currentQuestionIndex--; loadQuestion(); } }
function goToNextQuestion() { if (!hasAnswer()) return; const total = state.quizQuestions.length; if (state.currentQuestionIndex < total - 1) { state.currentQuestionIndex++; loadQuestion(); } else { calculateResults(); showResults(); } }
function calculateResults() { state.correctCount = 0; state.quizQuestions.forEach((q, idx) => { const saved = state.userAnswers[idx]; if (saved === undefined || saved === null) return; if (Array.isArray(q.correct)) { const correctSet = new Set(q.correct); const selectedSet = new Set(saved); if (correctSet.size === selectedSet.size && [...correctSet].every(v => selectedSet.has(v))) state.correctCount++; } else { if (saved === q.correct) state.correctCount++; } }); }
function updateTimerDisplay() { const timer = document.getElementById("quiz-timer"); const textEl = document.getElementById("quiz-timer-text"); const mins = Math.floor(state.timerValue / 60); const secs = state.timerValue % 60; const formatted = `${mins}:${secs.toString().padStart(2, '0')}`; if (textEl) { textEl.textContent = formatted; } else { timer.innerHTML = `${SVG_ICONS.timer} <span id="quiz-timer-text">${formatted}</span>`; } if (state.timerValue <= 300) timer.className = "quiz-timer danger"; else if (state.timerValue <= 600) timer.className = "quiz-timer warning"; else timer.className = "quiz-timer"; }
function startExamTimer() { 
    if (state.timerInterval) clearInterval(state.timerInterval); 
    if (!state.examTimeMinutes || state.examTimeMinutes <= 0) return;
    state.timerInterval = setInterval(() => { 
        state.timerValue--; 
        updateTimerDisplay(); 
        if (state.timerValue <= 0) { 
            clearInterval(state.timerInterval); 
            state.timerInterval = null; 
            calculateResults(); 
            document.getElementById("timeup-overlay").classList.add("active"); 
        } 
    }, 1000); 
}
function showResults() { document.getElementById("timeup-overlay").classList.remove("active"); if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; } const total = state.quizQuestions.length; const pct = total > 0 ? Math.round(state.correctCount / total * 100) : 0; const grade = Math.round((pct / 100) * 5); document.getElementById("stat-correct").textContent = state.correctCount; const gradeEl = document.getElementById("stat-grade"); if (gradeEl) gradeEl.textContent = grade; document.getElementById("stat-total").textContent = total; const circ = 2 * Math.PI * 60; document.getElementById("score-circle-fill").style.strokeDashoffset = circ - (pct / 100) * circ; document.getElementById("score-circle-text").textContent = pct + "%"; let icon, title, sub; if (pct >= 85) { icon = SVG_ICONS.trophy; title = "Отлично!"; sub = "Превосходный результат!"; } else if (pct >= 70) { icon = SVG_ICONS.award; title = "Хорошо!"; sub = "Достойный результат."; } else if (pct >= 50) { icon = SVG_ICONS.thinking; title = "Неплохо"; sub = "Но есть над чем работать."; } else { icon = SVG_ICONS.rehearsal; title = "Нужно подготовиться"; sub = "Повтори материал и попробуй снова."; } document.getElementById("results-icon").innerHTML = icon; document.getElementById("results-title").textContent = title; document.getElementById("results-subtitle").textContent = sub; saveStats(pct); navigateTo("screen-results"); if (pct >= 70) launchConfetti(); }