function renderSettings() {
    const el = document.getElementById("settings-content");
    const theme = getSavedTheme();
    const disc = typeof getActiveDiscipline === "function" ? getActiveDiscipline() : { title: "Экономика", questions: [] };
    const qCount = disc.questions ? disc.questions.length : 255;
    el.innerHTML = `
    <div class="settings-group">
        <div class="settings-group-title">Оформление</div>
        <div class="settings-card">
            <div class="theme-toggle-container">
                <div class="settings-item-left">
                    <div class="settings-item-icon si-purple">${SVG_ICONS.palette}</div>
                    <div class="settings-item-text">
                        <h4>Тема</h4>
                        <p>${theme==='dark'?'Тёмная':'Светлая'}</p>
                    </div>
                </div>
                <div class="theme-selector">
                    <div class="theme-option theme-dark-opt ${theme==='dark'?'selected':''}" onclick="applyTheme('dark');renderSettings();">${SVG_ICONS.moon}</div>
                    <div class="theme-option theme-light-opt ${theme==='light'?'selected':''}" onclick="applyTheme('light');renderSettings();">${SVG_ICONS.sun}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="settings-group">
        <div class="settings-group-title">О проекте</div>
        <div class="settings-card about-project-card">
            <div class="about-hero">
                <div class="about-app-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                </div>
                <div class="about-hero-text">
                    <div class="about-hero-title-row">
                        <h4>QuizApp: ${disc.title}</h4>
                        <span class="about-badge">v2.9.0</span>
                    </div>
                    <p class="about-hero-sub">Интерактивный учебный тренажёр</p>
                </div>
            </div>
            <div class="about-description">
                Современная платформа для подготовки к тестированию, зачётам и экзаменам по дисциплине «${disc.title}». Включает полный банк вопросов, детальную аналитику успеваемости и гибкие режимы тренировки.
            </div>
            <div class="about-features-grid">
                <div class="about-feature-item">
                    <span class="about-feature-num">${qCount}</span>
                    <span class="about-feature-lbl">${pluralRu(qCount, 'вопрос и задача', 'вопроса и задачи', 'вопросов и задач')}</span>
                </div>
                <div class="about-feature-item">
                    <span class="about-feature-num">3</span>
                    <span class="about-feature-lbl">Режима тестов</span>
                </div>
                <div class="about-feature-item">
                    <span class="about-feature-num">100%</span>
                    <span class="about-feature-lbl">Офлайн работа</span>
                </div>
            </div>
            <div class="about-links">
                <div class="settings-item" onclick="navigateTo('screen-disciplines')">
                    <div class="settings-item-left">
                        <div class="settings-item-icon si-purple">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                        </div>
                        <div class="settings-item-text">
                            <h4>Выбор дисциплины</h4>
                            <p>Текущий предмет: «${disc.title}»</p>
                        </div>
                    </div>
                    <div class="settings-item-right" style="display:flex;align-items:center;color:var(--text-muted)">
                        ${SVG_ICONS.chevronRight}
                    </div>
                </div>
                <div class="settings-item" onclick="openAboutModal()">
                    <div class="settings-item-left">
                        <div class="settings-item-icon si-cyan">${SVG_ICONS.info}</div>
                        <div class="settings-item-text">
                            <h4>Справка и критерии оценок</h4>
                            <p>Темы курса, шкала баллов и советы</p>
                        </div>
                    </div>
                    <div class="settings-item-right" style="display:flex;align-items:center;color:var(--text-muted)">
                        ${SVG_ICONS.chevronRight}
                    </div>
                </div>
                <div class="settings-item" onclick="navigateTo('screen-changelog')">
                    <div class="settings-item-left">
                        <div class="settings-item-icon si-purple">${SVG_ICONS.exam}</div>
                        <div class="settings-item-text">
                            <h4>Список изменений</h4>
                            <p>Журнал обновлений и нововведений</p>
                        </div>
                    </div>
                    <div class="settings-item-right" style="display:flex;align-items:center;color:var(--text-muted)">
                        ${SVG_ICONS.chevronRight}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="settings-group">
        <div class="settings-group-title">Данные</div>
        <div class="settings-card">
            <div class="settings-item" onclick="resetStats()">
                <div class="settings-item-left">
                    <div class="settings-item-icon si-red">${SVG_ICONS.trash}</div>
                    <div class="settings-item-text">
                        <h4>Сбросить статистику</h4>
                        <p>Удалить всю историю и серии</p>
                    </div>
                </div>
            </div>
            <div class="settings-item" onclick="resetOnboarding()">
                <div class="settings-item-left">
                    <div class="settings-item-icon si-green">${SVG_ICONS.refresh}</div>
                    <div class="settings-item-text">
                        <h4>Показать приветствие</h4>
                        <p>Повторить вступительный экран</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="settings-footer">
        <div class="app-version">QuizApp · ${disc.title} v2.9.0 · 2026</div>
    </div>`;
}
function resetStats() { if (confirm("Удалить всю статистику?")) { localStorage.removeItem("quiz_all_stats"); localStorage.removeItem("quiz_streak"); localStorage.removeItem("quiz_last_play"); localStorage.removeItem("quiz_activity"); navigateTo("screen-stats"); } }
function resetOnboarding() { localStorage.removeItem("visited"); screenHistory = ["screen-home"]; navigateTo("screen-home"); document.getElementById("tab-bar").style.display="none"; document.getElementById("screen-onboard-1").classList.add("active"); }