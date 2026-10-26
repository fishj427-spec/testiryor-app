# -*- coding: utf-8 -*-
with open('index.html', 'rb') as f:
    raw = f.read()

start_marker = '<tr><td>Отлично</td><td>85% — 100%</td><td><span class="grade-tag grade-5">5</span></td></tr>'.encode('utf-8')
end_marker = '<canvas id="confetti-canvas"></canvas>'.encode('utf-8')

start_pos = raw.find(start_marker)
end_pos = raw.find(end_marker)

print('start_pos:', start_pos, 'end_pos:', end_pos)

clean_chunk = '''<tr><td>Отлично</td><td>85% — 100%</td><td><span class="grade-tag grade-5">5</span></td></tr>
                                <tr><td>Хорошо</td><td>70% — 84%</td><td><span class="grade-tag grade-4">4</span></td></tr>
                                <tr><td>Удовлетворительно</td><td>50% — 69%</td><td><span class="grade-tag grade-3">3</span></td></tr>
                                <tr><td>Неудовлетворительно</td><td>0% — 49%</td><td><span class="grade-tag grade-2">2</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="about-detail-section">
                    <span class="about-detail-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        Режимы подготовки
                    </span>
                    <div class="about-detail-box">
                        • <strong>Контрольная:</strong> тест с выбором количества вопросов и лимита времени (или без него) для приближения к реальному экзамену.<br>
                        • <strong>Репетиционный:</strong> прохождение всей базы вопросов с мгновенной проверкой каждого ответа.<br>
                        • <strong>Список вопросов:</strong> справочник всех заданий с правильными ответами и фильтрацией по темам и задачам.
                    </div>
                </div>
                <button type="button" class="btn btn-primary" onclick="closeAboutModal()" style="margin-top:6px;width:100%;border-radius:var(--radius-full)">
                    Понятно
                </button>
            </div>
        </div>
        <!-- [МОДАЛКА] Редактирование профиля студента -->
        <div class="exam-modal-overlay" id="student-edit-modal" onclick="if(event.target===this)closeStudentEditModal()">
            <div class="exam-modal-card" style="max-height:85vh">
                <div class="modal-drag-handle"></div>
                <div class="exam-modal-header">
                    <div class="exam-modal-header-left">
                        <div class="exam-modal-icon" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:var(--primary);">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <div>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <h2 class="exam-modal-title">Данные студента</h2>
                            </div>
                            <p class="exam-modal-subtitle">Редактирование профиля</p>
                        </div>
                    </div>
                    <button type="button" class="exam-modal-close" onclick="closeStudentEditModal()" aria-label="Закрыть" title="Закрыть">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <form onsubmit="submitStudentEditModal(event)" style="display:flex;flex-direction:column;gap:12px;margin-top:12px;">
                    <div class="student-form-group">
                        <label class="student-form-label" for="student-input-name">ФИО / Имя студента</label>
                        <input id="student-input-name" class="student-input-field" type="text" placeholder="АБУЗАРОВ М. А." required>
                    </div>
                    <div class="student-form-group">
                        <label class="student-form-label" for="student-input-id">Шифр группы / ID</label>
                        <input id="student-input-id" class="student-input-field" type="text" placeholder="ID: ББПЭ-23-31 // СТФЛ" required>
                    </div>
                    <div class="student-form-group">
                        <label class="student-form-label" for="student-input-faculty">Направление подготовки / Специальность</label>
                        <textarea id="student-input-faculty" class="student-input-field" rows="3" placeholder="Управление техносферной и экологической безопасностью предприятий ТЭК" required></textarea>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
                        <button type="submit" class="btn btn-primary" style="width:100%">Сохранить данные</button>
                        <button type="button" class="btn btn-secondary" onclick="resetStudentProfileToDefault()" style="width:100%">Сбросить по умолчанию</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="tab-bar" id="tab-bar">
        <button class="tab-item active" data-tab="disciplines" onclick="navigateTo('screen-disciplines')" aria-label="Выбор дисциплин"><div class="tab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><span class="tab-label">Дисциплины</span></button>
        <button class="tab-item" data-tab="stats" onclick="navigateTo('screen-stats')" aria-label="Статистика"><div class="tab-icon"><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div><span class="tab-label">Статистика</span></button>
        <button class="tab-item" data-tab="settings" onclick="navigateTo('screen-settings')" aria-label="Профиль"><div class="tab-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg></div><span class="tab-label">Профиль</span></button>
        <button class="tab-item" data-tab="changelog" onclick="navigateTo('screen-changelog')" aria-label="Список изменений"><div class="tab-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div><span class="tab-label">Изменения</span></button>
    </div>
</div>
'''

new_data = raw[:start_pos] + clean_chunk.encode('utf-8') + raw[end_pos:]
with open('index.html', 'wb') as f:
    f.write(new_data)
print('Successfully fixed index.html!')
