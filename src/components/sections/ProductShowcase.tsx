"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/translation-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

const ProductShowcase = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = React.useState(0);

    const products = [
        {
            id: "bioactive-collagen",
            name: t.products.items.bioactive.name,
            price: t.products.items.bioactive.price,
            image: "/bioactive-collagen-actual.jpg",
            info: t.products.items.bioactive.info,
            desc: t.products.items.bioactive.description,
            glow: "bg-gold-start/15",
            accent: "text-gold-end"
        },
        {
            id: "fish-collagen",
            name: t.products.items.fish.name,
            price: t.products.items.fish.price,
            image: "/fish-collagen-actual.jpg",
            info: t.products.items.fish.info,
            desc: t.products.items.fish.description,
            glow: "bg-blue-900/10",
            accent: "text-blue-900/40"
        },
    ];

    const activeProduct = products[activeIndex];

    return (
        <section id="shop" className="py-20 md:py-32 bg-white overflow-hidden relative noise-overlay min-h-[900px] flex flex-col items-center">
            {/* Ambient Dynamic Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`radiance-${activeIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
                >
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] blur-[160px] rounded-full ${activeProduct.glow} transition-colors duration-1000`} />
                </motion.div>
            </AnimatePresence>

            <div className="container mx-auto px-6 mb-12 relative z-20">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="h-[0.5px] w-8 bg-gold-start/40" />
                        <span className="text-gold-end font-bold tracking-[0.5em] text-[10px] uppercase italic opacity-60">
                            {t.products.limited}
                        </span>
                        <div className="h-[0.5px] w-8 bg-gold-start/40" />
                    </motion.div>

                    {/* Boutique Selector Switch */}
                    <div className="bg-alabaster/60 backdrop-blur-xl p-1.5 rounded-2xl border border-charcoal/5 flex gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
                        {products.map((p, idx) => (
                            <button
                                key={p.id}
                                onClick={() => setActiveIndex(idx)}
                                className={`px-8 md:px-12 py-3.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-700 relative z-10 ${activeIndex === idx ? "text-white" : "text-charcoal/40 hover:text-charcoal"
                                    }`}
                            >
                                {activeIndex === idx && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-charcoal rounded-xl -z-10 shadow-2xl"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                                    />
                                )}
                                {p.id === "bioactive-collagen" ? t.common.gold_standard : t.common.marine_depth}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cinematic Stage */}
            <div className="container mx-auto px-6 flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -20 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center"
                    >
                        {/* 3D Product Canvas */}
                        <div className="relative flex items-center justify-center order-2 lg:order-1">
                            {/* Premium Plinth */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -10 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                className="absolute inset-4 md:inset-0 glass-premium rounded-[4rem] -z-10 shadow-[0_40px_100px_rgba(0,0,0,0.08)] transform rotate-3"
                            />

                            {/* Floating Narrative Elements */}
                            <div className="absolute inset-0 pointer-events-none overflow-visible">
                                <motion.div
                                    animate={{ y: [0, -25, 0], x: [0, 15, 0], rotate: [0, 45, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-[10%] -left-[5%] w-4 h-4 bg-gold-start/20 rounded-full blur-[2px]"
                                />
                                <motion.div
                                    animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-[15%] -right-[5%] w-3 h-3 bg-gold-start/30 rounded-full blur-[1px]"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.04, rotate: -2, y: -10 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative z-10 cursor-pointer"
                            >
                                <Image
                                    src={activeProduct.image}
                                    alt={activeProduct.name}
                                    width={700}
                                    height={700}
                                    className="w-[90%] md:w-full h-auto mx-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
                                    priority
                                />

                                {/* Signature Purity Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                    className="absolute -top-4 -right-4 md:-right-12 glass-premium px-6 py-4 rounded-3xl border-gold-start/20 shadow-2xl hidden md:flex flex-col items-center gap-1"
                                >
                                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gold-end italic">{t.common.purity}</span>
                                    <span className="text-sm font-serif font-bold text-charcoal">99.8%</span>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* High-End Editorial Context */}
                        <div className="space-y-12 order-1 lg:order-2 text-center lg:text-left">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center justify-center lg:justify-start gap-4"
                                    >
                                        <div className="h-[1px] w-12 bg-gold-start/40" />
                                        <span className={`text-[11px] font-bold uppercase tracking-[0.7em] ${activeProduct.accent}`}>
                                            {activeProduct.info}
                                        </span>
                                    </motion.div>
                                    <motion.h3
                                        key={`title-${activeIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-4xl md:text-7xl font-serif text-charcoal leading-[1.1] font-medium tracking-tight"
                                    >
                                        {activeProduct.name}
                                    </motion.h3>
                                </div>

                                <motion.p
                                    key={`desc-${activeIndex}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-lg md:text-xl text-charcoal/40 leading-relaxed font-light italic max-w-2xl mx-auto lg:mx-0"
                                >
                                    {activeProduct.desc}
                                </motion.p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-10 pt-6">
                                <div className="flex flex-col items-center sm:items-start gap-1 order-2 sm:order-1">
                                    <span className="text-4xl md:text-5xl font-bold tracking-tighter text-charcoal">{activeProduct.price}</span>
                                    <span className="text-[10px] uppercase tracking-[0.5em] text-gold-end font-bold opacity-30 italic">{t.common.global_ritual}</span>
                                </div>

                                <Link href={`/products/${activeProduct.id}`} className="order-1 sm:order-2 w-full sm:w-auto">
                                    <Button
                                        className="w-full sm:w-auto h-20 px-20 rounded-full bg-charcoal text-white hover:bg-gold-end transition-all duration-700 text-[11px] uppercase tracking-[0.8em] font-bold shadow-[0_20px_50px_rgba(0,0,0,0.2)] liquid-gold-sweep"
                                    >
                                        <span>{t.hero.our_science}</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Stage Finisher */}
            <div className="mt-20 flex flex-col items-center px-6 opacity-20">
                <div className="h-[0.5px] w-32 bg-charcoal/20 mb-8" />
                <p className="text-center text-charcoal font-serif italic text-2xl md:text-3xl tracking-widest max-w-2xl leading-relaxed">
                    {t.hero.tagline}
                </p>
            </div>
        </section>
    );
};

export default ProductShowcase;
