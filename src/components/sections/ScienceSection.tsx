"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dna, Droplets, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/context/translation-context";

const ScienceSection = () => {
    const { t } = useTranslation();

    const benefits = [
        {
            icon: <Dna className="w-10 h-10 text-gold-end stroke-[1.2]" />,
            title: t.benefits.hair.title,
            description: t.benefits.hair.desc,
        },
        {
            icon: <Droplets className="w-10 h-10 text-gold-end stroke-[1.2]" />,
            title: t.benefits.skin.title,
            description: t.benefits.skin.desc,
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-gold-end stroke-[1.2]" />,
            title: t.benefits.joints.title,
            description: t.benefits.joints.desc,
        },
    ];

    return (
        <section id="science" className="py-24 bg-alabaster relative overflow-hidden">
            {/* Decorative blurred gold circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold-mid/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-mid/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-gold-end font-medium tracking-[0.3em] uppercase text-xs"
                    >
                        {t.science.subtitle}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-charcoal"
                    >
                        {t.science.title_main} <br />
                        <span className="text-gold-gradient italic">{t.science.title_elegant}</span>
                    </motion.h2>
                    <div className="h-0.5 w-20 bg-gold-gradient mx-auto my-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-8 p-6 bg-white rounded-full shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-500 border border-gold-start/10">
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-serif text-charcoal mb-4">
                                {benefit.title}
                            </h3>
                            <p className="text-charcoal/60 leading-relaxed max-w-xs">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ScienceSection;
