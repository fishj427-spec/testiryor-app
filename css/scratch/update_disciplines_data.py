import os

path = r"d:\Projects\ОБНОВА\js\data\disciplines.js"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace DISCIPLINES_DATA definition
old_marker = "const DISCIPLINES_DATA = {"

new_disciplines_data = '''const DISCIPLINES_DATA = {
    economics: {
        id: "economics",
        title: "Экономика",
        fullTitle: "Экономика предприятия и основы финансов",
        heroTitle: "Экономика <span>и финансы</span>",
        category: "economics",
        categoryLabel: "ЭКОНОМИКА",
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
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
        iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="9" y1="11" x2="15" y2="11"/></svg>',
        color: "#059669",
        gradient: "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
        accentLight: "rgba(5, 150, 105, 0.15)",
        badgeClass: "badge-safety",
        description: "Тестовые билеты 7 семестра: ионизирующие излучения (альфа, бета, гамма, рентген), дозиметрия (Зиверт, Грей, бэр), источники радиации и лазерная безопасность.",
        tags: ["Ионизирующие излучения", "Дозиметрия", "Радиационная безопасность", "Лазерная безопасность"],
        tagFilters: [
            {
                id: "all",
                label: "Все",
                pluralName: "всех заданий",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
                badgeClass: "q-badge-all",
                desc: "Полный курс: излучения, дозиметрия, безопасность и лазеры"
            },
            {
                id: "radiation",
                label: "Излучения",
                pluralName: "вопросов по излучениям",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 0-9 9M21 12a9 9 0 0 0-9-9M12 21a9 9 0 0 0 9-9M3 12a9 9 0 0 0 9 9"/></svg>',
                badgeClass: "q-badge-radiation",
                desc: "Альфа, бета, гамма, рентген и спектры излучений"
            },
            {
                id: "dosimetry",
                label: "Дозиметрия",
                pluralName: "вопросов по дозиметрии",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
                badgeClass: "q-badge-dosimetry",
                desc: "Дозы облучения, единицы СИ (Зв, Гр, Р) и мощность дозы"
            },
            {
                id: "safety",
                label: "Безопасность",
                pluralName: "вопросов по безопасности",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
                badgeClass: "q-badge-safety",
                desc: "Методы защиты персонала, экраны и нормы НРБ-99/2009"
            },
            {
                id: "laser",
                label: "Лазеры",
                pluralName: "вопросов по лазерам",
                iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
                badgeClass: "q-badge-laser",
                desc: "Классификация лазерной опасности и диапазоны спектра"
            }
        ],
        getTagForQuestion(q) {
            if (!q) return { id: "radiation", label: "Излучения", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 0-9 9M21 12a9 9 0 0 0-9-9M12 21a9 9 0 0 0 9-9M3 12a9 9 0 0 0 9 9"/></svg>' };
            const top = (q.topic || "").trim();
            const topLower = top.toLowerCase();
            if (top === "Лазерная безопасность" || topLower.includes("лазер")) {
                return {
                    id: "laser",
                    label: "Лазеры",
                    pluralName: "по лазерам",
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
                };
            }
            if (top === "Дозиметрия" || topLower.includes("дозиметр") || topLower.includes("доза")) {
                return {
                    id: "dosimetry",
                    label: "Дозиметрия",
                    pluralName: "по дозиметрии",
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
                };
            }
            if (top === "Радиационная безопасность" || top === "Источники излучения" || top === "Нормативы безопасности" || topLower.includes("безопасн") || topLower.includes("источник") || topLower.includes("норм")) {
                return {
                    id: "safety",
                    label: "Безопасность",
                    pluralName: "по безопасности",
                    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
                };
            }
            return {
                id: "radiation",
                label: "Излучения",
                pluralName: "по излучениям",
                icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 0-9 9M21 12a9 9 0 0 0-9-9M12 21a9 9 0 0 0 9-9M3 12a9 9 0 0 0 9 9"/></svg>'
            };
        },
        questions: PSIGT_QUESTIONS
    }
};'''

idx_start = code.find(old_marker)
idx_end = code.find("function getActiveDisciplineId()", idx_start)

updated_code = code[:idx_start] + new_disciplines_data + "\n\n" + code[idx_end:]

# Also update updateAppForActiveDiscipline to trigger renderQuestionTagFilters
updated_code = updated_code.replace(
'''    if (typeof updateQuestionTagCounts === "function") {
        updateQuestionTagCounts();
    }''',
'''    if (typeof renderQuestionTagFilters === "function") {
        renderQuestionTagFilters();
    } else if (typeof updateQuestionTagCounts === "function") {
        updateQuestionTagCounts();
    }'''
)

with open(path, "w", encoding="utf-8") as f:
    f.write(updated_code)

print("Updated disciplines.js successfully!")
