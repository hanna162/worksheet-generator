import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add abortControllerRef
content = content.replace(
  'const resultRef = useRef<HTMLDivElement>(null);',
  'const resultRef = useRef<HTMLDivElement>(null);\n  const abortControllerRef = useRef<AbortController | null>(null);'
);

// Add handleStop
content = content.replace(
  'const handleGenerate = async (params: WorksheetParams) => {',
  `const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setError("Penjanaan lembaran kerja telah dibatalkan.");
    }
  };

  const handleGenerate = async (params: WorksheetParams) => {`
);

// Modify handleGenerate fetch call and catch
let generateCode = `    setIsLoading(true);
    setError(null);
    setWorksheet(null);
    setCurrentSubject(params.subject);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate worksheet');
      }

      const data = await response.json();
      setWorksheet(data.result);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
      setError(err.message || 'An unexpected error occurred');
    } finally {
      if (abortControllerRef.current) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }`;

// Replace the old try-catch
content = content.replace(
  /    setIsLoading\(true\);\s*setError\(null\);\s*setWorksheet\(null\);\s*setCurrentSubject\(params\.subject\);\s*try \{([\s\S]*?)\} catch \(err: any\) \{([\s\S]*?)\} finally \{([\s\S]*?)\}/,
  generateCode
);

// Pass onStop to WorksheetForm
content = content.replace(
  '<WorksheetForm onGenerate={handleGenerate} isLoading={isLoading} />',
  '<WorksheetForm onGenerate={handleGenerate} isLoading={isLoading} onStop={handleStop} />'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Patched App.tsx");
