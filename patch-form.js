import fs from 'fs';
let content = fs.readFileSync('src/components/WorksheetForm.tsx', 'utf8');

content = content.replace(
  /interface WorksheetFormProps {([\s\S]*?)isLoading: boolean;\n}/,
  'interface WorksheetFormProps {$1isLoading: boolean;\n  onStop?: () => void;\n}'
);

content = content.replace(
  /export default function WorksheetForm\(\{ onGenerate, isLoading \}: WorksheetFormProps\) {/,
  'export default function WorksheetForm({ onGenerate, isLoading, onStop }: WorksheetFormProps) {'
);

const buttonSection = `<button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold mt-4 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Menjana Worksheet...
          </>
        ) : (
          'Jana Lembaran Kerja'
        )}
      </button>`;

const newButtonSection = `
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Menjana...
            </>
          ) : (
            'Jana Lembaran Kerja'
          )}
        </button>
        {isLoading && onStop && (
          <button
            type="button"
            onClick={onStop}
            className="px-6 py-4 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition-colors flex justify-center items-center"
          >
            Batal
          </button>
        )}
      </div>
`;

content = content.replace(buttonSection, newButtonSection);

fs.writeFileSync('src/components/WorksheetForm.tsx', content, 'utf8');
console.log("Patched WorksheetForm");
