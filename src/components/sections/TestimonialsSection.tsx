"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/translation-context";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
    const { t } = useTranslation();

    const voices = [
        t.testimonials.quote1,
        t.testimonials.quote2,
        t.testimonials.quote3,
    ];

    return (
        <section id="testimonials" className="py-24 bg-alabaster relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-gold-end font-medium tracking-[0.3em] uppercase text-xs"
                    >
                        {t.testimonials.subtitle}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-charcoal"
                    >
                        {t.testimonials.title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {voices.map((voice, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative p-10 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gold-start/5"
                        >
                            <Quote className="absolute top-6 left-6 w-10 h-10 text-gold-mid/10" />
                            <div className="relative z-10 space-y-6">
                                <p className="text-charcoal/70 text-lg leading-relaxed italic font-serif">
                                    "{voice.text}"
                                </p>
                                <div className="space-y-1">
                                    <p className="text-gold-end font-bold text-sm uppercase tracking-widest">
                                        {voice.author.split(",")[0]}
                                    </p>
                                    <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">
                                        {voice.author.split(",")[1]}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
