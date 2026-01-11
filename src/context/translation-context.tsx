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
    const [isMounted, setIsMounted] = useState(false);

    // Load language preference from local storage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem("preferred-language") as Language;
        if (savedLang && (savedLang === "en" || savedLang === "bg")) {
            setLanguage(savedLang);
        }
        setIsMounted(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("preferred-language", lang);
    };

    const t = translations[language];

    return (
        <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {/* 
                We use a hydration guard to prevent the "double load" flicker.
                By rendering a subtle placeholder or nothing until mounted,
                we ensure Framer Motion animations trigger exactly once.
            */}
            <div style={{ visibility: isMounted ? 'visible' : 'hidden' }}>
                {children}
            </div>
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
