import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add state for install prompt
const stateTarget = `  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);`;
const stateReplacement = `  const [copied, setCopied] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setInstallPrompt(null);
      });
    }
  };`;

// Add Install button next to Export button
const buttonTarget = `            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Export A4 PDF
            </button>`;
const buttonReplacement = `            {installPrompt && (
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg shadow-sm shadow-indigo-200 flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Install App
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Export A4 PDF
            </button>`;

if (content.includes(stateTarget) && content.includes(buttonTarget)) {
    content = content.replace(stateTarget, stateReplacement);
    content = content.replace(buttonTarget, buttonReplacement);
    fs.writeFileSync('src/App.tsx', content, 'utf8');
    console.log("Updated App.tsx successfully");
} else {
    console.log("Target strings not found");
}
