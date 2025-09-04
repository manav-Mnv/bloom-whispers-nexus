import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center bg-muted rounded-2xl p-1 glass">
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground shadow-glow'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`px-4 py-2 rounded-xl text-sm font-medium font-devanagari transition-all duration-300 ${
          language === 'hi'
            ? 'bg-primary text-primary-foreground shadow-glow'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}