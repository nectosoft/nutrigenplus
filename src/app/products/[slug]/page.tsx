"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Star,
    ShoppingCart,
    ChevronRight,
    ShieldCheck,
    Droplets,
    FlaskConical,
    Dna,
    Zap,
    MoveLeft,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/translation-context";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useTranslation();
    const { addToCart } = useCart();

    // Find product data based on slug
    const productKey = Object.keys(t.products.items).find(
        (key) => (t.products.items as any)[key].slug === slug
    ) as "bioactive" | "fish" | undefined;

    if (!productKey) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-alabaster">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-serif text-charcoal">{t.common.not_found}</h1>
                    <Link href="/#shop" className="text-gold-end hover:underline block">{t.common.return_shop}</Link>
                </div>
            </div>
        );
    }

    const product = t.products.items[productKey];
    const imagePath = `/${slug}-actual.jpg`;

    const handleAddToCart = () => {
        const numericPrice = parseFloat(product.price.replace(/[^\d.,]/g, "").replace(",", "."));
        addToCart({
            id: slug,
            name: product.name,
            price: product.price,
            numericPrice,
            image: imagePath,
            quantity: 1,
            info: product.info
        });

        toast.success(`${product.name} ${t.toast.added}`, {
            description: t.toast.desc,
            style: {
                background: "#FFFFFF",
                color: "#1A1A1A",
                border: "1px solid #D4AF37",
            },
        });
    };

    return (
        <main className="bg-white min-h-screen selection:bg-rose-100 selection:text-rose-900">
            <Navbar />

            {/* Cinematic Hero */}
            <div className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-alabaster skew-x-12 translate-x-24 -z-10" />

                <div className="container mx-auto px-6">
                    <nav className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-10">
                        <Link href="/" className="hover:text-gold-end transition-colors font-bold">{t.common.home}</Link>
                        <span>/</span>
                        <Link href="/#shop" className="hover:text-gold-end transition-colors font-bold">{t.nav.shop}</Link>
                        <span>/</span>
                        <span className="text-charcoal font-bold">{product.name}</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Product Image Stage */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square flex items-center justify-center group max-w-2xl mx-auto lg:mx-0"
                        >
                            <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gold-gradient/5 rounded-full blur-3xl opacity-50" />
                            <Image
                                src={imagePath}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="relative z-10 w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.08)] group-hover:scale-105 transition-transform duration-[2s] ease-out"
                                priority
                            />

                            {/* Signature Stamp Positioning */}
                            <div className="absolute bottom-6 left-6 z-20">
                                <span className="bg-white/90 backdrop-blur-xl text-gold-end px-6 py-3 rounded-full text-[9px] font-bold shadow-xl border border-gold-start/10 uppercase tracking-[0.2em]">
                                    {t.common.signature} {t.common.edition}
                                </span>
                            </div>
                        </motion.div>

                        {/* Order Interface */}
                        <div className="lg:pl-10 space-y-10">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-gold-start fill-gold-start" />)}
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold border-l border-gray-100 pl-6">{t.common.verified}</span>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-gold-end font-bold tracking-[0.4em] text-[10px] uppercase block">
                                        {product.info}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-serif text-charcoal leading-[1.15] tracking-tight">
                                        {product.name}
                                    </h1>
                                </div>

                                <div className="flex items-baseline gap-5">
                                    <span className="text-4xl font-bold text-charcoal">{product.price}</span>
                                    {product.oldPrice && (
                                        <span className="text-xl text-gray-300 line-through font-light">{product.oldPrice}</span>
                                    )}
                                </div>

                                <p className="text-lg text-gray-500 font-light leading-relaxed border-l-[1.5px] border-gold-start/30 pl-6 italic">
                                    {product.description}
                                </p>

                                <div className="pt-8">
                                    <Button
                                        onClick={handleAddToCart}
                                        className="h-14 px-20 bg-charcoal text-white rounded-full text-[10px] uppercase tracking-[0.6em] font-bold shadow-2xl hover:bg-white hover:text-charcoal hover:ring-1 hover:ring-gold-start/30 transition-all duration-700 group flex items-center gap-6 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-all duration-700" />
                                        <span className="relative z-10">{t.products.add_to_cart}</span>
                                        <div className="w-px h-3 bg-white/20 group-hover:bg-charcoal/20 relative z-10" />
                                        <span className="font-serif italic lowercase tracking-tight opacity-40 group-hover:opacity-100 relative z-10">{product.price}</span>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits & Highlights Section */}
            <section className="py-24 bg-alabaster/30">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24">
                        {/* Benefits Grid */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-gold-end font-bold tracking-[0.5em] text-[10px] uppercase">{t.common.integration}</span>
                                <h3 className="text-3xl md:text-5xl font-serif text-charcoal">{t.products.key_benefits}</h3>
                            </div>
                            <div className="grid gap-8">
                                {(product as any).benefits.map((benefit: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-6 items-start p-8 rounded-3xl bg-white border border-black/[0.03] hover:shadow-xl transition-all duration-500"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gold-gradient/10 flex items-center justify-center shrink-0">
                                            <ShieldCheck size={18} className="text-gold-end" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-charcoal uppercase tracking-widest">{benefit.title}</h4>
                                            <p className="text-sm text-gray-400 font-medium leading-relaxed italic">{benefit.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Highlights & Usage */}
                        <div className="space-y-16">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-serif text-charcoal pr-12 border-b border-black/5 pb-6">{t.products.product_highlights}</h3>
                                <div className="grid sm:grid-cols-2 gap-10">
                                    {(product as any).highlights.map((highlight: any, idx: number) => (
                                        <div key={idx} className="space-y-2">
                                            <h4 className="text-[10px] font-bold text-gold-end uppercase tracking-[0.2em]">{highlight.title}</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">{highlight.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggested Use Box */}
                            <div className="bg-charcoal p-10 md:p-14 rounded-[3rem] text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-gradient opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-8 bg-gold-start" />
                                        <span className="text-[10px] font-bold tracking-[0.4em] text-gold-start uppercase">{(product as any).usage?.title || t.products.suggested_use}</span>
                                    </div>
                                    <p className="text-xl md:text-2xl font-serif leading-relaxed italic text-white/90">
                                        "{(product as any).usage?.desc || (product as any).description}"
                                    </p>
                                </div>
                            </div>

                            {/* Specialized Amino Acid Profile (Fish Collagen Only) */}
                            {(product as any).special_aminos && (
                                <div className="pt-8 space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-serif text-charcoal pr-12">{(product as any).special_aminos.title}</h3>
                                        <div className="h-px w-full bg-black/5" />
                                    </div>
                                    <div className="grid gap-6">
                                        {(product as any).special_aminos.items.map((amino: any, idx: number) => (
                                            <div key={idx} className="flex justify-between items-center border-b border-black/5 pb-4">
                                                <div className="space-y-1">
                                                    <span className="text-sm font-bold text-charcoal">{amino.name}</span>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{amino.desc}</p>
                                                </div>
                                                <div className="w-2 h-2 rounded-full bg-gold-start/40" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* The Molecular Mechanism - Cinetic Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-gold-gradient/5 -skew-x-12 translate-x-20 -z-10" />

                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="h-[0.5px] w-6 bg-gold-start/40" />
                                    <span className="text-gold-end font-bold tracking-[0.4em] text-[8px] uppercase italic opacity-60">
                                        {t.common.integration}
                                    </span>
                                </motion.div>
                                <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight tracking-tight">
                                    {(product as any).molecular_mechanism.title}
                                </h2>
                            </div>
                            <p className="text-base text-gray-400 font-light leading-relaxed max-w-md italic border-l border-gold-start/10 pl-6">
                                {(product as any).molecular_mechanism.description}
                            </p>
                        </div>

                        <div className="lg:col-span-7 space-y-4">
                            {(product as any).molecular_mechanism.steps.map((step: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-10 bg-alabaster/40 backdrop-blur-sm rounded-[2rem] border border-white flex flex-col md:flex-row gap-8 items-center group hover:bg-white hover:shadow-xl transition-all duration-700"
                                >
                                    <div className="text-4xl font-serif text-charcoal/5 group-hover:text-gold-start/10 transition-all duration-700 italic shrink-0">0{idx + 1}</div>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal">{step.title}</h4>
                                        <p className="text-xs text-gray-400 font-medium leading-relaxed">{(step as any).desc}</p>
                                    </div>
                                    <ArrowRight className="ml-auto w-5 h-5 text-gold-end opacity-0 group-hover:opacity-40 -translate-x-5 group-hover:translate-x-0 transition-all duration-700 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Scientific Transparency Dashboard */}
            <section className="py-24 bg-charcoal text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-gradient/5 blur-3xl opacity-10" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center">
                            <div className="col-span-2 lg:col-span-1 space-y-3">
                                <h3 className="text-[9px] font-bold text-gold-start uppercase tracking-[0.6em] italic opacity-40">{t.common.integrity}</h3>
                                <p className="text-2xl font-serif leading-tight">{(product as any).transparency.title}</p>
                            </div>

                            <div className="space-y-2 text-center">
                                <div className="text-4xl font-serif text-gold-gradient lowercase">{(product as any).transparency.purity}</div>
                                <div className="text-[8px] uppercase font-bold tracking-[0.3em] text-white/20">{t.common.standard}</div>
                            </div>

                            <div className="space-y-2 text-center">
                                <div className="text-4xl font-serif text-white lowercase">{(product as any).transparency.weight_value}</div>
                                <div className="text-[8px] uppercase font-bold tracking-[0.3em] text-white/20">{(product as any).transparency.weight_label}</div>
                            </div>

                            <div className="text-center lg:text-right">
                                <div className="text-[8px] uppercase font-bold tracking-[0.4em] text-white/20 italic">{(product as any).transparency.analysis}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Immersive Ingredients Grid */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(product as any).ingredients.map((ing: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="p-10 bg-alabaster/60 rounded-[1.5rem] border border-black/[0.01] space-y-6 group hover:bg-white hover:shadow-lg transition-all duration-500"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        {idx === 0 ? <Dna size={20} className="text-gold-end opacity-40" /> : idx === 1 ? <Droplets size={20} className="text-gold-end opacity-40" /> : idx === 2 ? <FlaskConical size={20} className="text-gold-end opacity-40" /> : <Zap size={20} className="text-gold-end opacity-40" />}
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-charcoal">{ing.name}</h4>
                                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic opacity-80">{(ing.detail)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="lg:sticky lg:top-40 space-y-10 lg:pl-10">
                            <div className="space-y-4">
                                <span className="text-gold-end font-bold tracking-[0.5em] text-[10px] uppercase">{t.common.blueprint}</span>
                                <h3 className="text-4xl md:text-5xl font-serif text-charcoal">{t.common.synergy}</h3>
                            </div>
                            <p className="text-lg text-gray-500 font-light leading-relaxed italic border-l-2 border-gold-start/20 pl-6">
                                "{product.longDescription}"
                            </p>

                            <div className="grid grid-cols-2 gap-10 pt-6">
                                {(Object.entries((product as any).specs) as [string, string][]).map(([key, val], idx) => (
                                    <div key={idx} className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300">{(t.common as any)[key] || key}</p>
                                        <p className="text-lg font-serif text-charcoal">{val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Ritual */}
            <section className="py-48 bg-alabaster relative overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-white rounded-[100%] translate-y-1/2 shadow-inner" />

                <div className="relative z-10 container mx-auto px-6 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h3 className="text-[10px] font-bold text-gold-end uppercase tracking-[0.8em] opacity-60 italic">{t.products.journey_title}</h3>
                        <p className="text-4xl md:text-5xl font-serif text-charcoal italic max-w-3xl mx-auto leading-tight">
                            {t.products.journey_desc}
                        </p>
                    </motion.div>

                    <div className="pt-8">
                        <Button
                            onClick={handleAddToCart}
                            className="bg-charcoal text-white h-16 px-32 rounded-full text-[11px] uppercase tracking-[0.8em] font-bold border border-white/10 hover:bg-white hover:text-charcoal transition-all duration-1000 group relative shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                        >
                            <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
                            <span className="relative z-10">{t.products.purchase_ritual}</span>
                            <span className="mx-6 opacity-20 font-light">|</span>
                            <span className="relative z-10 font-serif italic lowercase tracking-normal opacity-60 group-hover:opacity-100">{product.price}</span>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
