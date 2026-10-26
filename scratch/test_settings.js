const fs = require('fs');

// Mock browser environment
const localStorageStore = {};
global.localStorage = {
    getItem: (k) => localStorageStore[k] || null,
    setItem: (k, v) => { localStorageStore[k] = String(v); },
    removeItem: (k) => { delete localStorageStore[k]; },
    clear: () => { for (const k in localStorageStore) delete localStorageStore[k]; }
};

global.document = {
    body: { classList: { contains: () => false, add: () => {}, remove: () => {} } },
    getElementById: (id) => {
        return {
            id,
            value: '',
            classList: { add: () => {}, remove: () => {}, contains: () => false },
            innerHTML: '',
            style: {}
        };
    },
    querySelectorAll: () => []
};

global.getSavedTheme = () => 'dark';
global.applyTheme = () => {};
global.getActiveDiscipline = () => ({ title: 'Экономика и финансы', questions: [] });
global.navigateTo = () => {};
global.openAboutModal = () => {};

// Load utils.js and settings.js
const utilsCode = fs.readFileSync('js/core/utils.js', 'utf-8');
const settingsCode = fs.readFileSync('js/screens/settings.js', 'utf-8');

eval(utilsCode);
eval(settingsCode);

console.log('Testing student profile default:');
const p1 = getStudentProfile();
console.log('Default profile:', p1);
if (p1.name !== 'АБУЗАРОВ М. А.') throw new Error('Default name mismatch');
if (!p1.id.includes('ББПЭ-23-31')) throw new Error('Default ID mismatch');

console.log('Testing saving custom profile:');
saveStudentProfile({
    name: 'ИВАНОВ И. И.',
    id: 'ID: ИСТ-20-01 // ФИТ',
    faculty: 'Информационные системы и технологии'
});

const p2 = getStudentProfile();
console.log('Saved profile:', p2);
if (p2.name !== 'ИВАНОВ И. И.') throw new Error('Saved name mismatch');

console.log('Testing resetStudentProfileToDefault:');
resetStudentProfileToDefault();
const p3 = getStudentProfile();
console.log('Reset profile:', p3);
if (p3.name !== 'АБУЗАРОВ М. А.') throw new Error('Reset failed');

console.log('ALL SETTINGS & PROFILE TESTS PASSED!');
