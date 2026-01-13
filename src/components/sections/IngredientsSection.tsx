"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/translation-context";

const IngredientsSection = () => {
    const { t } = useTranslation();

    const items = [
        {
            number: "01",
            name: t.ingredients.items.peptides.name,
            desc: t.ingredients.items.peptides.desc,
            detail: t.ingredients.items.peptides.detail,
        },
        {
            number: "02",
            name: t.ingredients.items.bioavailability.name,
            desc: t.ingredients.items.bioavailability.desc,
            detail: t.ingredients.items.bioavailability.detail,
        },
        {
            number: "03",
            name: t.ingredients.items.purity.name,
            desc: t.ingredients.items.purity.desc,
            detail: t.ingredients.items.purity.detail,
        },
    ];

    return (
        <section id="science" className="relative py-32 md:py-48 overflow-hidden bg-white">
            {/* Background Architectural Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-0 w-px h-full bg-charcoal" />
                <div className="absolute top-0 right-0 w-px h-full bg-charcoal" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-charcoal -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold-end mb-6 block"
                    >
                        {t.ingredients.subtitle}
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif text-charcoal leading-[1.1] mb-8"
                    >
                        {t.ingredients.excellence_title} <br />
                        <span className="italic text-gold-mid">{t.ingredients.excellence_standard}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-charcoal/60 leading-relaxed max-w-2xl mx-auto"
                    >
                        {t.ingredients.description}
                    </motion.p>
                </div>

                {/* Editorial Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                    {/* Center Column Lines */}
                    <div className="absolute inset-y-0 left-1/3 w-px bg-gold-start/10 hidden md:block" />
                    <div className="absolute inset-y-0 right-1/3 w-px bg-gold-start/10 hidden md:block" />

                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index, duration: 0.8 }}
                            className={`flex flex-col p-8 md:p-12 lg:p-16 space-y-8 group ${index !== 2 ? "border-b md:border-b-0 border-gold-start/10" : ""
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-gold-end/40 group-hover:text-gold-end transition-colors duration-500">
                                    {item.number}
                                </span>
                                {/* Animated Molecular Lens */}
                                <div className="w-12 h-12 rounded-full border border-gold-start/10 glass-premium relative flex items-center justify-center overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-tr from-gold-start/5 to-transparent opacity-50"
                                    />
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-mid shadow-[0_0_10px_rgba(212,175,55,0.5)] z-10" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl lg:text-3xl font-serif text-charcoal group-hover:text-gold-end transition-colors duration-500">
                                    {item.name}
                                </h3>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/40">
                                    {item.desc}
                                </p>
                            </div>

                            <p className="text-sm md:text-base text-charcoal/60 leading-relaxed pt-4 border-t border-gold-start/5">
                                {item.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 md:mt-32 flex flex-wrap items-center justify-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-px h-12 bg-gold-start/20" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.common.lab_verified}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-px h-12 bg-gold-start/20" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.common.asc_source}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-px h-12 bg-gold-start/20" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.common.molecular_grade}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default IngredientsSection;
