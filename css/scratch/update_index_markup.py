import re

path = r"d:\Projects\ОБНОВА\index.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update home-top-bar
old_home_top_bar = '''            <div class="home-top-bar anim-fadeInUp">
                <button type="button" class="discipline-badge-btn" onclick="navigateTo('screen-disciplines')" title="Выбрать другую дисциплину" aria-label="Выбрать дисциплину">
                    <span class="discipline-badge-icon" id="home-discipline-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                    </span>
                    <span class="discipline-badge-name" id="home-discipline-name">Экономика</span>
                    <svg class="discipline-badge-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
            </div>'''

new_home_top_bar = '''            <div class="home-top-bar anim-fadeInUp">
                <button type="button" class="home-back-to-disc-btn" onclick="navigateTo('screen-disciplines')" title="Выбор предметов" aria-label="Все предметы">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    <span>Предметы</span>
                </button>
                <button type="button" class="discipline-badge-btn" onclick="navigateTo('screen-disciplines')" title="Выбрать другую дисциплину" aria-label="Выбрать дисциплину">
                    <span class="discipline-badge-icon" id="home-discipline-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                    </span>
                    <span class="discipline-badge-name" id="home-discipline-name">Экономика</span>
                    <svg class="discipline-badge-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
            </div>'''

if old_home_top_bar in content:
    content = content.replace(old_home_top_bar, new_home_top_bar)
    print("Updated home-top-bar")
else:
    print("Warning: old_home_top_bar not found exactly")

# 2. Update screen-questions tag filter
old_tag_filter = '''            <div class="questions-tag-filter" id="questions-tag-filter">
                <button type="button" class="q-filter-tag active" data-type="all" onclick="setQuestionTagFilter('all')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg><span>Все</span><span class="q-tag-count" id="count-tag-all">255</span></button>
                <button type="button" class="q-filter-tag" data-type="question" onclick="setQuestionTagFilter('question')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span>Теория</span><span class="q-tag-count" id="count-tag-question">162</span></button>
                <button type="button" class="q-filter-tag" data-type="task" onclick="setQuestionTagFilter('task')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg><span>Задачи</span><span class="q-tag-count" id="count-tag-task">52</span></button>
                <button type="button" class="q-filter-tag" data-type="formula" onclick="setQuestionTagFilter('formula')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4H6l7 8-7 8h12"/></svg><span>Формулы</span><span class="q-tag-count" id="count-tag-formula">41</span></button>
            </div>'''

new_tag_filter = '''            <div class="questions-tag-filter" id="questions-tag-filter"></div>'''

if old_tag_filter in content:
    content = content.replace(old_tag_filter, new_tag_filter)
    print("Updated questions-tag-filter")
else:
    print("Warning: old_tag_filter not found exactly")

# 3. Update disciplines screen back button with ID
old_disc_btn = '''                    <button class="back-btn" onclick="goBack()" aria-label="Назад" title="Назад">'''
new_disc_btn = '''                    <button class="back-btn" id="disciplines-back-btn" onclick="goBack()" aria-label="Назад" title="Назад">'''
if old_disc_btn in content:
    content = content.replace(old_disc_btn, new_disc_btn)
    print("Updated disciplines-back-btn")

# 4. Add instant feedback toggle to exam-config-modal
old_exam_time_section = '''                    <!-- Ограничение по времени -->
                    <div class="exam-modal-section">
                        <div class="exam-modal-section-header">
                            <span class="exam-modal-section-label">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                Время на тест
                            </span>
                            <div class="exam-stepper">
                                <button type="button" class="stepper-btn" onclick="stepExamTime(-5)" aria-label="Меньше">−</button>
                                <span class="stepper-val" id="exam-stepper-time-val">45 мин</span>
                                <button type="button" class="stepper-btn" onclick="stepExamTime(5)" aria-label="Больше">+</button>
                            </div>
                        </div>
                    </div>'''

new_exam_time_section = '''                    <!-- Ограничение по времени -->
                    <div class="exam-modal-section">
                        <div class="exam-modal-section-header">
                            <span class="exam-modal-section-label">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                Время на тест
                            </span>
                            <div class="exam-stepper">
                                <button type="button" class="stepper-btn" onclick="stepExamTime(-5)" aria-label="Меньше">−</button>
                                <span class="stepper-val" id="exam-stepper-time-val">45 мин</span>
                                <button type="button" class="stepper-btn" onclick="stepExamTime(5)" aria-label="Больше">+</button>
                            </div>
                        </div>
                    </div>
                    <!-- Показ верных ответов -->
                    <div class="exam-modal-section">
                        <div class="exam-modal-section-header" style="cursor:pointer;" onclick="toggleExamInstantFeedback()">
                            <span class="exam-modal-section-label" style="display:flex;align-items:center;gap:8px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                Показ верных ответов
                            </span>
                            <label class="switch-toggle" onclick="event.stopPropagation()">
                                <input type="checkbox" id="exam-instant-feedback-toggle" onchange="setExamInstantFeedback(this.checked)">
                                <span class="switch-slider"></span>
                            </label>
                        </div>
                    </div>'''

if old_exam_time_section in content:
    content = content.replace(old_exam_time_section, new_exam_time_section)
    print("Updated exam modal with instant feedback toggle")

# 5. Update rehearsal-options-list in rehearsal-config-modal
rehearsal_body_regex = re.compile(r'<div class="rehearsal-options-list">[\s\S]*?</div>\s*<!-- Итоговая карточка-сводка -->')
new_rehearsal_body = '<div class="rehearsal-options-list" id="rehearsal-options-list"></div>\n                    <!-- Итоговая карточка-сводка -->'
if rehearsal_body_regex.search(content):
    content = rehearsal_body_regex.sub(new_rehearsal_body, content)
    print("Updated rehearsal-options-list to dynamic container")

# 6. Update bottom tab-bar
old_tab_home = '''        <button class="tab-item active" data-tab="home" onclick="navigateTo('screen-home')"><div class="tab-icon"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div><span class="tab-label">Домой</span></button>'''

new_tab_disciplines = '''        <button class="tab-item active" data-tab="disciplines" onclick="navigateTo('screen-disciplines')"><div class="tab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><span class="tab-label">Главная</span></button>'''

if old_tab_home in content:
    content = content.replace(old_tab_home, new_tab_disciplines)
    print("Updated tab-bar first tab to disciplines / Главная")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("index.html successfully updated!")
