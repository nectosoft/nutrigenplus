"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/translation-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

const ProductShowcase = () => {
    const { t } = useTranslation();
    const { addToCart } = useCart();

    const products = [
        {
            id: "bioactive-collagen",
            slug: "bioactive-collagen",
            name: t.products.items.bioactive.name,
            price: t.products.items.bioactive.price,
            image: "/product-bovine-transparent.png",
            cartImage: "/product-bovine-transparent.png",
            info: t.products.items.bioactive.info,
            desc: t.products.items.bioactive.description,
            glow: "bg-gold-start/15",
            accent: "text-gold-end",
            bgClass: "bg-white",
            order: "lg:order-1",
            textOrder: "lg:order-2"
        },
        {
            id: "fish-collagen",
            slug: "fish-collagen",
            name: t.products.items.fish.name,
            price: t.products.items.fish.price,
            image: "/product-fish-transparent.png",
            cartImage: "/product-fish-transparent.png",
            info: t.products.items.fish.info,
            desc: t.products.items.fish.description,
            glow: "bg-blue-900/10",
            accent: "text-[#3E5879]",
            bgClass: "bg-alabaster/30",
            order: "lg:order-2",
            textOrder: "lg:order-1"
        },
    ];

    return (
        <section id="shop" className="overflow-hidden">
            {products.map((product, idx) => (
                <div
                    key={product.id}
                    className={`py-12 md:py-32 relative noise-overlay min-h-fit md:min-h-[800px] flex flex-col items-center border-b border-charcoal/5 last:border-0 ${product.bgClass}`}
                >
                    {/* Ambient Background Removed for Performance */}


                    {/* Cinematic Stage */}
                    <div className="container mx-auto px-6 flex-1 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center"
                        >
                            {/* 3D Product Canvas - Hidden on Mobile */}
                            <div className={`relative hidden lg:flex items-center justify-center order-2 ${product.order}`}>
                                {/* Simplified Stage Background */}
                                <div className="absolute inset-4 md:inset-0 bg-alabaster/40 rounded-[4rem] -z-10 border border-charcoal/5" />

                                <motion.div
                                    whileHover={{ scale: 1.02, rotate: -1, y: -5 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="relative z-10 cursor-pointer will-change-transform"
                                    onClick={() => window.location.href = `/shop/${product.slug}`}
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={1000}
                                        height={1000}
                                        className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
                                        priority={idx === 0}
                                    />

                                    {/* Simplified Purity Badge */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, type: "spring" }}
                                        className="absolute -top-4 -right-4 md:-right-12 bg-white px-6 py-4 rounded-3xl border border-gold-start/20 shadow-lg hidden md:flex flex-col items-center gap-1"
                                    >
                                        <span className="text-xs font-bold tracking-[0.5em] uppercase text-gold-end italic">{t.common.purity}</span>
                                        <span className="text-sm font-serif font-bold text-charcoal">99.8%</span>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* High-End Editorial Context */}
                            <div className={`space-y-8 md:space-y-12 order-1 ${product.textOrder} text-left lg:text-left`}>
                                <div className="space-y-8">
                                    <div className="space-y-3">

                                        {/* Mobile Product Image - Positioned exactly according to "Red Line" feedback */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="lg:hidden py-4 -mx-4"
                                        >
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={600}
                                                height={600}
                                                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                                            />
                                        </motion.div>

                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-charcoal leading-[1.1] font-medium tracking-tight"
                                        >
                                            {product.name}
                                        </motion.h3>
                                    </div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                        className="text-sm md:text-xl text-charcoal/40 leading-relaxed font-light italic max-w-2xl text-left lg:text-left mx-0"
                                    >
                                        {product.desc}
                                    </motion.p>
                                </div>

                                <div className="flex flex-col items-start lg:items-start gap-10 pt-2">
                                    {/* Price Block - Moved higher and increased gap */}
                                    <div className="flex flex-col items-start gap-4 mb-4">
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-charcoal">{product.price}</span>
                                            <span className="text-xl md:text-2xl text-charcoal/30 line-through decoration-gold-end/30">
                                                {(parseFloat(product.price.replace(/[^0-9.,]/g, "").replace(",", ".")) * 1.15).toFixed(2)} €
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 opacity-30">
                                            <div className="h-px w-8 bg-gold-end" />
                                            <span className="text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-gold-end font-bold italic">{t.common.global_ritual}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto">
                                        <Link
                                            href={`/shop/${product.slug}`}
                                            className="group relative px-6 py-4 rounded-xl bg-white border border-charcoal/10 text-charcoal font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:border-gold-mid flex items-center justify-center gap-3 overflow-hidden shadow-sm hover:shadow-md"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {t.products.view_details}
                                                <ArrowRight className="w-3 md:w-4 h-3 md:h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                            </span>
                                        </Link>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const priceValue = parseFloat(product.price.replace(" €", "").replace(",", "."));
                                                addToCart({
                                                    id: product.slug,
                                                    name: product.name,
                                                    price: product.price,
                                                    numericPrice: priceValue,
                                                    image: product.cartImage,
                                                    quantity: 1
                                                });
                                            }}
                                            className="group relative px-6 py-4 rounded-xl bg-gold-gradient text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-lg shadow-md flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {t.products.buy_now}
                                                <ShoppingBag className="w-3 md:w-4 h-3 md:h-4" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stage Finisher (Only for second product) */}
                    {idx === products.length - 1 && (
                        <div className="mt-20 flex flex-col items-center px-6 opacity-20">
                            <div className="h-[0.5px] w-32 bg-charcoal/20 mb-8" />
                            <p className="text-center text-charcoal font-serif italic text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest max-w-4xl leading-relaxed">
                                {t.hero.tagline}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default ProductShowcase;
