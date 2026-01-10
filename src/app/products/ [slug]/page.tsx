"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Star,
    ShoppingCart,
    ArrowLeft,
    ChevronRight,
    ShieldCheck,
    Zap,
    Droplets,
    FlaskConical,
    Dna,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/translation-context";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t, language } = useTranslation();
    const { addToCart } = useCart();

    // Find product data based on slug
    const productKey = Object.keys(t.products.items).find(
        (key) => (t.products.items as any)[key].slug === slug
    ) as "bioactive" | "fish" | undefined;

    if (!productKey) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-alabaster">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-serif text-charcoal">Product Not Found</h1>
                    <Link href="/#shop" className="text-gold-end hover:underline block">Return to Shop</Link>
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

            {/* Breadcrumb */}
            <nav className="pt-32 pb-8 px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-charcoal/40 font-medium tracking-wide">
                    <Link href="/" className="hover:text-gold-end transition-colors uppercase">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/#shop" className="hover:text-gold-end transition-colors uppercase">{t.nav.shop}</Link>
                    <ChevronRight size={14} />
                    <span className="text-charcoal uppercase">{product.name}</span>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start pb-24">
                {/* Visuals - Sticky Column */}
                <div className="lg:sticky lg:top-32 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative aspect-[4/5] bg-alabaster rounded-3xl overflow-hidden flex items-center justify-center p-12 group"
                    >
                        <Image
                            src={imagePath}
                            alt={product.name}
                            fill
                            className="object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
                            priority
                        />

                        {/* Status Badges */}
                        <div className="absolute top-8 left-8 flex flex-col gap-3 z-10">
                            {product.saleLabel && (
                                <span className="bg-rose-500 text-white px-5 py-2 rounded-2xl text-[13px] font-bold shadow-xl border border-white/10 uppercase tracking-tighter">
                                    {product.saleLabel}
                                </span>
                            )}
                            <span className="bg-white/90 backdrop-blur-md text-gold-end px-5 py-2 rounded-2xl text-[11px] font-bold shadow-lg uppercase tracking-widest border border-gold-start/20">
                                {t.products.signature}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-1 group cursor-default">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="text-gold-start fill-gold-start" />
                            ))}
                            <span className="text-sm text-charcoal/40 ml-2 font-serif italic">Verified Excellence</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-serif text-charcoal leading-[1.1]">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline gap-6 border-b border-alabaster pb-10">
                            <span className="text-5xl font-bold text-charcoal tracking-tight">{product.price}</span>
                            {product.oldPrice && (
                                <span className="text-2xl text-charcoal/20 line-through font-light">{product.oldPrice}</span>
                            )}
                        </div>

                        <p className="text-xl text-charcoal/70 leading-relaxed font-light">
                            {product.description}
                        </p>

                        <div className="space-y-4 pt-4">
                            <Button
                                onClick={handleAddToCart}
                                className="w-full h-20 bg-[#DE9D9D] hover:bg-[#CC8A8A] text-white text-lg uppercase tracking-[0.3em] font-bold shadow-2xl shadow-rose-200/50 rounded-3xl transition-all duration-500 overflow-hidden relative group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <ShoppingCart size={24} />
                                    {t.products.add_to_cart}
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Button>

                            <div className="flex items-center justify-center gap-6 text-xs text-charcoal/40 uppercase tracking-widest pt-4">
                                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-gold-start" /> Pharmaceutical Grade</span>
                                <span className="flex items-center gap-2"><Droplets size={14} className="text-gold-start" /> Absolute Purity</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Scientific Blueprint */}
                    <div className="space-y-8 pt-12 border-t border-alabaster">
                        <div className="space-y-2">
                            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gold-end">Scientific Blueprint</h2>
                            <p className="text-3xl font-serif text-charcoal">Molecular Components</p>
                        </div>

                        <div className="grid gap-6">
                            {(product as any).ingredients.map((ing: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-alabaster/50 p-6 rounded-2xl border border-alabaster hover:border-gold-start/20 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-xl shadow-sm group-hover:bg-gold-gradient group-hover:text-white transition-colors duration-500">
                                            {idx === 0 ? <Dna size={20} /> : idx === 1 ? <Droplets size={20} /> : idx === 2 ? <FlaskConical size={20} /> : <Zap size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-charcoal uppercase tracking-tighter mb-1">{ing.name}</h4>
                                            <p className="text-charcoal/50 text-sm leading-relaxed">{ing.detail}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Width Long Description */}
            <section className="bg-charcoal py-32 text-white overflow-hidden relative">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                    <FlaskConical size={800} strokeWidth={0.5} />
                </div>

                <div className="px-6 max-w-4xl mx-auto text-center space-y-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gold-start">The Molecular Philosophy</h2>
                        <p className="text-3xl lg:text-5xl font-serif leading-tight">
                            "{product.longDescription}"
                        </p>
                        <div className="flex items-center justify-center gap-8 pt-6">
                            {(Object.entries((product as any).specs) as [string, string][]).map(([key, val], idx) => (
                                <div key={idx} className="text-center">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">{key}</p>
                                    <p className="text-lg font-serif italic text-gold-start">{val}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Ritual Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gold-end">{t.ritual.subtitle}</h2>
                        <h3 className="text-5xl font-serif text-charcoal">{t.nav.ritual}</h3>
                        <p className="text-xl text-charcoal/60 leading-relaxed font-light italic">
                            {t.ritual.description}
                        </p>

                        <div className="space-y-12 pt-8">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex gap-8 group">
                                    <div className="text-5xl font-serif text-alabaster group-hover:text-gold-start transition-colors duration-500">0{step}</div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-bold uppercase tracking-tighter text-charcoal">
                                            {(t.ritual as any)[`step${step}`].title}
                                        </h4>
                                        <p className="text-charcoal/50 leading-relaxed">
                                            {(t.ritual as any)[`step${step}`].desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative aspect-square order-1 lg:order-2">
                        <div className="absolute inset-0 bg-gold-gradient rounded-full blur-[120px] opacity-20 animate-pulse" />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="relative h-full w-full flex items-center justify-center"
                        >
                            <Image
                                src={imagePath}
                                alt="Ritual visual"
                                width={600}
                                height={600}
                                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Back Button */}
            <div className="pb-32 px-6 flex justify-center">
                <Link href="/#shop">
                    <Button variant="outline" className="h-14 px-10 rounded-full border-alabaster text-charcoal/40 uppercase tracking-widest text-xs hover:border-gold-start hover:text-gold-end transition-all">
                        <ArrowLeft size={14} className="mr-2" /> Back to Collection
                    </Button>
                </Link>
            </div>

            <Footer />
        </main>
    );
}
