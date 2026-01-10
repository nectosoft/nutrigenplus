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
                    className="flex flex-col gap-8 max-w-2xl"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gold-end font-medium tracking-[0.2em] uppercase text-sm"
                        >
                            {t.hero.tagline}
                        </motion.span>
                        <h1 className="text-4xl md:text-6xl font-serif text-charcoal leading-[1.15] tracking-tight">
                            {t.hero.title_part1} <br />
                            <span className="text-gold-gradient italic">{t.hero.title_italic}</span>
                        </h1>
                        <p className="text-base text-charcoal/60 max-w-md leading-relaxed">
                            {t.hero.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Button
                            size="lg"
                            className="bg-gold-gradient text-white border-none px-12 h-14 rounded-xl text-[10px] uppercase tracking-[0.4em] font-bold hover:scale-105 transition-all duration-700 shadow-xl group"
                        >
                            {t.hero.shop_now}
                            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-gold-start/20 text-charcoal px-12 h-14 rounded-xl text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold-start/5 transition-all duration-500"
                        >
                            {t.hero.our_science}
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center gap-8 pt-4 filter grayscale opacity-60">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">99%</span>
                            <span className="text-[10px] uppercase tracking-wider">{t.hero.bioavailable}</span>
                        </div>
                        <div className="w-px h-8 bg-charcoal/10" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">100%</span>
                            <span className="text-[10px] uppercase tracking-wider">{t.hero.sustainable}</span>
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
                    {/* Subtle glow behind product */}
                    <div className="absolute w-[80%] h-[80%] bg-gold-mid/20 blur-[120px] rounded-full -z-10" />

                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-full max-w-md md:max-w-xl"
                    >
                        <Image
                            src="/hero-product.png"
                            alt="NutriGen+ Pure Gold Collagen Tub"
                            width={800}
                            height={800}
                            priority
                            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
