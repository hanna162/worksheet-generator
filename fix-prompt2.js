import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

content = content.replace(
  /\`\<div class="page-break"\>\<\/div\>\`/g,
  '<div class=\\"page-break\\"></div>'
);

fs.writeFileSync('server.ts', content, 'utf8');
console.log('Fixed server.ts again');
