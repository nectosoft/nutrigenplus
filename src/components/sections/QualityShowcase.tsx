"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fish, CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "@/context/translation-context";

const QualityShowcase = () => {
    const { t } = useTranslation();

    const qualities = [
        {
            icon: <Fish className="w-6 h-6" />,
            text: t.ingredients.quality.marine,
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            text: t.ingredients.quality.amino,
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            text: (t.ingredients.quality as any).beef_collagen,
        },
        {
            icon: <Zap className="w-6 h-6" />,
            text: t.ingredients.quality.soluble,
        },
    ];

    return (
        <div className="bg-charcoal py-8 md:py-12 overflow-hidden border-y border-gold-start/20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {qualities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center gap-4 group"
                        >
                            <div className="text-gold-mid p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-gold-gradient group-hover:text-white group-hover:border-transparent transition-all duration-700 shadow-sm group-hover:shadow-gold-start/20">
                                {item.icon}
                            </div>
                            <span className="text-alabaster/80 text-xs md:text-base uppercase tracking-widest font-medium group-hover:text-white transition-colors">
                                {item.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QualityShowcase;
