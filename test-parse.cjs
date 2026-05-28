const fs = require('fs');
const path = require('path');

function parseTokenObj(content) {
  try {
    const obj = {};
    const pairs = content.split(',').map(p => p.trim()).filter(Boolean);
    for (const pair of pairs) {
      const colonIndex = pair.indexOf(':');
      if (colonIndex > 0) {
        const key = pair.slice(0, colonIndex).trim().replace(/^name: ?/, 'name').replace(/^['"]|['"]$/g, '');
        let value = pair.slice(colonIndex + 1).trim();
        if (value.startsWith("'") || value.startsWith('"')) {
          value = value.slice(1, -1);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        obj[key] = value;
      }
    }
    return obj.name ? obj : null;
  } catch { return null; }
}

const tokensDir = path.join('tokens');
const levels = ['global', 'alias', 'component'];

for (const level of levels) {
  const filePath = path.join(tokensDir, level + '.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const tokenMatch = content.match(/const \w+: Token\[\] = \[([\s\S]*?)\]/g);
  const parsed = [];
  if (tokenMatch) {
    for (const block of tokenMatch) {
      const arrayMatch = block.match(/\[([\s\S]*?)\]$/);
      if (arrayMatch) {
        const tokenStr = arrayMatch[1];
        const tokenRegex = /\{([^}]+)\}/g;
        let m;
        while ((m = tokenRegex.exec(tokenStr)) !== null) {
          const obj = parseTokenObj(m[1]);
          if (obj) parsed.push(obj);
        }
      }
    }
  }
  const noValue = parsed.filter(t => t.value === undefined);
  console.log(level + ': total=' + parsed.length + ', noValue=' + noValue.length);
  noValue.forEach(t => console.log('  -', t.name, JSON.stringify(t)));
}
