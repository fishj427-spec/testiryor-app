const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');

const requiredIds = [
    'screen-home',
    'screen-stats',
    'screen-settings',
    'screen-changelog',
    'screen-disciplines',
    'screen-questions',
    'screen-review',
    'tab-bar',
    'settings-content'
];

let failed = false;
for (const id of requiredIds) {
    if (!html.includes(`id="${id}"`)) {
        console.error(`MISSING ID: ${id}`);
        failed = true;
    }
}

if (!failed) {
    console.log('ALL REQUIRED DOM IDs FOUND IN index.html!');
} else {
    process.exit(1);
}
