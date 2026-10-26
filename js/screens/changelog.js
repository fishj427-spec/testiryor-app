let changelogExpandedState = { "3.0.0": true };

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
            version: "3.0.0",
            date: "26 октября 2026",
            badge: "major",
            badgeText: "Крупное обновление",
            groups: [
                {
                    type: "new",
                    label: "Нововведения",
                    items: [
                        "Закрытие смахиванием вниз: открытые шторки и окна («О проекте», «Контрольная», «Репетиционный») теперь можно закрывать движением пальца или мыши вниз (Drag-to-dismiss) либо нажатием на индикаторную плашку",
                        "Новая навигация: вкладка «Тест» (режимы тестирования) вынесена на 1-е место, а «Предмет» (выбор дисциплин) расположен ровно по центру панели",
                        "Специализированные иконки предметов: классическое Казначейство/Банк для «Экономики» и официальный Знак радиационной опасности ☢️ для «Санитарии и гигиены труда»"
                    ]
                },
                {
                    type: "change",
                    label: "Изменения",
                    items: [
                        "Экран предметов: главный заголовок переименован в «Выбор предмета» для гармоничности с нижней навигацией",
                        "Тематические фильтры: теги вопросов распределены по темам билетов («Дозиметрия», «Виды излучений», «Источники излучения», «Лазерная безопасность»)",
                        "Компактный переключатель темы: кнопки «Тёмная» и «Светлая» объединены в одну удобную строку без лишних подпанелей",
                        "Фирменный дизайн модалок: карточка «О проекте» обновлена с акцентной подсветкой и чистой таблицей критериев оценок"
                    ]
                },
                {
                    type: "fix",
                    label: "Исправления",
                    items: [
                        "Стандартизация скруглений: все закругления интерфейса, кнопок и шторок приведены к единому стандарту 5–10 px",
                        "Очистка интерфейса: убран счётчик количества изменений, удалены лишние кнопки «Назад» в заголовках основных экранов"
                    ]
                }
            ]
        },
        {
            version: "2.9.0",
            date: "24 октября 2026",
            badge: "update",
            badgeText: "Обновление",
            groups: [
                {
                    type: "new",
                    label: "Нововведения",
                    items: [
                        "Санитария и гигиена труда: синхронизация базы с официальными билетами (26 заданий, Варианты 1 и 2)",
                        "Множественный выбор: поддержка вопросов с несколькими правильными ответами и честным подсчётом баллов"
                    ]
                },
                {
                    type: "change",
                    label: "Изменения",
                    items: [
                        "Формулы и степени: корректное отображение научных величин и физических констант (10⁻¹⁰ м, 10⁻¹²...10⁻¹⁵ см)",
                        "Умные бейджи билетов: компактное отображение варианта и номера вопроса с фильтрацией",
                        "Линейный график статистики: минималистичный векторный график динамики",
                        "Предупреждение к тестированию: информационная подсказка на главном экране Санитарии"
                    ]
                }
            ]
        },
        {
            version: "2.8.0",
            date: "22 октября 2026",
            badge: "update",
            badgeText: "Обновление",
            groups: [
                {
                    type: "new",
                    label: "Нововведения",
                    items: [
                        "Экран статистики: интерактивный график выполнения и ключевые показатели",
                        "Список вопросов: быстрые фильтры по темам и режим показа только верных ответов",
                        "Календарь активности: просмотр истории прошлых недель стрелками и свайпами"
                    ]
                },
                {
                    type: "change",
                    label: "Изменения",
                    items: [
                        "Результаты и разбор: расчет итоговой оценки по 5-балльной шкале",
                        "Навигация: возврат назад свайпом от левого края экрана на смартфонах"
                    ]
                },
                {
                    type: "fix",
                    label: "Исправления",
                    items: [
                        "Интерфейс: чистый полноэкранный вид без лишних рамок и комфортная тёплая светлая тема"
                    ]
                }
            ]
        },
        {
            version: "2.7.0",
            date: "10 мая 2026",
            badge: "update",
            badgeText: "Обновление",
            groups: [
                {
                    type: "change",
                    label: "Изменения",
                    items: [
                        "Разделены экраны: «Список вопросов» и «Разбор теста»",
                        "В списке: все вопросы и показ только верных ответов",
                        "В разборе: только вопросы теста, выбор пользователя и правильный ответ"
                    ]
                },
                {
                    type: "fix",
                    label: "Исправления",
                    items: [
                        "Возможность посмотреть и разобрать вопросы по только что пройденному тесту"
                    ]
                }
            ]
        },
        {
            version: "2.6.0",
            date: "11 мая 2026",
            badge: "update",
            badgeText: "Обновление",
            groups: [
                {
                    type: "change",
                    label: "Изменения",
                    items: [
                        "Скролл для длинных формулировок и текстов вопросов",
                        "Косметическое улучшение экрана списков вопросов"
                    ]
                },
                {
                    type: "fix",
                    label: "Исправления",
                    items: [
                        "Навигация: кнопка «Домой» работает корректно",
                        "Ответы на вопросы исправлены на верифицированные правильные"
                    ]
                }
            ]
        },
        {
            version: "2.0.0",
            date: "10 марта 2026",
            badge: "new",
            badgeText: "Новое",
            groups: [
                {
                    type: "new",
                    label: "Нововведения",
                    items: [
                        "Полный редизайн приложения для подготовки к тестированию",
                        "Нижняя панель навигации (Bottom tab bar)",
                        "Экран настроек и список изменений",
                        "Режимы тестирования: Контрольная и Репетиционный"
                    ]
                }
            ]
        }
    ];

    let totalChanges = 0;
    CHANGELOG.forEach(e => {
        if (e.groups) {
            e.groups.forEach(g => totalChanges += g.items.length);
        } else if (e.changes) {
            totalChanges += e.changes.length;
        }
    });

    const totalVersions = CHANGELOG.length;
    const anyExpanded = CHANGELOG.some((e, idx) => changelogExpandedState[e.version] !== false && (changelogExpandedState[e.version] === true || idx === 0));

    let html = `
    <div class="changelog-toolbar">
        <div class="changelog-toolbar-info">
            <span class="changelog-toolbar-badge">${totalVersions} ${pluralRu(totalVersions, "версия", "версии", "версий")}</span>
            <span class="changelog-toolbar-dot">·</span>
            
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

        html += `
        <div class="changelog-entry ${isExp ? 'expanded' : ''}" id="${entryId}" data-version="${entry.version}">
            <div class="changelog-dot"></div>
            <div class="changelog-header-card" onclick="toggleChangelogEntry('${entry.version}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleChangelogEntry('${entry.version}');}" role="button" tabindex="0" aria-expanded="${isExp}" title="Нажмите, чтобы скрыть или показать список изменений">
                <div class="changelog-header-main">
                    <div class="changelog-version-row">
                        <h3 class="changelog-version-title">v${entry.version}</h3>
                        <span class="version-badge ${bc}">${entry.badgeText}</span>
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

        if (entry.groups) {
            entry.groups.forEach(group => {
                const typeClass = group.type === "new" ? "tag-new" : group.type === "fix" ? "tag-fix" : "tag-change";
                const dotClass = group.type === "new" ? "dot-new" : group.type === "fix" ? "dot-fix" : "dot-change";
                const tagLabel = group.type === "new" ? "Новое" : group.type === "fix" ? "Исправлено" : "Изменение";

                html += `
                        <div class="change-group">
                            <div class="change-group-title">
                                <span class="change-group-dot ${dotClass}"></span>
                                <span>${group.label}</span>
                            </div>`;
                group.items.forEach(item => {
                    html += `
                            <div class="change-item">
                                <span class="change-tag ${typeClass}">${tagLabel}</span>
                                <span class="change-item-text">${item}</span>
                            </div>`;
                });
                html += `       </div>`;
            });
        } else if (entry.changes) {
            entry.changes.forEach(c => {
                html += `<div class="change-item"><span class="change-item-text">${c}</span></div>`;
            });
        }

        html += `   </div>
                </div>
            </div>
        </div>`;
    });

    html += `</div>`;
    el.innerHTML = html;
}
