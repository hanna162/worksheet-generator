import fs from 'fs';

let content = fs.readFileSync('src/main.tsx', 'utf8');

const swRegistration = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.log('SW registration failed: ', err);
    });
  });
}
`;

content = content + swRegistration;

fs.writeFileSync('src/main.tsx', content, 'utf8');
