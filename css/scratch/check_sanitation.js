const fs = require('fs');
const content = fs.readFileSync('js/data/disciplines.js', 'utf8');
const vm = require('vm');
const sandbox = { ECONOMICS_QUESTIONS: [] };
sandbox.window = sandbox;
sandbox.localStorage = { getItem: () => null, setItem: () => {} };
vm.createContext(sandbox);
vm.runInContext(content, sandbox);
const qs = sandbox.DISCIPLINES_DATA.sanitation.questions;
console.log('Sanitation total questions:', qs.length);
const topics = {};
qs.forEach(q => {
    topics[q.topic] = (topics[q.topic] || 0) + 1;
    console.log(`Q${q.id} [${q.topic}]: ${q.text.slice(0, 60)}...`);
});
console.log('\nTopics breakdown:', topics);
