"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/context/translation-context";
import Image from "next/image";

const PhilosophySection = () => {
    const { t } = useTranslation();
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yVal = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const rotateVal = useTransform(scrollYProgress, [0, 1], [0, 8]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

    return (
        <section
            id="philosophy"
            ref={containerRef}
            className="py-40 bg-[#fdfdfd] relative overflow-hidden"
        >
            {/* Artistic Background Element */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03]">
                <h1 className="text-[30vw] font-serif leading-none absolute -left-20 top-0 whitespace-nowrap">
                    NutriGen+
                </h1>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Image Column - Asymmetrical with floating element */}
                    <div className="lg:col-span-6 relative">
                        <motion.div
                            style={{ y: yVal, rotate: rotateVal }}
                            className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.08)] bg-white"
                        >
                            <Image
                                src="/hero-product-new.png"
                                alt="NutriGen Philosophy"
                                fill
                                className="object-contain p-8 hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                        </motion.div>

                        {/* Floating Signature Detail */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                            className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white max-w-[200px] hidden lg:block"
                        >
                            <div className="h-0.5 w-12 bg-[#DE9D9D] mb-6" />
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">{t.philosophy.molecular_standard}</p>
                            <p className="text-sm font-serif italic text-charcoal">{t.philosophy.quote}</p>
                        </motion.div>
                    </div>

                    {/* Content Column - Editorial Spacing */}
                    <div className="lg:col-span-6 space-y-16 lg:pl-12">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                                className="inline-flex items-center gap-6"
                            >
                                <span className="text-[#DE9D9D] font-bold tracking-[0.5em] text-[10px] uppercase">
                                    {t.philosophy.subtitle}
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                                className="text-6xl md:text-8xl font-serif text-charcoal leading-[0.9] tracking-tight"
                            >
                                {t.philosophy.title}
                            </motion.h2>
                        </div>

                        <div className="space-y-12 max-w-xl">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-gray-600 font-serif leading-relaxed italic"
                            >
                                {t.about.mission.text1}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                                transition={{ delay: 0.4 }}
                                className="relative pl-12"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#DE9D9D] to-transparent" />
                                <p className="text-md md:text-lg text-gray-400 font-light leading-loose uppercase tracking-[0.1em]">
                                    {t.about.mission.text2}
                                </p>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                                transition={{ delay: 0.6 }}
                                className="text-base text-gray-500 font-serif leading-relaxed"
                            >
                                {t.about.mission.cta}
                            </motion.p>
                        </div>

                        {/* Visual flourish: Scientific authenticity stamp */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                            className="flex items-center gap-8 pt-8"
                        >
                            <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center relative">
                                <div className="absolute w-14 h-14 border border-[#DE9D9D]/20 rounded-full animate-spin-slow" />
                                <span className="text-[8px] uppercase tracking-tighter text-gray-300">{t.philosophy.certified}</span>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* What Sets Us Apart & Trust Icons Section */}
                <div className="mt-40 pt-40 border-t border-black/[0.03]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        {/* What Sets Us Apart */}
                        <div className="lg:col-span-8 space-y-16">
                            <div className="space-y-4">
                                <span className="text-[#DE9D9D] font-bold tracking-[0.5em] text-[10px] uppercase">
                                    THE NUTRIGEN+ DIFFERENCE
                                </span>
                                <h3 className="text-4xl md:text-5xl font-serif text-charcoal">
                                    {t.about.sets_apart.title}
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {t.about.sets_apart.items.map((item: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full border border-[#DE9D9D]/20 flex items-center justify-center text-[10px] font-bold text-[#DE9D9D]">
                                                0{idx + 1}
                                            </div>
                                            <h4 className="text-lg font-serif text-charcoal">{item.title}</h4>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed pl-12">
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Icons */}
                        <div className="lg:col-span-4 lg:pl-12">
                            <div className="bg-alabaster/50 p-12 rounded-[2.5rem] border border-white space-y-12">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                                    Our Guarantee
                                </h4>
                                <div className="space-y-10">
                                    {t.about.trust_icons.map((icon: any, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start gap-6"
                                        >
                                            <div className="w-5 h-5 mt-1 rounded-full bg-gold-gradient shadow-lg" />
                                            <div>
                                                <h5 className="text-sm font-bold text-charcoal uppercase tracking-widest">{icon.title}</h5>
                                                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tighter">{icon.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
