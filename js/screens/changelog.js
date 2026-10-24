let changelogExpandedState = { "2.9.0": true };

function toggleChangelogEntry(version) {
    vibrate(8);
    const entryId = "changelog-entry-" + version.replace(/\./g, "-");
    const entry = document.getElementById(entryId);
    if (!entry) return;
    const isNowExpanded = entry.classList.toggle("expanded");
    changelogExpandedState[version] = isNowExpanded;

    const header = entry.querySelector(".changelog-header-card");
    if (header) {
        header.setAttribute("aria-expanded", isNowExpanded ? "true" : "false");
    }
    const hint = entry.querySelector(".changelog-status-hint");
    if (hint) {
        hint.textContent = isNowExpanded ? "· Нажмите, чтобы скрыть" : "· Нажмите, чтобы развернуть";
    }
    updateChangelogToggleAllBtn();
}

function updateChangelogToggleAllBtn() {
    const entries = document.querySelectorAll(".changelog-entry");
    const expandedEntries = document.querySelectorAll(".changelog-entry.expanded");
    const btn = document.getElementById("changelog-toggle-all-btn");
    const text = document.getElementById("changelog-toggle-all-text");
    if (!btn || !text || entries.length === 0) return;

    if (expandedEntries.length > 0) {
        btn.classList.remove("all-collapsed");
        text.textContent = "Свернуть всё";
    } else {
        btn.classList.add("all-collapsed");
        text.textContent = "Развернуть всё";
    }
}

function toggleAllChangelog() {
    vibrate(10);
    const entries = document.querySelectorAll(".changelog-entry");
    const expandedEntries = document.querySelectorAll(".changelog-entry.expanded");
    const shouldExpand = expandedEntries.length === 0;

    entries.forEach(entry => {
        const v = entry.getAttribute("data-version");
        if (shouldExpand) {
            entry.classList.add("expanded");
            if (v) changelogExpandedState[v] = true;
        } else {
            entry.classList.remove("expanded");
            if (v) changelogExpandedState[v] = false;
        }
        const header = entry.querySelector(".changelog-header-card");
        if (header) {
            header.setAttribute("aria-expanded", shouldExpand ? "true" : "false");
        }
        const hint = entry.querySelector(".changelog-status-hint");
        if (hint) {
            hint.textContent = shouldExpand ? "· Нажмите, чтобы скрыть" : "· Нажмите, чтобы развернуть";
        }
    });
    updateChangelogToggleAllBtn();
}

function renderChangelog() {
    const el = document.getElementById("changelog-content");
    const CHANGELOG = [
        {
            version: "2.9.0",
            date: "24 октября 2026",
            badge: "update",
            badgeText: "Обновление",
            changes: [
                "Санитария и гигиена труда: полная синхронизация базы с официальными билетами (26 заданий, Вариант 1 и 2)",
                "Множественный выбор: поддержка вопросов с несколькими правильными ответами и честным подсчётом баллов",
                "Формулы и степени: корректное отображение научных величин и физических констант (10⁻¹⁰ м, 10⁻¹²...10⁻¹⁵ см)",
                "Умные бейджи билетов: компактное отображение варианта и номера вопроса без дублирования с быстрой фильтрацией",
                "Линейный график статистики: минималистичный векторный график динамики без лишней анимации точек",
                "Предупреждение к зачёту: информационная подсказка на главном экране Санитарии для комплексной подготовки"
            ]
        },
        {
            version: "2.8.0",
            date: "22 октября 2026",
            badge: "major",
            badgeText: "Крупное обновление",
            changes: [
                "Экран статистики: интерактивный линейный график выполнения и компактный ряд ключевых показателей",
                "Список вопросов: быстрые фильтры по темам (Теория, Задачи, Формулы) и режим показа только верных ответов",
                "Календарь активности: просмотр истории прошлых недель стрелками и свайпами с кнопкой возврата к сегодняшнему дню",
                "Результаты и разбор: расчет итоговой оценки по 5-балльной шкале и лаконичный разбор теста",
                "Навигация и жесты: возврат назад свайпом от левого края экрана на смартфонах и обновлённые векторные кнопки",
                "Интерфейс: чистый полноэкранный вид без лишних рамок и комфортная светлая тема в тёплых тонах"
            ]
        },
        {
            version: "2.7.0",
            date: "10 мая 2026",
            badge: "update",
            badgeText: "Обновление",
            changes: [
                "Исправлено: возможность посмотреть вопросы по пройденому тесту",
                "Разделены экраны: Список вопросов и Разбор теста",
                "В списке: все вопросы, только верные ответы",
                "В разборе: только вопросы теста, выбор пользователя и правильный"
            ]
        },
        {
            version: "2.6.0",
            date: "11 мая 2026",
            badge: "update",
            badgeText: "Обновление",
            changes: [
                "Исправлена навигация: кнопка «Домой» работает корректно",
                "Скролл для длинных текстов вопросов",
                "Ответы на вопросы исправлены на корректные ответы",
                "Косметическое изменение экрана списков вопросов"
            ]
        },
        {
            version: "2.0.0",
            date: "10 марта 2026",
            badge: "new",
            badgeText: "Новое",
            changes: [
                "Полный редизайн приложения для тестирования",
                "Bottom tab bar",
                "Настройки и changelog",
                "Изменены режимы тестирования"
            ]
        }
    ];

    const totalChanges = CHANGELOG.reduce((acc, cur) => acc + cur.changes.length, 0);
    const totalVersions = CHANGELOG.length;
    const anyExpanded = CHANGELOG.some((e, idx) => changelogExpandedState[e.version] !== false && (changelogExpandedState[e.version] === true || idx === 0));

    let html = `
    <div class="changelog-toolbar">
        <div class="changelog-toolbar-info">
            <span class="changelog-toolbar-badge">${totalVersions} ${pluralRu(totalVersions, "версия", "версии", "версий")}</span>
            <span class="changelog-toolbar-dot">·</span>
            <span class="changelog-toolbar-count">${totalChanges} ${pluralRu(totalChanges, "изменение", "изменения", "изменений")}</span>
        </div>
        <button class="changelog-toggle-all-btn ${anyExpanded ? '' : 'all-collapsed'}" id="changelog-toggle-all-btn" onclick="toggleAllChangelog()" aria-label="Свернуть или развернуть все версии">
            <span id="changelog-toggle-all-text">${anyExpanded ? "Свернуть всё" : "Развернуть всё"}</span>
            <svg class="changelog-toggle-all-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
        </button>
    </div>
    <div class="changelog-timeline">`;

    CHANGELOG.forEach((entry, idx) => {
        const bc = entry.badge === "major" ? "badge-major" : entry.badge === "new" ? "badge-new" : "badge-update";
        const isExp = changelogExpandedState[entry.version] !== undefined ? changelogExpandedState[entry.version] : (idx === 0);
        changelogExpandedState[entry.version] = isExp;
        const entryId = "changelog-entry-" + entry.version.replace(/\./g, "-");
        const countText = `${entry.changes.length} ${pluralRu(entry.changes.length, "изменение", "изменения", "изменений")}`;

        html += `
        <div class="changelog-entry ${isExp ? 'expanded' : ''}" id="${entryId}" data-version="${entry.version}">
            <div class="changelog-dot"></div>
            <div class="changelog-header-card" onclick="toggleChangelogEntry('${entry.version}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleChangelogEntry('${entry.version}');}" role="button" tabindex="0" aria-expanded="${isExp}" title="Нажмите, чтобы скрыть или показать список изменений">
                <div class="changelog-header-main">
                    <div class="changelog-version-row">
                        <h3 class="changelog-version-title">v${entry.version}</h3>
                        <span class="version-badge ${bc}">${entry.badgeText}</span>
                        <span class="changelog-count-pill">${countText}</span>
                    </div>
                    <div class="changelog-date">
                        <span>${entry.date}</span>
                        <span class="changelog-status-hint">· ${isExp ? "Нажмите, чтобы скрыть" : "Нажмите, чтобы развернуть"}</span>
                    </div>
                </div>
                <div class="changelog-chevron-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
            </div>
            <div class="changelog-body">
                <div class="changelog-body-inner">
                    <div class="changelog-changes">`;
        entry.changes.forEach(c => {
            html += `<div class="change-item">${c}</div>`;
        });
        html += `   </div>
                </div>
            </div>
        </div>`;
    });

    html += `</div>`;
    el.innerHTML = html;
}