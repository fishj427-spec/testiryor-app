let currentWeekOffset = 0;
let weekCalendarSlideClass = "";
function changeWeekOffset(delta) {
    const nextOffset = currentWeekOffset + delta;
    if (nextOffset > 0 || nextOffset < -52) return;
    weekCalendarSlideClass = delta < 0 ? "slide-left" : "slide-right";
    currentWeekOffset = nextOffset;
    vibrate(10);
    renderWeekCalendar();
}
function resetWeekOffset() {
    if (currentWeekOffset === 0) return;
    weekCalendarSlideClass = "slide-right";
    currentWeekOffset = 0;
    vibrate(15);
    renderWeekCalendar();
}
let calTouchStartX = 0;
let calTouchStartY = 0;
let calTouchStartTime = 0;
let calIsSwiping = false;
function initWeekCalendarSwipe() {
    const cal = document.getElementById("week-calendar");
    if (!cal || cal.dataset.swipeInit) return;
    cal.dataset.swipeInit = "true";
    cal.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        calTouchStartX = e.touches[0].clientX;
        calTouchStartY = e.touches[0].clientY;
        calTouchStartTime = Date.now();
        calIsSwiping = false;
    }, { passive: true });
    cal.addEventListener("touchmove", (e) => {
        if (e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - calTouchStartX;
        const dy = e.touches[0].clientY - calTouchStartY;
        if (!calIsSwiping && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
            calIsSwiping = true;
        }
    }, { passive: true });
    cal.addEventListener("touchend", (e) => {
        if (!calIsSwiping) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - calTouchStartX;
        const dy = touch.clientY - calTouchStartY;
        const dt = Date.now() - calTouchStartTime;
        if (Math.abs(dx) >= 32 && Math.abs(dx) > Math.abs(dy) * 1.1 && dt < 600) {
            if (dx > 0) {
                changeWeekOffset(-1);
            } else if (dx < 0 && currentWeekOffset < 0) {
                changeWeekOffset(1);
            }
        }
        calIsSwiping = false;
    }, { passive: true });
    let calMouseDown = false;
    let calMouseStartX = 0;
    cal.addEventListener("mousedown", (e) => {
        if (e.target.closest("button")) return;
        calMouseDown = true;
        calMouseStartX = e.clientX;
    });
    window.addEventListener("mouseup", (e) => {
        if (!calMouseDown) return;
        calMouseDown = false;
        const dx = e.clientX - calMouseStartX;
        if (Math.abs(dx) >= 38) {
            if (dx > 0) changeWeekOffset(-1);
            else if (dx < 0 && currentWeekOffset < 0) changeWeekOffset(1);
        }
    });
    cal.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaX) > 25) {
            e.preventDefault();
            if (e.deltaX > 0 && currentWeekOffset < 0) changeWeekOffset(1);
            else if (e.deltaX < 0) changeWeekOffset(-1);
        }
    }, { passive: false });
}
function renderWeekCalendar() {
    const container = document.getElementById("week-calendar");
    if (!container) return;
    initWeekCalendarSwipe();
    const activity = JSON.parse(localStorage.getItem("quiz_activity") || "{}");
    const today = new Date();
    const dayNames = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
    const ruMonths = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
    const dow = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() + (dow === 0 ? -6 : 1 - dow) + (currentWeekOffset * 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    let rangeText = "";
    if (monday.getMonth() === sunday.getMonth()) {
        rangeText = `${monday.getDate()}–${sunday.getDate()} ${ruMonths[monday.getMonth()]}`;
    } else {
        rangeText = `${monday.getDate()} ${ruMonths[monday.getMonth()]} – ${sunday.getDate()} ${ruMonths[sunday.getMonth()]}`;
    }
    const slideCls = weekCalendarSlideClass;
    weekCalendarSlideClass = "";
    let html = `
        <div class="week-calendar-header">
            <div class="week-calendar-label">
                ${SVG_ICONS.calendar}
                <span class="week-date-range">${rangeText}</span>
            </div>
            <div class="week-calendar-nav">
                ${currentWeekOffset < 0 ? `<button type="button" class="week-today-pill" onclick="resetWeekOffset()" title="Вернуться к этой неделе">Сегодня</button>` : ''}
                <button type="button" class="week-nav-btn" onclick="changeWeekOffset(-1)" title="Предыдущая неделя" aria-label="Предыдущая неделя"${currentWeekOffset <= -52 ? ' disabled' : ''}>
                    ${SVG_ICONS.chevronLeft}
                </button>
                <button type="button" class="week-nav-btn" onclick="changeWeekOffset(1)" title="Следующая неделя" aria-label="Следующая неделя"${currentWeekOffset >= 0 ? ' disabled' : ''}>
                    ${SVG_ICONS.chevronRight}
                </button>
            </div>
        </div>
        <div class="week-row ${slideCls}">`;
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const ds = d.toDateString();
        const isToday = ds === today.toDateString();
        const isActive = !!activity[ds];
        const dayTitle = d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" }) + (isActive ? " (Тест пройден)" : "");
        html += `<div class="day-cell${isToday ? ' today' : ''}${isActive ? ' active' : ''}" title="${dayTitle}"><span class="day-name">${dayNames[i]}</span><span class="day-num">${d.getDate()}</span><span class="day-dot"></span></div>`;
    }
    html += '</div>';
    container.innerHTML = html;
}
function renderMilestone() {
    const streak = parseInt(localStorage.getItem("quiz_streak") || "0");
    const badge = document.getElementById("milestone-badge");
    const daysEl = document.getElementById("milestone-days");
    const labelEl = document.getElementById("milestone-label");
    if (!badge || !daysEl || !labelEl) return;
    if (streak >= 100) {
        badge.className = "milestone-badge visible m100";
        daysEl.innerHTML = `${SVG_ICONS.fire} 100 дней!`;
        labelEl.textContent = "Легендарная серия!";
    } else if (streak >= 50) {
        badge.className = "milestone-badge visible m50";
        daysEl.innerHTML = `${SVG_ICONS.fire} 50 дней!`;
        labelEl.textContent = "Невероятная серия!";
    } else if (streak >= 10) {
        badge.className = "milestone-badge visible m10";
        daysEl.innerHTML = `${SVG_ICONS.fire} ${streak} дней`;
        labelEl.textContent = "Отличная серия!";
    } else {
        badge.className = "milestone-badge";
    }
}

function renderHomeEmptyDisciplines() {
    const list = document.getElementById("home-empty-list");
    if (!list) return;
    const disciplines = Object.values(window.DISCIPLINES_DATA || {});
    let html = "";
    disciplines.forEach(d => {
        const qCount = d.questions ? d.questions.length : 0;
        const tags = (d.tags || []).slice(0, 3).join(" • ");
        html += `
        <div class="home-empty-item" onclick="selectDisciplineAndFeedback('${d.id}')" role="button" tabindex="0">
            <div class="home-empty-item-icon" style="background:${d.gradient};box-shadow:0 6px 16px ${d.accentLight}">
                ${d.iconSvg}
            </div>
            <div class="home-empty-item-body">
                <div class="home-empty-item-header">
                    <h3 class="home-empty-item-title">${d.title}</h3>
                    <span class="home-empty-item-count">${qCount} ${pluralRu(qCount, 'вопрос', 'вопроса', 'вопросов')}</span>
                </div>
                <div class="home-empty-item-desc">${d.fullTitle}</div>
                ${tags ? `<div class="home-empty-item-tags">${tags}</div>` : ''}
            </div>
            <div class="home-empty-item-action">
                <span class="home-empty-item-btn">
                    Выбрать
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
            </div>
        </div>
        `;
    });
    list.innerHTML = html;
}

function renderHome() {
    const hasChosen = (typeof window !== "undefined" && window.location && window.location.search.includes("preview=1")) || localStorage.getItem("quiz_discipline_chosen") === "true";
    const emptyState = document.getElementById("home-empty-state");
    const activeContent = document.getElementById("home-active-content");
    const mainTitle = document.getElementById("home-main-title");
    const mainSubtitle = document.getElementById("home-main-subtitle");

    if (!hasChosen) {
        if (emptyState) {
            emptyState.style.display = "flex";
            renderHomeEmptyDisciplines();
        }
        if (activeContent) activeContent.style.display = "none";
        if (mainTitle) mainTitle.innerHTML = "Тестирование <span>и подготовка</span>";
        if (mainSubtitle) mainSubtitle.textContent = "Пожалуйста, выберите предмет для начала обучения";
        return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (activeContent) activeContent.style.display = "block";
    if (typeof updateAppForActiveDiscipline === "function") updateAppForActiveDiscipline();
    if (mainSubtitle) mainSubtitle.textContent = "Выбери формат тестирования";
    renderWeekCalendar();
    renderMilestone();
    if (typeof updateExamCardSubtitle === "function") updateExamCardSubtitle();
    if (typeof updateRehearsalCardSubtitle === "function") updateRehearsalCardSubtitle();
}

if (typeof window !== "undefined") {
    window.renderHome = renderHome;
    window.renderHomeEmptyDisciplines = renderHomeEmptyDisciplines;
    window.renderWeekCalendar = renderWeekCalendar;
    window.renderMilestone = renderMilestone;
}
