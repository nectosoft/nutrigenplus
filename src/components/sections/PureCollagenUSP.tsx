"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Shield, Zap, Sparkles } from "lucide-react";
import { useTranslation } from "@/context/translation-context";

const PureCollagenUSP = () => {
    const { t } = useTranslation();

    const comparisonItems = [
        {
            feature: t.ingredients.usp.purity_level,
            pure: t.ingredients.usp.items.purity.pure,
            blend: t.ingredients.usp.items.purity.blend,
            pureIcon: <Check className="text-gold-end" />,
            blendIcon: <X className="text-charcoal/30" />
        },
        {
            feature: t.ingredients.usp.additives,
            pure: t.ingredients.usp.items.additives.pure,
            blend: t.ingredients.usp.items.additives.blend,
            pureIcon: <Check className="text-gold-end" />,
            blendIcon: <X className="text-charcoal/30" />
        },
        {
            feature: t.ingredients.usp.bioavailability,
            pure: t.ingredients.usp.items.bio.pure,
            blend: t.ingredients.usp.items.bio.blend,
            pureIcon: <Check className="text-gold-end" />,
            blendIcon: <X className="text-charcoal/30" />
        },
        {
            feature: t.ingredients.usp.mixing,
            pure: t.ingredients.usp.items.mixing.pure,
            blend: t.ingredients.usp.items.mixing.blend,
            pureIcon: <Check className="text-gold-end" />,
            blendIcon: <X className="text-charcoal/30" />
        }
    ];

    return (
        <section className="py-24 md:py-40 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                        {/* Visual Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="space-y-8">
                                <span className="text-xs font-bold tracking-[0.4em] text-gold-end uppercase">{t.ingredients.usp.standard}</span>
                                <h2 className="text-4xl md:text-6xl font-serif text-charcoal leading-[1.1]">
                                    {t.ingredients.usp.title} <br />
                                    <span className="italic font-light opacity-50 text-3xl">{t.ingredients.usp.vs}</span>
                                </h2>
                                <p className="text-lg text-charcoal/60 leading-relaxed font-sans max-w-xl">
                                    {t.ingredients.usp.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gold-start/10 flex items-center justify-center">
                                            <Shield className="text-gold-end" size={24} />
                                        </div>
                                        <h4 className="font-bold text-charcoal">{t.ingredients.usp.medical_grade}</h4>
                                        <p className="text-sm text-charcoal/40 font-sans">{t.ingredients.usp.medical_desc}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gold-start/10 flex items-center justify-center">
                                            <Zap className="text-gold-end" size={24} />
                                        </div>
                                        <h4 className="font-bold text-charcoal">{t.ingredients.usp.rapid_uptake}</h4>
                                        <p className="text-sm text-charcoal/40 font-sans">{t.ingredients.usp.rapid_desc}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Comparison Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-alabaster/30 rounded-[3rem] p-8 md:p-12 border border-charcoal/5 relative"
                        >
                            {/* Decorative badge */}
                            <div className="absolute -top-4 -right-4 bg-gold-gradient p-4 rounded-2xl shadow-xl text-white">
                                <Sparkles size={24} />
                            </div>

                            <div className="space-y-6">
                                {comparisonItems.map((item, idx) => (
                                    <div key={idx} className="grid grid-cols-4 items-center gap-4 py-6 border-b border-charcoal/5 last:border-0">
                                        <div className="col-span-2">
                                            <p className="text-xs uppercase tracking-widest font-black text-charcoal/30 mb-1">{item.feature}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gold-end">
                                                {item.pureIcon}
                                                <span className="hidden sm:inline">{t.ingredients.usp.pure}</span>
                                            </div>
                                            <p className="text-xs font-bold text-charcoal text-center">{item.pure}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-charcoal/20">
                                                {item.blendIcon}
                                                <span className="hidden sm:inline">{t.ingredients.usp.blend}</span>
                                            </div>
                                            <p className="text-xs text-charcoal/40 text-center">{item.blend}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-6 rounded-2xl bg-white border border-gold-start/10 text-center">
                                <p className="text-xs text-charcoal/60 italic font-serif">
                                    {t.ingredients.usp.quote}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PureCollagenUSP;
