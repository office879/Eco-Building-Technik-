import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const STORAGE_KEY = "ecobt_lang_v1";
const DEFAULT_LANG = "DE";
const SUPPORTED = ["DE", "EN", "RU", "UA"];

const I18nContext = createContext(null);

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) setLang(saved);
  }, []);

  const change = (l) => {
    if (!SUPPORTED.includes(l)) return;
    setLang(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const value = useMemo(() => ({ lang, setLang: change, supported: SUPPORTED }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useLang = () => {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useLang must be used inside I18nProvider");
  return c;
};

/** Returns the translated value for the current language, falling back to DE. */
export const useT = () => {
  const { lang } = useLang();
  return (dict) => (dict && (dict[lang] || dict.DE)) ?? "";
};
