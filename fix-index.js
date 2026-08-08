import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

const headTags = `
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#0f172a" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
`;

content = content.replace('</head>', headTags + '</head>');

fs.writeFileSync('index.html', content, 'utf8');
