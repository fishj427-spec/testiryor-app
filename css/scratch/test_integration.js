const fs = require('fs');
const vm = require('vm');

const files = [
    'js/data/questions.js',
    'js/data/disciplines.js',
    'js/data/icons.js',
    'js/core/utils.js',
    'js/core/state.js',
    'js/core/navigation.js',
    'js/modals/exam-modal.js',
    'js/modals/rehearsal-modal.js',
    'js/modals/about-modal.js',
    'js/screens/onboarding.js',
    'js/screens/home.js',
    'js/screens/questions.js',
    'js/screens/review.js',
    'js/screens/quiz.js',
    'js/screens/stats.js',
    'js/screens/settings.js',
    'js/screens/changelog.js',
    'js/screens/disciplines.js'
];

const elements = {};
function fakeEl(id) {
    if (!elements[id]) {
        elements[id] = {
            id,
            textContent: '',
            innerHTML: '',
            style: {},
            classList: {
                add: () => {},
                remove: () => {},
                toggle: () => {},
                contains: () => false
            },
            dataset: {},
            querySelectorAll: () => [],
            appendChild: () => {},
            addEventListener: () => {}
        };
    }
    return elements[id];
}

const storage = {};
const sandbox = {
    console,
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    setInterval: () => {},
    clearInterval: () => {},
    addEventListener: () => {},
    localStorage: {
        getItem: (k) => storage[k] || null,
        setItem: (k, v) => { storage[k] = String(v); },
        removeItem: (k) => { delete storage[k]; }
    },
    document: {
        getElementById: (id) => fakeEl(id),
        querySelector: () => null,
        querySelectorAll: () => [],
        createElement: (tag) => fakeEl(tag),
        body: fakeEl('body')
    },
    window: {
        addEventListener: () => {},
        location: { href: 'http://localhost' },
        history: { pushState: () => {}, replaceState: () => {} }
    },
    navigator: { vibrate: () => {} }
};
sandbox.window = sandbox;

vm.createContext(sandbox);

files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    vm.runInContext(code, sandbox);
});

console.log('Testing integration:');

// 1. Check Economics
sandbox.setActiveDiscipline('economics', true);
let econTags = sandbox.getActiveTagFilters();
let econCounts = sandbox.getQuestionTagCounts();
console.log('Economics tags:', econTags.map(t => t.id));
console.log('Economics counts:', econCounts);
if (econCounts.all !== 255 || econCounts.question !== 162 || econCounts.task !== 52 || econCounts.formula !== 41) {
    throw new Error('Economics counts mismatch: ' + JSON.stringify(econCounts));
}

// 2. Check Sanitation
sandbox.setActiveDiscipline('sanitation', true);
let sanTags = sandbox.getActiveTagFilters();
let sanCounts = sandbox.getQuestionTagCounts();
console.log('Sanitation tags:', sanTags.map(t => t.id));
console.log('Sanitation counts:', sanCounts);
if (sanCounts.all !== 26 || sanCounts.var1 !== 13 || sanCounts.var2 !== 13) {
    throw new Error('Sanitation counts mismatch: ' + JSON.stringify(sanCounts));
}

// 3. Test Exam instant feedback
sandbox.setExamInstantFeedback(true);
if (!sandbox.getExamInstantFeedback()) throw new Error('Instant feedback should be true');
sandbox.setExamInstantFeedback(false);
if (sandbox.getExamInstantFeedback()) throw new Error('Instant feedback should be false');

// 4. Test Navigation home
sandbox.goHome();
console.log('screenHistory after goHome:', sandbox.screenHistory);
if (sandbox.screenHistory[0] !== 'screen-home') {
    throw new Error('Default screenHistory should be screen-home');
}

console.log('ALL INTEGRATION TESTS PASSED PERFECTLY!');
