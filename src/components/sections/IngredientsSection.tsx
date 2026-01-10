"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/translation-context";
import { Droplets, Shield, Zap, Sparkles } from "lucide-react";

const IngredientsSection = () => {
    const { t } = useTranslation();

    const ingredients = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            ...t.ingredients.items.peptides
        },
        {
            icon: <Zap className="w-6 h-6" />,
            ...t.ingredients.items.vitaminc
        },
        {
            icon: <Droplets className="w-6 h-6" />,
            ...t.ingredients.items.hyaluronic
        },
        {
            icon: <Shield className="w-6 h-6" />,
            ...t.ingredients.items.zinc
        }
    ];

    return (
        <section id="ingredients" className="py-24 bg-alabaster">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-gold-end font-medium tracking-[0.3em] uppercase text-xs"
                    >
                        {t.ingredients.subtitle}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-charcoal"
                    >
                        {t.ingredients.title}
                    </motion.h2>
                    <p className="text-charcoal/60 leading-relaxed italic">
                        {t.ingredients.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ingredients.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-10 rounded-3xl border border-gray-50 hover:border-gold-start/20 transition-all duration-500 shadow-sm hover:shadow-xl group"
                        >
                            <div className="w-12 h-12 bg-alabaster rounded-2xl flex items-center justify-center mb-8 text-gold-end group-hover:bg-gold-gradient group-hover:text-white transition-all duration-500 shadow-inner">
                                {item.icon}
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-4">{item.name}</h3>
                            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IngredientsSection;
