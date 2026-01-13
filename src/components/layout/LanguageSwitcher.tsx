"use client";

import React from "react";
import { useTranslation } from "@/context/translation-context";
import { Language } from "@/lib/translations";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
    const { language, setLanguage, t } = useTranslation();

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-charcoal/80 hover:text-gold-end hover:bg-gold-start/5"
                >
                    <Globe className="w-4 h-4" />
                    <span className="uppercase font-medium text-xs">{language}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border-gold-start/20 z-[1001]">
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-gold-start/5 focus:bg-gold-start/5"
                    onClick={() => handleLanguageChange("en")}
                >
                    <span className="flex items-center gap-2">
                        <span className="text-xs font-medium">{t.common.english}</span>
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer hover:bg-gold-start/5 focus:bg-gold-start/5"
                    onClick={() => handleLanguageChange("bg")}
                >
                    <span className="flex items-center gap-2">
                        <span className="text-xs font-medium">{t.common.bulgarian}</span>
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;
