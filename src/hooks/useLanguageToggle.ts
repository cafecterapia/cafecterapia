import { useCallback, useState } from 'react';

export type Language = 'pt' | 'en';

/**
 * Simple language toggle hook. Defaults to 'pt'.
 */
export function useLanguageToggle(initial: Language = 'pt') {
  const [lang, setLang] = useState<Language>(initial);
  const toggle = useCallback(() => setLang(l => (l === 'pt' ? 'en' : 'pt')), []);
  return { lang, toggle, setLang };
}
