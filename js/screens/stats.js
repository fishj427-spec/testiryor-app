let currentStatsPeriod = "days";
let selectedChartColIndex = -1;
function setStatsPeriod(period, e) {
    if (e) {
        if (typeof e.preventDefault === "function") e.preventDefault();
        if (typeof e.stopPropagation === "function") e.stopPropagation();
    }
    if (currentStatsPeriod === period) return;
    currentStatsPeriod = period;
    selectedChartColIndex = -1;
    vibrate(10);
    updateStatsChart();
}
function selectChartCol(idx) {
    selectedChartColIndex = idx;
    vibrate(8);
    const cols = document.querySelectorAll(".chart-col");
    cols.forEach((col, i) => {
        if (i === idx) col.classList.add("selected");
        else col.classList.remove("selected");
    });
    const col = cols[idx];
    if (col) {
        const title = col.dataset.title || "";
        const desc = col.dataset.desc || "";
        const score = col.dataset.score || "0";
        const hasData = col.dataset.hasData === "true";
        const box = document.getElementById("chart-detail-box");
        if (box) {
            const titleEl = box.querySelector(".chart-detail-title");
            const descEl = box.querySelector(".chart-detail-desc");
            const scoreEl = box.querySelector(".chart-detail-score");
            if (titleEl && descEl && scoreEl) {
                titleEl.textContent = title;
                descEl.textContent = desc;
                scoreEl.textContent = hasData ? `${score}%` : '—';
            } else {
                box.innerHTML = `
                    <div>
                        <div class="chart-detail-title">${title}</div>
                        <div class="chart-detail-desc">${desc}</div>
                    </div>
                    <div class="chart-detail-score">${hasData ? score + '%' : '—'}</div>
                `;
            }
        }
    }
}
function saveStats(pct) {
    const all = JSON.parse(localStorage.getItem("quiz_all_stats") || "{}");
    if (!all._overall) all._overall = { played: 0, correct: 0, total: 0 };
    all._overall.played++;
    all._overall.correct += state.correctCount;
    all._overall.total += state.quizQuestions.length;
    if (!all._history) all._history = [];
    let modeLabel = state.quizMode === "exam" ? "Контрольная" : "Репетиционный";
    if (state.quizMode === "rehearsal" && state.rehearsalTag && state.rehearsalTag !== "all") {
        const discTags = (typeof getActiveTagFilters === "function") ? getActiveTagFilters() : [];
        const found = discTags.find(t => t.id === state.rehearsalTag);
        const tagMap = { question: "Теория", task: "Задачи", formula: "Формулы", var1: "Вариант 1", var2: "Вариант 2" };
        const label = found ? found.label : tagMap[state.rehearsalTag];
        if (label) modeLabel = `Репетиционный (${label})`;
    }
    all._history.unshift({
        category: modeLabel,
        score: pct,
        correct: state.correctCount,
        total: state.quizQuestions.length,
        date: new Date().toLocaleDateString("ru-RU"),
        timestamp: Date.now()
    });
    if (all._history.length > 50) all._history = all._history.slice(0, 50);
    localStorage.setItem("quiz_all_stats", JSON.stringify(all));
    const activity = JSON.parse(localStorage.getItem("quiz_activity") || "{}");
    activity[new Date().toDateString()] = true;
    localStorage.setItem("quiz_activity", JSON.stringify(activity));
    const today = new Date().toDateString();
    const last = localStorage.getItem("quiz_last_play");
    let streak = parseInt(localStorage.getItem("quiz_streak") || "0");
    if (last !== today) {
        const yest = new Date();
        yest.setDate(yest.getDate() - 1);
        streak = last === yest.toDateString() ? streak + 1 : 1;
        localStorage.setItem("quiz_streak", streak.toString());
        localStorage.setItem("quiz_last_play", today);
    }
}
function parseRuDate(str, ts) {
    if (ts && typeof ts === "number") {
        const d = new Date(ts);
        if (!isNaN(d.getTime())) return d;
    }
    if (typeof str === "string") {
        const parts = str.split(".");
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            const d = new Date(year, month, day);
            if (!isNaN(d.getTime())) return d;
        }
    }
    return new Date();
}
function getChartData(history, overallPct) {
    const today = new Date();
    const dow = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() + (dow === 0 ? -6 : 1 - dow));
    monday.setHours(0, 0, 0, 0);
    const ruDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const ruMonths = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    const ruMonthsFull = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const chartPoints = [];
    let periodTitle = "По дням недели";
    function plural(n, one, two, five) {
        n = Math.abs(n) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return five;
        if (n1 > 1 && n1 < 5) return two;
        if (n1 === 1) return one;
        return five;
    }
    if (currentStatsPeriod === "days") {
        periodTitle = "По дням недели";
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const dStr = d.toDateString();
            const isToday = dStr === today.toDateString();
            const matches = history.filter(h => parseRuDate(h.date, h.timestamp).toDateString() === dStr);
            if (matches.length > 0) {
                const avg = Math.round(matches.reduce((s, x) => s + (x.score || 0), 0) / matches.length);
                const c = matches.reduce((s, x) => s + (x.correct || 0), 0);
                const t = matches.reduce((s, x) => s + (x.total || 0), 0);
                chartPoints.push({
                    title: d.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" }),
                    name: ruDays[i],
                    sub: `${d.getDate()}`,
                    score: avg,
                    hasData: true,
                    isCurrent: isToday,
                    desc: `${matches.length} ${plural(matches.length, 'тест', 'теста', 'тестов')} · ${c}/${t} верно (${avg}%)`
                });
            } else {
                chartPoints.push({
                    title: d.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" }),
                    name: ruDays[i],
                    sub: `${d.getDate()}`,
                    score: 0,
                    hasData: false,
                    isCurrent: isToday,
                    desc: isToday ? "Сегодня (нет пройденных тестов)" : "В этот день тесты не проходились"
                });
            }
        }
    } else if (currentStatsPeriod === "weeks") {
        periodTitle = "За последние 5 недель";
        for (let w = 4; w >= 0; w--) {
            const wMon = new Date(monday);
            wMon.setDate(monday.getDate() - w * 7);
            wMon.setHours(0, 0, 0, 0);
            const wSun = new Date(wMon);
            wSun.setDate(wMon.getDate() + 6);
            wSun.setHours(23, 59, 59, 999);
            const matches = history.filter(h => {
                const dt = parseRuDate(h.date, h.timestamp);
                return dt >= wMon && dt <= wSun;
            });
            const name = w === 0 ? "Эта" : w === 1 ? "Пред" : `-${w}н`;
            const rangeStr = `${wMon.getDate()} ${ruMonths[wMon.getMonth()]} – ${wSun.getDate()} ${ruMonths[wSun.getMonth()]}`;
            if (matches.length > 0) {
                const avg = Math.round(matches.reduce((s, x) => s + (x.score || 0), 0) / matches.length);
                const c = matches.reduce((s, x) => s + (x.correct || 0), 0);
                const t = matches.reduce((s, x) => s + (x.total || 0), 0);
                chartPoints.push({
                    title: rangeStr,
                    name: name,
                    sub: `${wMon.getDate()}`,
                    score: avg,
                    hasData: true,
                    isCurrent: w === 0,
                    desc: `${matches.length} ${plural(matches.length, 'тест', 'теста', 'тестов')} · ${c}/${t} верно (${avg}%)`
                });
            } else {
                chartPoints.push({
                    title: rangeStr,
                    name: name,
                    sub: `${wMon.getDate()}`,
                    score: 0,
                    hasData: false,
                    isCurrent: w === 0,
                    desc: "Нет пройденных тестов за неделю"
                });
            }
        }
    } else if (currentStatsPeriod === "months") {
        periodTitle = "За последние 6 месяцев";
        for (let m = 5; m >= 0; m--) {
            const mStart = new Date(today.getFullYear(), today.getMonth() - m, 1, 0, 0, 0);
            const mEnd = new Date(today.getFullYear(), today.getMonth() - m + 1, 0, 23, 59, 59, 999);
            const monthIdx = mStart.getMonth();
            const matches = history.filter(h => {
                const dt = parseRuDate(h.date, h.timestamp);
                return dt >= mStart && dt <= mEnd;
            });
            if (matches.length > 0) {
                const avg = Math.round(matches.reduce((s, x) => s + (x.score || 0), 0) / matches.length);
                const c = matches.reduce((s, x) => s + (x.correct || 0), 0);
                const t = matches.reduce((s, x) => s + (x.total || 0), 0);
                chartPoints.push({
                    title: `${ruMonthsFull[monthIdx]} ${mStart.getFullYear()}`,
                    name: ruMonths[monthIdx],
                    sub: `${matches.length}т`,
                    score: avg,
                    hasData: true,
                    isCurrent: m === 0,
                    desc: `${matches.length} ${plural(matches.length, 'тест', 'теста', 'тестов')} · ${c}/${t} верно (${avg}%)`
                });
            } else {
                chartPoints.push({
                    title: `${ruMonthsFull[monthIdx]} ${mStart.getFullYear()}`,
                    name: ruMonths[monthIdx],
                    sub: "—",
                    score: 0,
                    hasData: false,
                    isCurrent: m === 0,
                    desc: "В этом месяце тестов не было"
                });
            }
        }
    } else if (currentStatsPeriod === "all") {
        periodTitle = "Хронология всех тестов";
        const chronological = [...history].reverse();
        const recentTests = chronological.slice(-7);
        if (recentTests.length === 0) {
            chartPoints.push({
                title: "Все тесты",
                name: "—",
                sub: "—",
                score: 0,
                hasData: false,
                isCurrent: true,
                desc: "Пока нет пройденных тестов"
            });
        } else {
            recentTests.forEach((t, idx) => {
                const testNum = chronological.length > 7 ? (chronological.length - recentTests.length + idx + 1) : (idx + 1);
                chartPoints.push({
                    title: `${t.category || 'Тест'} #${testNum} (${t.date || ''})`,
                    name: `Т${testNum}`,
                    sub: `${t.score}%`,
                    score: t.score || 0,
                    hasData: true,
                    isCurrent: idx === recentTests.length - 1,
                    desc: `${t.category || 'Тест'} · ${t.correct}/${t.total} верно (${t.date || ''})`
                });
            });
        }
    }
    let defaultIndex = chartPoints.findIndex(p => p.isCurrent && p.hasData);
    if (defaultIndex === -1) {
        for (let i = chartPoints.length - 1; i >= 0; i--) {
            if (chartPoints[i].hasData) { defaultIndex = i; break; }
        }
    }
    if (defaultIndex === -1) defaultIndex = chartPoints.findIndex(p => p.isCurrent);
    if (defaultIndex === -1) defaultIndex = chartPoints.length - 1;
    if (selectedChartColIndex < 0 || selectedChartColIndex >= chartPoints.length) {
        selectedChartColIndex = defaultIndex;
    }
    const selectedPoint = chartPoints[selectedChartColIndex] || chartPoints[chartPoints.length - 1];
    const activePoints = chartPoints.filter(p => p.hasData);
    const periodAvg = activePoints.length > 0 ? Math.round(activePoints.reduce((s, p) => s + p.score, 0) / activePoints.length) : overallPct;
    return { periodTitle, chartPoints, selectedPoint, periodAvg };
}
function buildChartLineHtml(chartPoints, selectedIndex) {
    const n = chartPoints.length;
    if (n === 0) return '';

    const W = 700;
    const H = 88;
    const padTop = 10;
    const baselineY = 74;
    const drawH = baselineY - padTop; // 64

    const pts = chartPoints.map((p, idx) => {
        const x = ((idx + 0.5) / n) * W;
        const score = p.hasData ? Math.max(0, Math.min(100, p.score)) : 0;
        const y = p.hasData ? (baselineY - (score / 100) * drawH) : baselineY;
        return { x, y, score, hasData: p.hasData, isSelected: idx === selectedIndex, isCurrent: p.isCurrent };
    });

    const hasAnyData = chartPoints.some(p => p.hasData);

    // Monotone cubic spline interpolation
    let linePath = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    if (n > 1) {
        const deltas = [];
        for (let i = 0; i < n - 1; i++) {
            const dx = pts[i + 1].x - pts[i].x;
            deltas.push(dx === 0 ? 0 : (pts[i + 1].y - pts[i].y) / dx);
        }
        const m = new Array(n);
        m[0] = deltas[0];
        m[n - 1] = deltas[n - 2];
        for (let i = 1; i < n - 1; i++) {
            if (deltas[i - 1] * deltas[i] <= 0) {
                m[i] = 0;
            } else {
                m[i] = 2 / (1 / deltas[i - 1] + 1 / deltas[i]);
            }
        }
        for (let i = 0; i < n - 1; i++) {
            const dx = pts[i + 1].x - pts[i].x;
            const cp1x = pts[i].x + dx / 3;
            const cp1y = Math.max(padTop - 2, Math.min(baselineY + 2, pts[i].y + m[i] * dx / 3));
            const cp2x = pts[i + 1].x - dx / 3;
            const cp2y = Math.max(padTop - 2, Math.min(baselineY + 2, pts[i + 1].y - m[i + 1] * dx / 3));
            linePath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${pts[i + 1].x.toFixed(1)} ${pts[i + 1].y.toFixed(1)}`;
        }
    }
    const areaPath = `${linePath} L ${pts[n - 1].x.toFixed(1)} ${baselineY} L ${pts[0].x.toFixed(1)} ${baselineY} Z`;

    // SVG Layer HTML (clean, no deformed SVG circles or pulsating halos)
    const svgHtml = `
        <svg class="chart-svg-layer" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#6366F1" stop-opacity="0.28"/>
                    <stop offset="85%" stop-color="#6366F1" stop-opacity="0.03"/>
                    <stop offset="100%" stop-color="#6366F1" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="chartGradLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#6366F1"/>
                    <stop offset="50%" stop-color="#818CF8"/>
                    <stop offset="100%" stop-color="#06B6D4"/>
                </linearGradient>
            </defs>

            <!-- Grid Guidelines with non-scaling-stroke -->
            <line class="chart-grid-line" x1="0" y1="${padTop}" x2="${W}" y2="${padTop}" vector-effect="non-scaling-stroke" />
            <text class="chart-grid-tag" x="${W - 4}" y="${padTop + 1}" text-anchor="end">100%</text>

            <line class="chart-grid-line is-mid" x1="0" y1="${padTop + drawH / 2}" x2="${W}" y2="${padTop + drawH / 2}" stroke-dasharray="4 4" vector-effect="non-scaling-stroke" />
            <text class="chart-grid-tag" x="${W - 4}" y="${padTop + drawH / 2 + 1}" text-anchor="end">50%</text>

            <line class="chart-grid-line is-base" x1="0" y1="${baselineY}" x2="${W}" y2="${baselineY}" vector-effect="non-scaling-stroke" />
            <text class="chart-grid-tag" x="${W - 4}" y="${baselineY + 1}" text-anchor="end">0%</text>

            <!-- Gradient Area Fill -->
            ${hasAnyData ? `<path class="chart-area-path" d="${areaPath}" fill="url(#chartGradArea)" />` : ''}

            <!-- Main Line -->
            <path class="chart-line-path" d="${linePath}" fill="none" stroke="${hasAnyData ? 'url(#chartGradLine)' : 'var(--card-border)'}" stroke-width="${hasAnyData ? '2.5' : '1.5'}" ${!hasAnyData ? 'stroke-dasharray="4 4" opacity="0.5"' : ''} vector-effect="non-scaling-stroke" />
        </svg>
    `;

    // Columns Overlay HTML with perfectly round 1:1 CSS dots (immune to aspect ratio distortion)
    let colsHtml = '';
    chartPoints.forEach((p, idx) => {
        const isSelected = idx === selectedIndex;
        const valText = p.hasData ? `${p.score}%` : "—";
        const score = p.hasData ? Math.max(0, Math.min(100, p.score)) : 0;
        const yBottom = p.hasData ? (14 + (score / 100) * 64) : 14;
        const bottomPct = (yBottom / 88 * 100).toFixed(2);
        let dotColor = "var(--text-muted)";
        if (p.hasData) {
            dotColor = p.score >= 70 ? "#10B981" : p.score >= 40 ? "#6366F1" : "#F59E0B";
        }

        colsHtml += `
            <div class="chart-col${p.hasData ? ' has-data' : ''}${isSelected ? ' selected' : ''}${p.isCurrent ? ' is-today' : ''}" 
                 onclick="selectChartCol(${idx})" 
                 data-title="${p.title}" 
                 data-desc="${p.desc}" 
                 data-score="${p.score}" 
                 data-has-data="${p.hasData}">
                <span class="chart-val-label">${valText}</span>
                <div class="chart-line-slot">
                    <div class="chart-col-beam"></div>
                    <div class="chart-dot ${p.hasData ? 'has-data' : 'empty'}" style="bottom:${bottomPct}%;background:${dotColor};"></div>
                </div>
                <div class="chart-col-footer">
                    <span class="chart-col-name">${p.name}</span>
                    <span class="chart-col-sub">${p.sub}</span>
                </div>
            </div>`;
    });

    return `
        ${svgHtml}
        <div class="chart-cols-row">
            ${colsHtml}
        </div>
    `;
}
function buildChartBarsHtml(chartPoints, selectedIndex) {
    return buildChartLineHtml(chartPoints, selectedIndex);
}
function updateStatsChart() {
    const card = document.getElementById("stats-chart-card");
    if (!card) {
        renderStats();
        return;
    }
    const screenStats = document.getElementById("screen-stats");
    const prevScroll = screenStats ? screenStats.scrollTop : 0;
    const all = JSON.parse(localStorage.getItem("quiz_all_stats") || "{}");
    const o = all._overall || { correct: 0, total: 0 };
    const pct = o.total > 0 ? Math.round(o.correct / o.total * 100) : 0;
    const history = all._history || [];
    const data = getChartData(history, pct);
    const subEl = document.getElementById("stats-chart-subtitle");
    if (subEl) subEl.textContent = data.periodTitle;
    const badgeEl = document.getElementById("stats-chart-badge");
    if (badgeEl) badgeEl.textContent = `${data.periodAvg}% ср.`;
    document.querySelectorAll("#stats-period-tabs .chart-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.period === currentStatsPeriod);
    });
    const barsWrap = document.getElementById("chart-bars-wrap");
    if (barsWrap) {
        barsWrap.innerHTML = buildChartLineHtml(data.chartPoints, selectedChartColIndex);
    }
    const box = document.getElementById("chart-detail-box");
    if (box) {
        const titleEl = box.querySelector(".chart-detail-title");
        const descEl = box.querySelector(".chart-detail-desc");
        const scoreEl = box.querySelector(".chart-detail-score");
        if (titleEl && descEl && scoreEl) {
            titleEl.textContent = data.selectedPoint ? data.selectedPoint.title : '';
            descEl.textContent = data.selectedPoint ? data.selectedPoint.desc : '';
            scoreEl.textContent = data.selectedPoint && data.selectedPoint.hasData ? data.selectedPoint.score + '%' : '—';
        } else {
            box.innerHTML = `
                <div>
                    <div class="chart-detail-title">${data.selectedPoint ? data.selectedPoint.title : ''}</div>
                    <div class="chart-detail-desc">${data.selectedPoint ? data.selectedPoint.desc : ''}</div>
                </div>
                <div class="chart-detail-score">${data.selectedPoint && data.selectedPoint.hasData ? data.selectedPoint.score + '%' : '—'}</div>
            `;
        }
    }
    if (screenStats && screenStats.scrollTop !== prevScroll) {
        screenStats.scrollTop = prevScroll;
    }
}
function renderStats() {
    const el = document.getElementById("stats-content");
    const all = JSON.parse(localStorage.getItem("quiz_all_stats") || "{}");
    if (!all._overall || all._overall.played === 0) {
        el.innerHTML = `<div class="no-data"><div class="no-data-icon">${SVG_ICONS.chart}</div><h3>Пока нет данных</h3><p>Пройди хотя бы один тест</p></div>`;
        return;
    }
    const o = all._overall;
    const pct = Math.round(o.correct / o.total * 100);
    const history = all._history || [];
    let motivationIcon = SVG_ICONS.rocket;
    let motivationText = "Всё впереди! Знания приходят с опытом. Начни с репетиционного режима и постепенно улучшай результат.";
    let iconBg = "rgba(239,68,68,0.14)";
    let iconBorder = "rgba(239,68,68,0.3)";
    if (pct >= 80) {
        motivationIcon = SVG_ICONS.star;
        motivationText = "Великолепно! Ты на верном пути к мастерству. Продолжай в том же духе!";
        iconBg = "rgba(245,158,11,0.14)";
        iconBorder = "rgba(245,158,11,0.3)";
    } else if (pct >= 60) {
        motivationIcon = SVG_ICONS.strength;
        motivationText = "Хороший результат! Ещё немного практики — и ты достигнешь вершин.";
        iconBg = "rgba(6,182,212,0.14)";
        iconBorder = "rgba(6,182,212,0.3)";
    } else if (pct >= 40) {
        motivationIcon = SVG_ICONS.rehearsal;
        motivationText = "Не сдавайся! Каждая ошибка — это шаг к пониманию. Повтори материал и попробуй снова.";
        iconBg = "rgba(99,102,241,0.14)";
        iconBorder = "rgba(99,102,241,0.3)";
    }
    const data = getChartData(history, pct);
    let html = `
    <div class="stats-overview">
        <div class="overview-card"><div class="stat-value">${o.played}</div><div class="stat-label">Тестов</div></div>
        <div class="overview-card"><div class="stat-value">${pct}%</div><div class="stat-label">Точность</div></div>
        <div class="overview-card"><div class="stat-value">${o.correct}</div><div class="stat-label">Верных</div></div>
        <div class="overview-card"><div class="stat-value">${o.total}</div><div class="stat-label">Вопросов</div></div>
    </div>
    <div class="stats-chart-card" id="stats-chart-card">
        <div class="stats-chart-header">
            <div class="stats-chart-title-box">
                <div class="stats-chart-icon">${SVG_ICONS.trendingUp}</div>
                <div>
                    <h3 class="stats-chart-title">График выполнения</h3>
                    <p class="stats-chart-subtitle" id="stats-chart-subtitle">${data.periodTitle}</p>
                </div>
            </div>
            <div class="stats-chart-badge" id="stats-chart-badge">${data.periodAvg}% ср.</div>
        </div>
        <div class="chart-period-tabs" id="stats-period-tabs">
            <button type="button" class="chart-tab${currentStatsPeriod==='days'?' active':''}" data-period="days" onclick="setStatsPeriod('days', event)">По дням</button>
            <button type="button" class="chart-tab${currentStatsPeriod==='weeks'?' active':''}" data-period="weeks" onclick="setStatsPeriod('weeks', event)">По неделям</button>
            <button type="button" class="chart-tab${currentStatsPeriod==='months'?' active':''}" data-period="months" onclick="setStatsPeriod('months', event)">По месяцам</button>
            <button type="button" class="chart-tab${currentStatsPeriod==='all'?' active':''}" data-period="all" onclick="setStatsPeriod('all', event)">За всё время</button>
        </div>
        <div class="chart-bars-wrap" id="chart-bars-wrap">
            ${buildChartLineHtml(data.chartPoints, selectedChartColIndex)}
        </div>
        <div class="chart-detail-box" id="chart-detail-box">
            <div>
                <div class="chart-detail-title">${data.selectedPoint ? data.selectedPoint.title : ''}</div>
                <div class="chart-detail-desc">${data.selectedPoint ? data.selectedPoint.desc : ''}</div>
            </div>
            <div class="chart-detail-score">${data.selectedPoint && data.selectedPoint.hasData ? data.selectedPoint.score + '%' : '—'}</div>
        </div>
    </div>
    <div class="motivation-card">
        <div class="motivation-icon" style="background:${iconBg};border:1px solid ${iconBorder};">${motivationIcon}</div>
        <div class="motivation-text">${motivationText}</div>
    </div>
    <div class="stats-section-title" style="display:flex;align-items:center;gap:8px;">${SVG_ICONS.trendingUp} Прогресс</div>
    <div class="stats-bar-list">
        <div class="stats-bar-item">
            <div class="stats-bar-header">
                <span class="stats-bar-name" style="display:flex;align-items:center;gap:6px;">${SVG_ICONS.money} Экономика</span>
                <span class="stats-bar-value">${pct}%</span>
            </div>
            <div class="stats-bar-track">
                <div class="stats-bar-fill fill-tech" style="width:${pct}%"></div>
            </div>
        </div>
    </div>`;
    if (history.length) {
        html += `<div class="stats-section-title" style="display:flex;align-items:center;gap:8px;">${SVG_ICONS.clock} Последние результаты</div>`;
        history.slice(0, 5).forEach(h => {
            const cls = h.score >= 70 ? "good" : h.score >= 40 ? "mid" : "bad";
            const ico = h.score >= 70 ? SVG_ICONS.checkCircle : h.score >= 40 ? SVG_ICONS.alertTriangle : SVG_ICONS.xCircle;
            const cleanCat = (h.category || '').replace(/[^\wа-яА-ЯёЁ\s]/ug, '').trim() || 'Тест';
            const catIco = cleanCat.toLowerCase().includes('контр') ? SVG_ICONS.exam : SVG_ICONS.rehearsal;
            html += `<div class="history-item"><div class="history-icon ${cls}">${ico}</div><div class="history-info"><h4 style="display:flex;align-items:center;gap:6px;">${catIco} ${cleanCat}</h4><p>${h.date} · ${h.correct}/${h.total}</p></div><div class="history-score">${h.score}%</div></div>`;
        });
    }
    el.innerHTML = html;
}
// [О ПРОЕКТЕ] Модалка подробностей