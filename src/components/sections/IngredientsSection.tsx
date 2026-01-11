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
            ...(t.ingredients.items as any).peptides
        },
        {
            icon: <Zap className="w-6 h-6" />,
            ...(t.ingredients.items as any).bioavailability
        },
        {
            icon: <Shield className="w-6 h-6" />,
            ...(t.ingredients.items as any).purity
        },
        {
            icon: <Droplets className="w-6 h-6" />,
            ...(t.ingredients.items as any).precision
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    return (
        <section id="ingredients" className="py-24 bg-alabaster">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-gold-end font-medium tracking-[0.3em] uppercase text-xs"
                    >
                        {t.ingredients.subtitle}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-4xl md:text-5xl font-serif text-charcoal"
                    >
                        {t.ingredients.title}
                    </motion.h2>
                    <p className="text-charcoal/60 leading-relaxed italic">
                        {t.ingredients.description}
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {ingredients.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
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
                </motion.div>
            </div>
        </section>
    );
};

export default IngredientsSection;
