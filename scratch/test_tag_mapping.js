const fs = require('fs');
const content = fs.readFileSync('js/data/disciplines.js', 'utf8');
const vm = require('vm');
const sandbox = { ECONOMICS_QUESTIONS: [] };
sandbox.window = sandbox;
sandbox.localStorage = { getItem: () => null, setItem: () => {} };
vm.createContext(sandbox);
vm.runInContext(content, sandbox);
const qs = sandbox.DISCIPLINES_DATA.sanitation.questions;

function getSanitationTag(q) {
    if (!q) return 'radiation';
    const top = q.topic || '';
    if (top === 'Лазерная безопасность' || top.toLowerCase().includes('лазер')) return 'laser';
    if (top === 'Дозиметрия') return 'dosimetry';
    if (top === 'Радиационная безопасность' || top === 'Источники излучения' || top === 'Нормативы безопасности' || top.toLowerCase().includes('безопасность') || top.toLowerCase().includes('источник')) return 'safety';
    return 'radiation';
}

const counts = { all: qs.length, radiation: 0, dosimetry: 0, safety: 0, laser: 0 };
qs.forEach(q => {
    const t = getSanitationTag(q);
    counts[t]++;
});
console.log('Sanitation counts:', counts);
