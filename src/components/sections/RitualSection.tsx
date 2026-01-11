"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/translation-context";

const RitualSection = () => {
    const { t } = useTranslation();

    const steps = [
        {
            number: "01",
            title: t.ritual.step1.title,
            desc: t.ritual.step1.desc,
        },
        {
            number: "02",
            title: t.ritual.step2.title,
            desc: t.ritual.step2.desc,
        },
        {
            number: "03",
            title: t.ritual.step3.title,
            desc: t.ritual.step3.desc,
        },
    ];

    return (
        <section id="ritual" className="py-32 bg-charcoal text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-gradient/5 skew-x-12 translate-x-1/2 -z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                                className="text-gold-mid font-medium tracking-[0.3em] uppercase text-xs"
                            >
                                {t.ritual.subtitle}
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                                className="text-4xl md:text-5xl font-serif text-white italic"
                            >
                                {t.ritual.title}
                            </motion.h2>
                        </div>
                        <p className="text-white/60 leading-relaxed max-w-md text-lg italic">
                            {t.ritual.description}
                        </p>
                    </div>

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                                transition={{ delay: index * 0.2 }}
                                className="flex gap-8 group"
                            >
                                <span className="text-4xl font-serif text-gold-mid/30 group-hover:text-gold-mid transition-colors duration-500 italic">
                                    {step.number}
                                </span>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-medium tracking-wide text-alabaster group-hover:text-gold-end transition-colors font-serif italic">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/40 group-hover:text-white/60 transition-colors">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recipe Gallery */}
                <div className="space-y-20">
                    <div className="text-center space-y-6">
                        <span className="text-gold-end font-bold tracking-[0.6em] text-[10px] uppercase">
                            {t.recipes.subtitle}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif italic">{t.recipes.title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.recipes.items.map((recipe: any, idx: number) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 hover:border-gold-mid/30 hover:bg-white/[0.08] transition-all duration-700 group"
                            >
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-serif italic text-gold-mid">{recipe.title}</h4>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{recipe.desc}</p>
                                    </div>
                                    <div className="space-y-4 text-xs leading-relaxed text-white/50 group-hover:text-white/70 transition-colors">
                                        <div className="space-y-1">
                                            <span className="text-[8px] uppercase font-bold text-gold-mid/40">Ingredients</span>
                                            <p>{recipe.ingredients}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[8px] uppercase font-bold text-gold-mid/40">Method</span>
                                            <p>{recipe.method}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RitualSection;
