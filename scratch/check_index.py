# -*- coding: utf-8 -*-
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

checks = [
    'student-edit-modal',
    'student-input-name',
    'student-input-id',
    'student-input-faculty',
    'data-tab="settings"',
    'ПРОФИЛЬ СТУДЕНТА',
    'confetti-canvas'
]

for c in checks:
    print(c, '->', 'FOUND' if c in text else 'MISSING')
print('Total characters:', len(text))
