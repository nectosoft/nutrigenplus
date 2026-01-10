"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationDict } from "@/lib/translations";

interface TranslationContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationDict;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("bg"); // Default to Bulgarian

    // Load language preference from local storage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem("preferred-language") as Language;
        if (savedLang && (savedLang === "en" || savedLang === "bg")) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("preferred-language", lang);
    };

    const t = translations[language];

    return (
        <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
};
