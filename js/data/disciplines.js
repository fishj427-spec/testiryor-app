// [ДИСЦИПЛИНЫ] Каталог учебных предметов и банки вопросов
const PSIGT_QUESTIONS = [
    {
        id: 1,
        text: "Излучение, взаимодействие которого с веществом приводит к образованию в этом веществе ионов разного знака, называется",
        options: [
            "неионизирующим",
            "ионизирующим",
            "лазерным",
            "электромагнитным"
        ],
        correct: 1,
        topic: "Ионизирующие излучения",
        variant: 1,
        ticketNum: 1,
        variantLabel: "Вариант 1 · №1"
    },
    {
        id: 2,
        text: "Самопроизвольное превращение неустойчивых ядер в ядра других элементов с возникновением альфа-, бета- и гамма-излучения, называется",
        options: [
            "радиоактивность",
            "терморегуляция",
            "колебание",
            "вибрация"
        ],
        correct: 0,
        topic: "Радиоактивность",
        variant: 1,
        ticketNum: 2,
        variantLabel: "Вариант 1 · №2"
    },
    {
        id: 3,
        text: "Любые излучения, которые создаются при радиоактивном распаде, ядерных превращениях, торможении ядерных частиц в веществе и способны прямо или косвенно вызывать ионизацию среды — это",
        options: [
            "лазерные излучения",
            "ионизирующие излучения",
            "электромагнитные излучения",
            "инфракрасное и ультрафиолетовое излучения"
        ],
        correct: 1,
        topic: "Ионизирующие излучения",
        variant: 1,
        ticketNum: 3,
        variantLabel: "Вариант 1 · №3"
    },
    {
        id: 4,
        text: "Поток ядер гелия, состоящих из двух протонов и двух нейтронов, испускаемых веществом при радиоактивном распаде или при ядерных реакциях — это",
        options: [
            "бета-излучение",
            "гамма-излучение",
            "ультрафиолетовое излучение",
            "альфа-излучение"
        ],
        correct: 3,
        topic: "Виды излучений",
        variant: 1,
        ticketNum: 4,
        variantLabel: "Вариант 1 · №4"
    },
    {
        id: 5,
        text: "Электроны или позитроны, вылетающие из ядра при радиоактивном распаде со скоростью, близкой к скорости света — это",
        options: [
            "бета-частицы",
            "альфа-частицы",
            "гамма-излучение",
            "рентгеновское излучение"
        ],
        correct: 0,
        topic: "Виды излучений",
        variant: 1,
        ticketNum: 5,
        variantLabel: "Вариант 1 · №5"
    },
    {
        id: 6,
        text: "Коротковолновое электромагнитное излучение (длина волны менее 10⁻¹⁰ м), испускаемое ядром во время перехода от высокоэнергетического состояния на более низкое называется",
        options: [
            "инфракрасное излучение",
            "ультрафиолетовое излучение",
            "гамма-излучение",
            "лазерное излучение"
        ],
        correct: 2,
        topic: "Виды излучений",
        variant: 1,
        ticketNum: 6,
        variantLabel: "Вариант 1 · №6"
    },
    {
        id: 7,
        text: "Величина, характеризующая количество энергии, переданной ионизирующим излучением веществу массой в одну единицу — это...",
        options: [
            "эквивалентная доза",
            "экспозиционная доза",
            "поглощенная доза",
            "мощность дозы"
        ],
        correct: 2,
        topic: "Дозиметрия",
        variant: 1,
        ticketNum: 14,
        variantLabel: "Вариант 1 · №14"
    },
    {
        id: 8,
        text: "Среди перечисленных видов ионизирующего излучения наибольшей ионизирующей способностью обладает",
        options: [
            "оптическое излучение",
            "гамма-излучение",
            "альфа-излучение",
            "бета-излучение"
        ],
        correct: 2,
        topic: "Виды излучений",
        variant: 1,
        ticketNum: 15,
        variantLabel: "Вариант 1 · №15"
    },
    {
        id: 9,
        text: "К какому классу опасности относятся лазерные изделия, генерирующие видимое излучение в диапазоне длин волн от 400 до 700 нм?",
        options: [
            "класс 3А",
            "класс 4",
            "класс 2",
            "класс 1"
        ],
        correct: 2,
        topic: "Лазерная безопасность",
        variant: 1,
        ticketNum: 16,
        variantLabel: "Вариант 1 · №16"
    },
    {
        id: 10,
        text: "Любые излучения, которые создаются при радиоактивном распаде, ядерных превращениях, торможении ядерных частиц в веществе и способны прямо или косвенно вызывать ионизацию среды — это",
        options: [
            "лазерные излучения",
            "ионизирующие излучения",
            "электромагнитные излучения",
            "инфракрасное и ультрафиолетовое излучения"
        ],
        correct: 1,
        topic: "Ионизирующие излучения",
        variant: 1,
        ticketNum: 17,
        variantLabel: "Вариант 1 · №17"
    },
    {
        id: 11,
        text: "Единицей измерения поглощенной дозы в системе СИ является",
        options: [
            "грей",
            "рентген",
            "бэр",
            "зиверт"
        ],
        correct: 0,
        topic: "Дозиметрия",
        variant: 1,
        ticketNum: 18,
        variantLabel: "Вариант 1 · №18"
    },
    {
        id: 12,
        text: "Электромагнитное излучение, занимающее область спектра между гамма- и УФ-излучением в пределах длин волн от 10⁻¹² до 10⁻¹⁵ см — это",
        options: [
            "инфракрасное излучение",
            "рентгеновское излучение",
            "лазерное излучение",
            "оптическое излучение"
        ],
        correct: 1,
        topic: "Электромагнитные излучения",
        variant: 1,
        ticketNum: 19,
        variantLabel: "Вариант 1 · №19"
    },
    {
        id: 13,
        text: "Единицей измерения эквивалентной дозы в системе СИ является",
        options: [
            "рентген",
            "зиверт",
            "грей",
            "бэр"
        ],
        correct: 1,
        topic: "Дозиметрия",
        variant: 1,
        ticketNum: 20,
        variantLabel: "Вариант 1 · №20"
    },
    {
        id: 14,
        text: "Электроны или позитроны, вылетающие из ядра при радиоактивном распаде со скоростью, близкой к скорости света — это",
        options: [
            "рентгеновское излучение",
            "бета-частицы",
            "альфа-частицы",
            "гамма-излучение"
        ],
        correct: 1,
        topic: "Виды излучений",
        variant: 2,
        ticketNum: 1,
        variantLabel: "Вариант 2 · №1"
    },
    {
        id: 15,
        text: "Электромагнитное излучение с линейчатым спектром, возникающее после ионизации атома с выбрасыванием электрона с одной из его внутренних оболочек, при столкновениях атома с быстрой заряженной частицей или при поглощении им кванта электромагнитного излучения - это",
        options: [
            "гамма-излучение",
            "бета-излучение",
            "тормозное рентгеновское излучение",
            "характеристическое рентгеновское излучение"
        ],
        correct: 3,
        topic: "Рентгеновское излучение",
        variant: 2,
        ticketNum: 2,
        variantLabel: "Вариант 2 · №2"
    },
    {
        id: 16,
        text: "Что из перечисленного относится к искусственным источникам радиоактивного излучения?",
        options: [
            "радиоактивный газ радон",
            "атомная энергетика",
            "ядерные взрывы",
            "рентгеновские аппараты"
        ],
        correct: [1, 2, 3],
        topic: "Источники излучения",
        variant: 2,
        ticketNum: 3,
        variantLabel: "Вариант 2 · №3"
    },
    {
        id: 17,
        text: "Электромагнитное излучение с непрерывным спектром, испускаемое быстрыми заряженными частицами в результате их торможения в электрическом поле - это",
        options: [
            "бета-излучение",
            "тормозное рентгеновское излучение",
            "гамма-излучение",
            "характеристическое рентгеновское излучение"
        ],
        correct: 1,
        topic: "Рентгеновское излучение",
        variant: 2,
        ticketNum: 4,
        variantLabel: "Вариант 2 · №4"
    },
    {
        id: 18,
        text: "Поток ядер гелия, состоящих из двух протонов и двух нейтронов, испускаемых веществом при радиоактивном распаде или при ядерных реакциях — это",
        options: [
            "гамма-излучение",
            "альфа-излучение",
            "ультрафиолетовое излучение",
            "бета-излучение"
        ],
        correct: 1,
        topic: "Виды излучений",
        variant: 2,
        ticketNum: 5,
        variantLabel: "Вариант 2 · №5"
    },
    {
        id: 19,
        text: "Что из перечисленного относится к естественным источникам радиоактивного излучения?",
        options: [
            "ядерные взрывы",
            "атомная энергетика",
            "космические лучи",
            "радиоактивный газ радон"
        ],
        correct: [2, 3],
        topic: "Источники излучения",
        variant: 2,
        ticketNum: 6,
        variantLabel: "Вариант 2 · №6"
    },
    {
        id: 20,
        text: "Величина, характеризующая количество энергии, переданной ионизирующим излучением веществу массой в одну единицу — это...",
        options: [
            "поглощенная доза",
            "экспозиционная доза",
            "мощность дозы",
            "эквивалентная доза"
        ],
        correct: 0,
        topic: "Дозиметрия",
        variant: 2,
        ticketNum: 14,
        variantLabel: "Вариант 2 · №14"
    },
    {
        id: 21,
        text: "Единицей измерения эквивалентной дозы в системе СИ является",
        options: [
            "зиверт",
            "грей",
            "рентген",
            "бэр"
        ],
        correct: 0,
        topic: "Дозиметрия",
        variant: 2,
        ticketNum: 15,
        variantLabel: "Вариант 2 · №15"
    },
    {
        id: 22,
        text: "Внесистемная и системная единицы измерения эквивалентной дозы связаны соотношением",
        options: [
            "1 бэр = 1 Зв",
            "100 бэр = 1 Зв",
            "1 бэр = 100 Зв",
            "1 бэр = 1 мкЗв"
        ],
        correct: 1,
        topic: "Дозиметрия",
        variant: 2,
        ticketNum: 16,
        variantLabel: "Вариант 2 · №16"
    },
    {
        id: 23,
        text: "Сумма произведений эквивалентных доз в различных органах и тканях и соответствующих коэффициентов риска (взвешивающих коэффициентов) для тканей организма — это...",
        options: [
            "эффективная эквивалентная доза",
            "поглощенная доза",
            "экспозиционная доза",
            "мощность дозы"
        ],
        correct: 0,
        topic: "Дозиметрия",
        variant: 2,
        ticketNum: 17,
        variantLabel: "Вариант 2 · №17"
    },
    {
        id: 24,
        text: "Что из перечисленного относится к естественным источникам радиоактивного излучения?",
        options: [
            "радиоактивный газ радон",
            "атомная энергетика",
            "космические лучи",
            "ядерные взрывы"
        ],
        correct: [0, 2],
        topic: "Источники излучения",
        variant: 2,
        ticketNum: 18,
        variantLabel: "Вариант 2 · №18"
    },
    {
        id: 25,
        text: "Что из перечисленного относится к искусственным источникам радиоактивного излучения?",
        options: [
            "атомная энергетика",
            "ядерные взрывы",
            "рентгеновские аппараты",
            "радиоактивный газ радон"
        ],
        correct: [0, 1, 2],
        topic: "Источники излучения",
        variant: 2,
        ticketNum: 19,
        variantLabel: "Вариант 2 · №19"
    },
    {
        id: 26,
        text: "К какому классу опасности относятся лазерные изделия, генерирующие видимое излучение в диапазоне длин волн от 400 до 700 нм?",
        options: [
            "класс 2",
            "класс 1",
            "класс 3А",
            "класс 4"
        ],
        correct: 0,
        topic: "Лазерная безопасность",
        variant: 2,
        ticketNum: 20,
        variantLabel: "Вариант 2 · №20"
    }
];
const DISCIPLINES_DATA = {
    economics: {
        id: "economics",
        title: "Экономика",
        fullTitle: "Экономика предприятия и основы финансов",
        heroTitle: "Экономика <span>и финансы</span>",
        category: "economics",
        categoryLabel: "ЭКОНОМИКА",
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg>',
        color: "#4F46E5",
        gradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        accentLight: "rgba(79, 70, 229, 0.12)",
        badgeClass: "badge-econ",
        description: "Полный университетский курс: формы собственности, банкротство, себестоимость, рентабельность, расчетные задачи и экономические формулы.",
        tags: ["Рентабельность", "Прибыль", "Собственность", "Банкротство"],
        tagFilters: [
            {
                id: "all",
                label: "Все",
                pluralName: "всех заданий",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
                badgeClass: "q-badge-all",
                desc: "Полная база: теория, задачи и формулы"
            },
            {
                id: "question",
                label: "Теория",
                pluralName: "вопросов теории",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
                badgeClass: "q-badge-question",
                desc: "Определения, законы и базовые понятия"
            },
            {
                id: "task",
                label: "Задачи",
                pluralName: "расчётных задач",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>',
                badgeClass: "q-badge-task",
                desc: "Расчётные примеры с числовыми данными"
            },
            {
                id: "formula",
                label: "Формулы",
                pluralName: "формул",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4H6l7 8-7 8h12"/></svg>',
                badgeClass: "q-badge-formula",
                desc: "Экономические уравнения и формулы"
            }
        ],
        getTagForQuestion(q) {
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
            const hasNumbersInText = /\d+[\s ]*(млн|тыс|руб|р\.|т|%|чел|ед|дн|м2|шт|смен)/.test(t) ||
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
        },
        get questions() {
            return (typeof ECONOMICS_QUESTIONS !== "undefined" && Array.isArray(ECONOMICS_QUESTIONS)) ? ECONOMICS_QUESTIONS : [];
        }
    },
    sanitation: {
        id: "sanitation",
        title: "Санитария и гигиена труда",
        fullTitle: "Производственная санитария и гигиена труда (7 сем)",
        heroTitle: "Санитария <span>и гигиена труда</span>",
        category: "safety",
        categoryLabel: "ГИГИЕНА ТРУДА",
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h.01"/><path d="M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z"/><path d="M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z"/><path d="M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z"/></svg>',
        color: "#059669",
        gradient: "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
        accentLight: "rgba(5, 150, 105, 0.15)",
        badgeClass: "badge-safety",
        description: "Официальные тестовые билеты: Вариант 1 (13 вопросов) и Вариант 2 (13 вопросов). Ионизирующие излучения, дозиметрия, источники радиации и лазерная безопасность.",
        homeNotice: {
            type: "success",
            title: "Полная база вопросов",
            text: "Это <strong>все вопросы по тесту</strong>. Материал полностью охватывает билеты — тренируйся в удобных режимах и сдавай на максимум!"
        },
        tags: ["Дозиметрия", "Виды излучений", "Источники излучения", "Лазерная безопасность"],
        tagFilters: [
            {
                id: "all",
                label: "Все вопросы",
                pluralName: "всех заданий теста",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
                badgeClass: "q-badge-all",
                desc: "Полная база вопросов по санитарии и гигиене труда (26 заданий)"
            },
            {
                id: "dosimetry",
                label: "Дозиметрия",
                pluralName: "по дозиметрии",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>',
                badgeClass: "q-badge-dosimetry",
                desc: "Единицы измерения доз, дозиметрические приборы и нормы радиации"
            },
            {
                id: "radiation_types",
                label: "Виды излучений",
                pluralName: "по видам излучений",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m4.93 19.07 4.24-4.24"/></svg>',
                badgeClass: "q-badge-radtypes",
                desc: "Ионизирующие, альфа, бета, гамма, нейтронные и электромагнитные излучения"
            },
            {
                id: "sources",
                label: "Источники излучения",
                pluralName: "по источникам",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
                badgeClass: "q-badge-sources",
                desc: "Естественные и техногенные радиоактивные источники и рентген"
            },
            {
                id: "laser",
                label: "Лазерная безопасность",
                pluralName: "по лазерной безопасности",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
                badgeClass: "q-badge-laser",
                desc: "Классы лазеров и защита от опасных оптических излучений"
            }
        ],
        getTagForQuestion(q) {
            if (!q) return { id: "dosimetry", label: "Дозиметрия", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;vertical-align:-2px"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>' };
            const t = (q.topic || "").toLowerCase();
            if (t.includes("дозиметр")) return { id: "dosimetry", label: "Дозиметрия", pluralName: "по дозиметрии", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;vertical-align:-2px"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>' };
            if (t.includes("виды") || t.includes("ионизирующ") || t.includes("электромагнитн")) return { id: "radiation_types", label: "Виды излучений", pluralName: "по видам излучений", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;vertical-align:-2px"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m4.93 19.07 4.24-4.24"/></svg>' };
            if (t.includes("источник") || t.includes("радиоактивност") || t.includes("рентген")) return { id: "sources", label: "Источники", pluralName: "по источникам", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;vertical-align:-2px"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/></svg>' };
            if (t.includes("лазер")) return { id: "laser", label: "Лазеры", pluralName: "по лазерам", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;vertical-align:-2px"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' };
            return { id: "dosimetry", label: q.topic || "Дозиметрия", pluralName: `по теме «${q.topic || 'Дозиметрия'}»`, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;vertical-align:-2px"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>' };
        },
        questions: PSIGT_QUESTIONS
    }
};
function getActiveDisciplineId() {
    const saved = localStorage.getItem("quiz_active_discipline");
    return (saved && DISCIPLINES_DATA[saved]) ? saved : "economics";
}
function getActiveDiscipline() {
    const id = getActiveDisciplineId();
    return DISCIPLINES_DATA[id] || DISCIPLINES_DATA.economics;
}
function setActiveDiscipline(id, silent = false) {
    if (!DISCIPLINES_DATA[id]) id = "economics";
    localStorage.setItem("quiz_active_discipline", id);
    const disc = DISCIPLINES_DATA[id];
    QUIZ_QUESTIONS = disc.questions;
    if (typeof window !== "undefined") {
        window.QUIZ_QUESTIONS = disc.questions;
    }
    updateAppForActiveDiscipline();
    if (!silent) {
        vibrate(15);
    }
}
function updateAppForActiveDiscipline() {
    const disc = getActiveDiscipline();
    if (!disc) return;
    QUIZ_QUESTIONS = disc.questions;
    if (typeof window !== "undefined") {
        window.QUIZ_QUESTIONS = disc.questions;
    }
    document.title = `QuizApp — ${disc.title}`;
    const mainTitle = document.getElementById("home-main-title");
    if (mainTitle) mainTitle.innerHTML = disc.heroTitle;
    const badgeName = document.getElementById("home-discipline-name");
    if (badgeName) badgeName.textContent = disc.title;
    const badgeIcon = document.getElementById("home-discipline-icon");
    if (badgeIcon) badgeIcon.innerHTML = disc.iconSvg;
    if (typeof renderQuestionTagFilters === "function") {
        renderQuestionTagFilters();
    } else if (typeof updateQuestionTagCounts === "function") {
        updateQuestionTagCounts();
    }
    if (typeof updateExamCardSubtitle === "function") {
        updateExamCardSubtitle();
    }
    if (typeof updateRehearsalCardSubtitle === "function") {
        updateRehearsalCardSubtitle();
    }
    const settingsDisciplineTitle = document.getElementById("settings-discipline-title");
    const settingsDisciplineDesc = document.getElementById("settings-discipline-desc");
    const settingsDisciplineIcon = document.getElementById("settings-discipline-icon");
    if (settingsDisciplineTitle) settingsDisciplineTitle.textContent = disc.title;
    if (settingsDisciplineDesc) settingsDisciplineDesc.textContent = `${disc.questions.length} вопросов · Нажмите для смены`;
    if (settingsDisciplineIcon) settingsDisciplineIcon.innerHTML = disc.iconSvg;
    const noticeEl = document.getElementById("home-discipline-notice");
    if (noticeEl) {
        if (disc.homeNotice) {
            const isWarning = disc.homeNotice.type === "warning";
            const iconSvg = isWarning ? `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            ` : `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            `;
            const cardClass = isWarning ? "discipline-notice-card notice-warning" : "discipline-notice-card notice-success";
            noticeEl.innerHTML = `
                <div class="${cardClass}">
                    <div class="discipline-notice-icon">
                        ${iconSvg}
                    </div>
                    <div class="discipline-notice-content">
                        <h4 class="discipline-notice-title">${disc.homeNotice.title}</h4>
                        <p class="discipline-notice-text">${disc.homeNotice.text}</p>
                    </div>
                </div>
            `;
            noticeEl.style.display = "block";
        } else {
            noticeEl.innerHTML = "";
            noticeEl.style.display = "none";
        }
    }
}
function showDisciplineToast(message) {
    // Disabled toast notification
}
if (typeof window !== "undefined") {
    window.DISCIPLINES_DATA = DISCIPLINES_DATA;
    window.getActiveDisciplineId = getActiveDisciplineId;
    window.getActiveDiscipline = getActiveDiscipline;
    window.setActiveDiscipline = setActiveDiscipline;
    window.updateAppForActiveDiscipline = updateAppForActiveDiscipline;
}
