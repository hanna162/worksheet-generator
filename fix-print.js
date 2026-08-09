import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'className="flex h-screen bg-[#F1F5F9] font-sans text-slate-800 overflow-hidden"',
  'className="flex h-screen bg-[#F1F5F9] font-sans text-slate-800 overflow-hidden print:h-auto print:overflow-visible"'
);

content = content.replace(
  '<main className="flex-1 flex flex-col overflow-hidden">',
  '<main className="flex-1 flex flex-col overflow-hidden print:overflow-visible">'
);

content = content.replace(
  '<div className="flex-1 flex flex-col gap-8 p-6 overflow-y-auto">',
  '<div className="flex-1 flex flex-col gap-8 p-6 overflow-y-auto print:block print:overflow-visible print:p-0 print:gap-0">'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Updated App.tsx successfully");
