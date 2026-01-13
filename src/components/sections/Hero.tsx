"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/translation-context";

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-alabaster">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-6 translate-x-12 -z-10" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8 max-w-2xl text-center lg:text-left items-center lg:items-start"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gold-end font-medium tracking-[0.2em] uppercase text-xs md:text-sm"
                        >
                            {t.hero.tagline}
                        </motion.span>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-charcoal leading-[1.15] tracking-tight">
                            {t.hero.title_part1} <br />
                            <span className="text-gold-gradient italic">{t.hero.title_italic}</span>
                        </h1>
                        <p className="text-base text-charcoal/60 max-w-md leading-relaxed mx-auto lg:mx-0">
                            {t.hero.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-gold-start/20 text-charcoal px-12 h-14 rounded-xl text-xs uppercase tracking-[0.4em] font-bold hover:bg-gold-start/5 transition-all duration-500 w-full sm:w-auto"
                            onClick={() => {
                                const element = document.getElementById("science");
                                if (element) {
                                    const navHeight = 80;
                                    const elementPosition = element.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                                }
                            }}
                        >
                            {t.hero.our_science}
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 xs:gap-8 pt-4">
                        <div className="flex flex-col items-center group">
                            <span className="text-xl md:text-2xl font-bold text-charcoal/40 group-hover:text-gold-end transition-colors">100%</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/30 group-hover:text-charcoal/50 transition-colors">{t.hero.bioavailable}</span>
                        </div>

                        <div className="w-px h-10 bg-gold-start/20 hidden xs:block" />

                        {/* Middle Standout Badge */}
                        <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-gold-gradient/5 border border-gold-start/10 shadow-sm relative group overflow-hidden transition-all duration-500 hover:shadow-md hover:bg-gold-gradient/10">
                            <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity" />
                            <span className="text-2xl md:text-3xl font-serif font-bold text-gold-end relative z-10 transition-transform group-hover:scale-105">100%</span>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-end relative z-10">{t.hero.pure}</span>
                        </div>

                        <div className="w-px h-10 bg-gold-start/20 hidden xs:block" />

                        <div className="flex flex-col items-center group">
                            <span className="text-xl md:text-2xl font-bold text-charcoal/40 group-hover:text-gold-end transition-colors">100%</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-charcoal/30 group-hover:text-charcoal/50 transition-colors">{t.hero.sustainable}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Product Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative flex justify-center items-center"
                >
                    {/* Premium Narrative Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Dynamic Radiance */}
                        <motion.div
                            animate={{
                                opacity: [0.3, 0.5, 0.3],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gold-mid/10 blur-[140px] rounded-full -z-10"
                        />

                        {/* Molecular Lenses */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-[10%] right-[15%] w-24 h-24 rounded-full border border-gold-start/20 glass-premium backdrop-blur-sm hidden lg:block"
                        >
                            <div className="absolute inset-[15%] border border-gold-start/10 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 30, 0], rotate: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-[5%] left-[5%] w-32 h-32 rounded-full border border-gold-start/10 glass-premium backdrop-blur-md hidden lg:block"
                        >
                            <div className="absolute inset-[20%] border border-gold-start/5 rounded-full bg-gradient-to-bl from-white/10 to-transparent" />
                        </motion.div>
                    </div>

                    {/* Decorative Platform */}
                    <div className="absolute bottom-0 w-[60%] h-4 bg-charcoal/5 blur-xl rounded-full" />

                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full max-w-lg lg:max-w-xl relative z-10"
                    >
                        <Image
                            src="/hero-product-new.png"
                            alt="NutriGen+ Premium Collagen"
                            width={1000}
                            height={1000}
                            priority
                            className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
