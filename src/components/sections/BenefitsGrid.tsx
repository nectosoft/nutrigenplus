"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Activity, Heart, Zap, Shield, Waves } from "lucide-react";
import { useTranslation } from "@/context/translation-context";

const BenefitsGrid = () => {
    const { t } = useTranslation();

    const benefits = [
        {
            icon: <Sparkles className="w-8 h-8 text-gold-end" />,
            title: t.benefits.hair.title,
            description: t.benefits.hair.desc,
        },
        {
            icon: <Activity className="w-8 h-8 text-gold-end" />,
            title: t.benefits.joints.title,
            description: t.benefits.joints.desc,
        },
        {
            icon: <Heart className="w-8 h-8 text-gold-end" />,
            title: t.benefits.skin.title,
            description: t.benefits.skin.desc,
        },
        {
            icon: <Zap className="w-8 h-8 text-gold-end" />,
            title: t.benefits.ligaments.title,
            description: t.benefits.ligaments.desc,
        },
        {
            icon: <Shield className="w-8 h-8 text-gold-end" />,
            title: t.benefits.nails.title,
            description: t.benefits.nails.desc,
        },
        {
            icon: <Waves className="w-8 h-8 text-gold-end" />,
            title: t.benefits.tendons.title,
            description: t.benefits.tendons.desc,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as any }
        }
    };

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 md:mb-20 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-3xl md:text-5xl font-serif text-charcoal uppercase"
                    >
                        {t.benefits.title} <br />
                        <span className="text-gold-gradient">{t.benefits.subtitle}</span>
                    </motion.h2>
                    <div className="h-1 w-24 bg-gold-gradient mx-auto" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="p-8 bg-alabaster rounded-2xl border border-gold-start/10 hover:border-gold-start/40 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-serif text-charcoal mb-3">{benefit.title}</h3>
                            <p className="text-charcoal/60 leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BenefitsGrid;
