const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function findJs(dir) {
    let results = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) results = results.concat(findJs(full));
        else if (e.name.endsWith('.js')) results.push(full);
    });
    return results;
}

const files = findJs('js');
console.log('Testing', files.length, 'JS files:');
files.forEach(f => {
    try {
        execSync(`node -c "${f}"`);
        console.log('  PASS:', f);
    } catch (e) {
        console.error('  FAIL:', f);
        process.exit(1);
    }
});
console.log('ALL JS FILES COMPILED CLEANLY!');
