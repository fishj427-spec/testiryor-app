// [РАСПИСАНИЕ ЗАНЯТИЙ] Экран расписания по учебному календарю
// Точные данные расписания (недели 9–16, 28 октября — 18 декабря 2026)

const SCHEDULE_DATA = [
  {
    "date": "среда, 28 октября",
    "week": "9 неделя",
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Системы управления отходами",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 3,
        "type": "практика",
        "time": "12:15 — 13:50",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 4,
        "type": "практика",
        "time": "14:35 — 16:10",
        "subject": "Основы экономики и управления производством",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": true,
        "link": "https://oiledu.ru"
      }
    ]
  },
  {
    "date": "четверг, 29 октября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 2,
        "type": "практика",
        "time": "10:30 — 12:05",
        "subject": "Производственная безопасность",
        "room": "Лабораторный-307",
        "teacher": "Пряничникова Валерия Валерьевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 3,
        "type": "практика",
        "time": "12:15 — 13:50",
        "subject": "Промышленная безопасность при эксплуатации нефтегазопроводов и нефтегазохранилищ",
        "room": "Лабораторный-424",
        "teacher": "Овсянникова Инна Вячеславовна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 4,
        "type": "практика",
        "time": "14:35 — 16:10",
        "subject": "Техногенные риски",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "пятница, 30 октября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 2,
        "type": "практика",
        "time": "10:30 — 12:05",
        "subject": "Производственная безопасность",
        "room": "Лабораторный-307",
        "teacher": "Пряничникова Валерия Валерьевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 3,
        "type": "практика",
        "time": "12:15 — 13:50",
        "subject": "Производственная санитария и гигиена труда",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 4,
        "type": "практика",
        "time": "14:35 — 16:10",
        "subject": "Системы управления отходами",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "суббота, 31 октября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "воскресенье, 1 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "понедельник, 2 ноября",
    "week": "10 неделя",
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "вторник, 3 ноября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Основы экономики и управления производством",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": true,
        "link": "https://oiledu.ru"
      }
    ]
  },
  {
    "date": "среда, 4 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "четверг, 5 ноября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 2,
        "type": "практика",
        "time": "10:30 — 12:05",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 3,
        "type": "практика",
        "time": "12:15 — 13:50",
        "subject": "Промышленная безопасность при эксплуатации нефтегазопроводов и нефтегазохранилищ",
        "room": "Лабораторный-424",
        "teacher": "Овсянникова Инна Вячеславовна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 4,
        "type": "практика",
        "time": "14:35 — 16:10",
        "subject": "Техногенные риски",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "пятница, 6 ноября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 3,
        "type": "практика",
        "time": "12:15 — 13:50",
        "subject": "Производственная санитария и гигиена труда",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 4,
        "type": "практика",
        "time": "14:35 — 16:10",
        "subject": "Системы управления отходами",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "суббота, 7 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "воскресенье, 8 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "понедельник, 9 ноября",
    "week": "11 неделя",
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "вторник, 10 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "среда, 11 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "четверг, 12 ноября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 2,
        "type": "практика",
        "time": "10:30 — 12:05",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "пятница, 13 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "суббота, 14 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "воскресенье, 15 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "понедельник, 16 ноября",
    "week": "12 неделя",
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "вторник, 17 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "среда, 18 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "четверг, 19 ноября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 2,
        "type": "практика",
        "time": "10:30 — 12:05",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "пятница, 20 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "суббота, 21 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "воскресенье, 22 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "понедельник, 23 ноября",
    "week": "13 неделя",
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "вторник, 24 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "среда, 25 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "четверг, 26 ноября",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "практика",
        "time": "08:45 — 10:20",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 2,
        "type": "практика",
        "time": "10:30 — 12:05",
        "subject": "Обеспечение безопасности производства в нефтегазовой отрасли",
        "room": "Лабораторный-102а",
        "teacher": "Лузина Мария Сергеевна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "пятница, 27 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "суббота, 28 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "воскресенье, 29 ноября",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "понедельник, 30 ноября",
    "week": "14 неделя",
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "вторник, 1 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "среда, 2 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "четверг, 3 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "пятница, 4 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "суббота, 5 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "воскресенье, 6 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "понедельник, 7 декабря",
    "week": "15 неделя",
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "вторник, 8 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "среда, 9 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "четверг, 10 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "пятница, 11 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "суббота, 12 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "воскресенье, 13 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "понедельник, 14 декабря",
    "week": "16 неделя",
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "консультация",
        "time": "08:45 — 10:20",
        "subject": "Основы экономики и управления производством",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": true,
        "link": "https://oiledu.ru"
      }
    ]
  },
  {
    "date": "вторник, 15 декабря",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "экзамен",
        "time": "08:45 — 10:20",
        "subject": "Основы экономики и управления производством",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": true,
        "link": "https://oiledu.ru"
      },
      {
        "number": 2,
        "type": "экзамен",
        "time": "10:30 — 12:05",
        "subject": "Основы экономики и управления производством",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": true,
        "link": "https://oiledu.ru"
      },
      {
        "number": 3,
        "type": "экзамен",
        "time": "12:15 — 13:50",
        "subject": "Основы экономики и управления производством",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": true,
        "link": "https://oiledu.ru"
      }
    ]
  },
  {
    "date": "среда, 16 декабря",
    "week": null,
    "hasClasses": false,
    "classes": []
  },
  {
    "date": "четверг, 17 декабря",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "консультация",
        "time": "08:45 — 10:20",
        "subject": "Системы управления отходами",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      }
    ]
  },
  {
    "date": "пятница, 18 декабря",
    "week": null,
    "hasClasses": true,
    "classes": [
      {
        "number": 1,
        "type": "экзамен",
        "time": "08:45 — 10:20",
        "subject": "Системы управления отходами",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 2,
        "type": "экзамен",
        "time": "10:30 — 12:05",
        "subject": "Системы управления отходами",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      },
      {
        "number": 3,
        "type": "экзамен",
        "time": "12:15 — 13:50",
        "subject": "Системы управления отходами",
        "room": "Лабораторный-307",
        "teacher": "Хакимова Гузель Венеровна",
        "hasLink": false,
        "link": null
      }
    ]
  }
];

let scheduleFilter = 'all'; // 'all' or 'classes_only'
let scheduleSelectedWeek = 'all'; // 'all' or number like 9, 10, ...

function showScheduleToast(text) {
    let toast = document.getElementById("schedule-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "schedule-toast";
        toast.className = "schedule-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.remove("show");
    void toast.offsetWidth; // force reflow
    toast.classList.add("show");
    if (window._scheduleToastTimer) clearTimeout(window._scheduleToastTimer);
    window._scheduleToastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function copyScheduleLink(link, event) {
    if (event) event.stopPropagation();
    vibrate(10);
    const textToCopy = link || "https://oiledu.ru";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showScheduleToast("✓ Ссылка скопирована");
        }).catch(() => {
            fallbackCopyText(textToCopy);
        });
    } else {
        fallbackCopyText(textToCopy);
    }
}

function fallbackCopyText(text) {
    try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showScheduleToast("✓ Ссылка скопирована");
    } catch (e) {
        showScheduleToast("Ссылка: " + text);
    }
}

function setScheduleFilter(filter) {
    vibrate(8);
    scheduleFilter = filter;
    renderSchedule();
}

function setScheduleWeek(week) {
    vibrate(8);
    scheduleSelectedWeek = week;
    renderSchedule();
}

function scrollToTodaySchedule() {
    vibrate(12);
    // Find today card
    const todayCard = document.querySelector(".schedule-day-card.is-today");
    if (todayCard) {
        todayCard.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        showScheduleToast("Сегодня нет в текущем фильтре");
    }
}

function isDateToday(dateStr) {
    const today = new Date();
    const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
    const curMonth = months[today.getMonth()];
    const curDay = today.getDate();
    // Compare e.g. "среда, 28 октября" with day & month
    return dateStr.includes(curDay + " " + curMonth);
}

function renderSchedule() {
    const container = document.getElementById("schedule-content");
    if (!container) return;

    // Track active week for grouping
    let currentWeekNumber = 9;
    
    // Assign week numbers to each day
    const enrichedDays = SCHEDULE_DATA.map((day, idx) => {
        if (day.week) {
            const wm = day.week.match(/(\d+)/);
            if (wm) currentWeekNumber = parseInt(wm[1], 10);
        }
        return {
            ...day,
            weekNumber: currentWeekNumber,
            isToday: isDateToday(day.date)
        };
    });

    // Filtering
    let visibleDays = enrichedDays;
    if (scheduleSelectedWeek !== 'all') {
        visibleDays = visibleDays.filter(d => d.weekNumber === Number(scheduleSelectedWeek));
    }
    if (scheduleFilter === 'classes_only') {
        visibleDays = visibleDays.filter(d => d.hasClasses);
    }

    // Week selector options
    const weeks = [9, 10, 11, 12, 13, 14, 15, 16];
    const totalClassesCount = SCHEDULE_DATA.reduce((acc, d) => acc + (d.classes ? d.classes.length : 0), 0);
    const visibleClassesCount = visibleDays.reduce((acc, d) => acc + (d.classes ? d.classes.length : 0), 0);

    let html = `
        <div class="schedule-header">
            <div class="schedule-header-top">
                <div class="schedule-title-row">
                    <svg class="schedule-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <h1 class="schedule-title">РАСПИСАНИЕ ЗАНЯТИЙ</h1>
                </div>
                <button class="schedule-today-btn" onclick="scrollToTodaySchedule()" title="Перейти к сегодняшнему дню">
                    <span class="schedule-today-dot"></span>
                    Сегодня
                </button>
            </div>

            <!-- Горизонтальная прокрутка недель -->
            <div class="schedule-weeks-bar">
                <button class="schedule-week-chip ${scheduleSelectedWeek === 'all' ? 'active' : ''}" onclick="setScheduleWeek('all')">
                    Все недели
                </button>
                ${weeks.map(w => `
                    <button class="schedule-week-chip ${scheduleSelectedWeek == w ? 'active' : ''}" onclick="setScheduleWeek(${w})">
                        ${w} нед
                    </button>
                `).join('')}
            </div>

            <!-- Фильтр по дням с парами -->
            <div class="schedule-filter-bar">
                <button class="schedule-filter-btn ${scheduleFilter === 'all' ? 'active' : ''}" onclick="setScheduleFilter('all')">
                    Все дни
                </button>
                <button class="schedule-filter-btn ${scheduleFilter === 'classes_only' ? 'active' : ''}" onclick="setScheduleFilter('classes_only')">
                    С парами
                </button>
            </div>
        </div>

        <div class="schedule-list">
    `;

    if (visibleDays.length === 0) {
        html += `
            <div class="schedule-empty-state">
                <div class="schedule-empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </div>
                <div class="schedule-empty-title">В этой неделе нет занятий</div>
                <div class="schedule-empty-subtitle">Выберите другую неделю или режим «Все дни»</div>
            </div>
        `;
    } else {
        visibleDays.forEach(day => {
            const todayClass = day.isToday ? 'is-today' : '';
            const weekBadge = day.week ? `<span class="schedule-day-week-badge">${day.week}</span>` : '';
            const todayBadge = day.isToday ? `<span class="schedule-day-today-badge">СЕГОДНЯ</span>` : '';

            html += `
                <div class="schedule-day-card ${todayClass}" data-date="${escapeHtml(day.date)}">
                    <div class="schedule-day-header">
                        <div class="schedule-day-title-wrap">
                            <span class="schedule-day-date">${escapeHtml(day.date)}</span>
                            ${todayBadge}
                        </div>
                        ${weekBadge}
                    </div>
            `;

            if (!day.hasClasses || !day.classes || day.classes.length === 0) {
                html += `
                    <div class="schedule-no-classes-card">
                        <svg class="schedule-no-classes-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                            <line x1="6" y1="1" x2="6" y2="4"/>
                            <line x1="10" y1="1" x2="10" y2="4"/>
                            <line x1="14" y1="1" x2="14" y2="4"/>
                        </svg>
                        <span>Нет занятий</span>
                    </div>
                `;
            } else {
                html += `<div class="schedule-classes-group">`;
                day.classes.forEach(c => {
                    const typeClass = c.type === 'экзамен' ? 'type-exam' : (c.type === 'консультация' ? 'type-consult' : 'type-practice');
                    const linkButtons = c.hasLink ? `
                        <div class="schedule-class-actions">
                            <a href="${escapeHtml(c.link)}" target="_blank" rel="noopener noreferrer" class="schedule-link-btn" onclick="vibrate(8)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                    <polyline points="15 3 21 3 21 9"/>
                                    <line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Перейти в oiledu.ru
                            </a>
                            <button type="button" class="schedule-copy-btn" onclick="copyScheduleLink('${escapeHtml(c.link)}', event)" title="Скопировать ссылку">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                                Скопировать
                            </button>
                        </div>
                    ` : '';

                    html += `
                        <div class="schedule-class-card ${typeClass}">
                            <div class="schedule-class-top">
                                <div class="schedule-class-subject">${escapeHtml(c.subject)}</div>
                            </div>
                            
                            <div class="schedule-class-badge-row">
                                <span class="schedule-pair-badge ${typeClass}">
                                    <span class="schedule-pair-num">${c.number}</span>
                                    <span class="schedule-pair-type">${escapeHtml(c.type)}</span>
                                </span>
                                <span class="schedule-pair-time">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    ${escapeHtml(c.time)}
                                </span>
                            </div>

                            <div class="schedule-class-details">
                                <div class="schedule-detail-row">
                                    <span class="schedule-detail-room">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                            <circle cx="12" cy="10" r="3"/>
                                        </svg>
                                        ${escapeHtml(c.room)}
                                    </span>
                                    <span class="schedule-detail-sep">•</span>
                                    <span class="schedule-detail-teacher">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                            <circle cx="12" cy="7" r="4"/>
                                        </svg>
                                        ${escapeHtml(c.teacher)}
                                    </span>
                                </div>
                            </div>

                            ${linkButtons}
                        </div>
                    `;
                });
                html += `</div>`;
            }

            html += `</div>`;
        });
    }

    html += `</div>`;
    container.innerHTML = html;
}

if (typeof window !== "undefined") {
    window.SCHEDULE_DATA = SCHEDULE_DATA;
    window.renderSchedule = renderSchedule;
    window.copyScheduleLink = copyScheduleLink;
    window.setScheduleFilter = setScheduleFilter;
    window.setScheduleWeek = setScheduleWeek;
    window.scrollToTodaySchedule = scrollToTodaySchedule;
}
