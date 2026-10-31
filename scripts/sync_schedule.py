#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт синхронизации расписания занятий с официального портала УГНТУ (rasp.rusoil.net).
Сохраняет данные в js/data/schedule-data.js и data/schedule.json для работы через VPN и офлайн.
"""

import sys
import os
import json
import ssl
import urllib.request
import urllib.parse
from datetime import datetime, timedelta

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

GROUP_NAME = "ББПЭ-23-31"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'accept': 'application/json',
    'x-point0-stream': 'true',
    'x-point0-transform': 'true',
    'x-point0-from-scope': 'root',
    'x-point0-to-scope': 'root',
    'Referer': 'https://rasp.rusoil.net/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

WEEKDAYS = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"]
MONTHS = [
    "", "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
]

CUSTOM_CONSULTATIONS = {
    "02.11.2026": {
        "number": 3,
        "type": "консультация",
        "time": "с 12:00",
        "subject": "Основы экономики и управления производством (курсовая работа)",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": True,
        "link": "https://oiledu.ru"
    },
    "09.11.2026": {
        "number": 3,
        "type": "консультация",
        "time": "с 12:00",
        "subject": "Основы экономики и управления производством (курсовая работа)",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": True,
        "link": "https://oiledu.ru"
    },
    "16.11.2026": {
        "number": 3,
        "type": "консультация",
        "time": "с 12:00",
        "subject": "Основы экономики и управления производством (курсовая работа)",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": True,
        "link": "https://oiledu.ru"
    },
    "23.11.2026": {
        "number": 3,
        "type": "консультация",
        "time": "с 12:00",
        "subject": "Основы экономики и управления производством (курсовая работа)",
        "room": "Теоретический-303",
        "teacher": "Даминева Раиса Мухаметовна",
        "hasLink": True,
        "link": "https://oiledu.ru"
    }
}

def query_week(group, date_str):
    payload = {
        'type': 'gruppa',
        'props': {'gruppa': group},
        'ddate': date_str
    }
    param = urllib.parse.quote(json.dumps({'json': payload}))
    url = f"https://rasp.rusoil.net/_point0/root/query/week-schedule?input={param}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=ctx, timeout=12) as r:
        return json.loads(r.read().decode('utf-8'))

def main():
    group = sys.argv[1] if len(sys.argv) > 1 else GROUP_NAME
    print(f"=== Синхронизация расписания для группы {group} с rasp.rusoil.net ===")

    start_monday = datetime(2026, 8, 31) # 1 неделя семестра
    all_days = []
    weeks_fetched = 0

    for w in range(1, 19): # недели с 1 по 18
        monday = start_monday + timedelta(days=(w - 1) * 7)
        dstr = monday.strftime('%d.%m.%Y')
        try:
            res = query_week(group, dstr)
            json_data = res.get('json', {})
            numweek = json_data.get('numweek', w)
            weeks_fetched += 1

            for idx_day, day_obj in enumerate(json_data.get('data', [])):
                day_date_str = day_obj.get('date') # e.g. "28.10.2026"
                dt = datetime.strptime(day_date_str, '%d.%m.%Y')
                day_name = WEEKDAYS[dt.weekday()]
                month_name = MONTHS[dt.month]
                formatted_date = f"{day_name}, {dt.day} {month_name}"

                week_badge = f"{numweek} неделя" if idx_day == 0 else None

                classes = []
                for it in day_obj.get('items', []):
                    for l in it.get('lessons', []):
                        teacher = l.get('teacher_name') or ""
                        room = l.get('aud') or ""
                        if room.startswith("Т-"):
                            room = "Теоретический-" + room[2:]
                        elif room.startswith("Л-"):
                            room = "Лабораторный-" + room[2:]

                        start = l.get('start_time') or ""
                        end = l.get('end_time') or ""
                        time_str = f"{start} — {end}" if start and end else start

                        vid = l.get('nvidzanat') or "пара"
                        subject = l.get('ndisc') or ""

                        has_link = ("экономик" in subject.lower() or "дистант" in vid.lower() or "oiledu" in vid.lower())
                        link = "https://oiledu.ru" if has_link else None

                        classes.append({
                            "number": l.get('paraclockid', 1),
                            "type": vid,
                            "time": time_str,
                            "subject": subject,
                            "room": room,
                            "teacher": teacher,
                            "hasLink": has_link,
                            "link": link
                        })

                # Добавляем консультации пользователя
                if day_date_str in CUSTOM_CONSULTATIONS:
                    c = CUSTOM_CONSULTATIONS[day_date_str]
                    if not any(x['subject'] == c['subject'] for x in classes):
                        classes.append(c)
                        classes.sort(key=lambda x: x.get('number', 1))

                all_days.append({
                    "rawDate": day_date_str,
                    "date": formatted_date,
                    "week": week_badge,
                    "weekNumber": numweek,
                    "hasClasses": len(classes) > 0,
                    "classes": classes
                })

            print(f"  [OK] Неделя {numweek:2d} ({dstr}): получено дней: {len(json_data.get('data', []))}")
        except Exception as e:
            print(f"  [ERR] Ошибка при загрузке недели {w} ({dstr}): {e}")

    # Создаем папки при необходимости
    os.makedirs('data', exist_ok=True)
    os.makedirs('js/data', exist_ok=True)

    metadata = {
        "group": group,
        "syncTime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "source": "https://rasp.rusoil.net/",
        "totalWeeks": weeks_fetched,
        "totalDays": len(all_days),
        "daysWithClasses": sum(1 for d in all_days if d["hasClasses"])
    }

    # Сохраняем в data/schedule.json
    output_json = {
        "metadata": metadata,
        "days": all_days
    }
    with open('data/schedule.json', 'w', encoding='utf-8') as f:
        json.dump(output_json, f, ensure_ascii=False, indent=2)

    # Сохраняем в js/data/schedule-data.js (для мгновенной синхронной загрузки в браузере)
    js_content = f"""// [РАСПИСАНИЕ ЗАНЯТИЙ] Автоматически синхронизировано с rasp.rusoil.net
// Группа: {group} | Обновлено: {metadata['syncTime']}
// Источник: https://rasp.rusoil.net/

const SCHEDULE_METADATA = {json.dumps(metadata, ensure_ascii=False, indent=2)};

const SCHEDULE_DATA = {json.dumps(all_days, ensure_ascii=False, indent=2)};

if (typeof window !== "undefined") {{
    window.SCHEDULE_METADATA = SCHEDULE_METADATA;
    window.SCHEDULE_DATA = SCHEDULE_DATA;
}}
"""
    with open('js/data/schedule-data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"\nГотово! Расписание сохранено:")
    print(f" - js/data/schedule-data.js ({len(js_content)} байт)")
    print(f" - data/schedule.json")
    print(f"Всего дней: {len(all_days)}, дней с парами: {metadata['daysWithClasses']}")

if __name__ == "__main__":
    main()
