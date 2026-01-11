"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTranslation } from "@/context/translation-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PurchaseRitualButton from "@/components/checkout/PurchaseRitualButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

const CheckoutContent = () => {
    const {
        cart,
        cartTotal,
        clearCart
    } = useCart();
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get("success") === "true") {
            setIsSuccess(true);
            clearCart();
        }
    }, [searchParams, clearCart]);

    const formatCurrency = (amount: number) => {
        if (cart.length === 0 && !isSuccess) return "";
        const priceStr = cart.length > 0 ? cart[0].price : "$0.00";
        return priceStr.replace(/[\d.,]+/, amount.toFixed(2));
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-40 pb-24 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto space-y-8 bg-alabaster/30 p-12 rounded-[3rem] border border-gold-start/10"
                    >
                        <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center mx-auto shadow-xl shadow-gold-end/20">
                            <CheckCircle2 className="text-white w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl font-serif text-charcoal">{t.checkout.success_title}</h1>
                            <p className="text-xl text-charcoal/60 leading-relaxed font-serif italic">
                                {t.checkout.success_desc}
                            </p>
                        </div>
                        <div className="h-px w-24 bg-gold-gradient mx-auto" />
                        <Button asChild className="bg-gold-gradient text-white h-14 px-12 text-sm uppercase tracking-widest font-bold">
                            <Link href="/">
                                {t.checkout.back_home}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 h-1 bg-gold-gradient animate-in slide-in-from-left duration-[5000ms]" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6">
                <Link
                    href="/cart"
                    className="flex items-center gap-2 text-charcoal/40 hover:text-gold-end transition-colors mb-12 group w-fit"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-medium">{t.common.back_to_cart}</span>
                </Link>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Checkout Journey Visualization */}
                    <div className="lg:w-3/5 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h1 className="text-5xl md:text-6xl font-serif text-charcoal tracking-tight">
                                {t.checkout.title}
                            </h1>
                            <div className="h-[0.5px] w-40 bg-gold-gradient" />
                            <p className="text-xl text-charcoal/40 font-serif italic max-w-xl leading-relaxed">
                                Your commitment to biological integrity begins here. A new chapter of structural harmony and timeless radiance awaits.
                            </p>
                        </motion.div>

                        <div className="relative group">
                            {/* Decorative Background for the message */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold-start/20 via-gold-end/10 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative bg-white/40 backdrop-blur-3xl border border-gold-start/10 p-12 md:p-16 rounded-[3rem] overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8">
                                    <Sparkles className="w-12 h-12 text-gold-end/10" />
                                </div>

                                <div className="space-y-10 relative z-10">
                                    <div className="space-y-4">
                                        <h3 className="text-gold-end font-bold tracking-[0.4em] text-[10px] uppercase">
                                            The Longevity Journey
                                        </h3>
                                        <h2 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
                                            Prepare your ritual.
                                        </h2>
                                    </div>

                                    <div className="space-y-6 text-charcoal/60 text-lg leading-relaxed font-light italic border-l-[0.5px] border-gold-start/30 pl-8">
                                        <p>
                                            In the next step, you will be directed to our secure molecular treasury (Stripe) to finalize your acquisition.
                                        </p>
                                        <p>
                                            There, you can provide your shipping details and preferred payment method in one seamless, encrypted environment.
                                        </p>
                                    </div>

                                    <div className="pt-8">
                                        <PurchaseRitualButton
                                            className="w-full md:w-auto min-w-[300px]"
                                            text={t.checkout.place_order}
                                            disabled={cart.length === 0}
                                        />
                                    </div>

                                    <div className="flex items-center gap-8 pt-8 opacity-40">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold">Encrypted</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold">Complimentary Shipping</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Subtle floating detail */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center gap-4 text-charcoal/30 justify-center lg:justify-start"
                        >
                            <div className="h-[1px] w-12 bg-charcoal/10" />
                            <span className="text-[9px] uppercase tracking-[0.5em] font-medium italic">
                                Crafted with precision in Bulgaria
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Summary */}
                    <div className="lg:w-2/5">
                        <div className="sticky top-32 bg-charcoal text-white p-10 rounded-[2.5rem] space-y-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-gradient/10 blur-[60px] rounded-full" />

                            <h2 className="text-2xl font-serif border-b border-white/10 pb-6">
                                {t.cart.summary}
                            </h2>

                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-white/5 rounded-xl flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-medium text-alabaster">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-white/40">{t.cart.quantity}: {item.quantity}</span>
                                                <span className="text-sm font-bold text-gold-mid">
                                                    {formatCurrency(item.numericPrice * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="flex justify-between text-sm text-white/40">
                                    <span>{t.cart.subtotal}</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-white/40">
                                    <span>{t.cart.shipping}</span>
                                    <span className="text-gold-mid italic uppercase tracking-widest text-[10px]">{t.cart.free}</span>
                                </div>
                                <div className="pt-6 flex justify-between items-end">
                                    <span className="text-xl font-serif">{t.cart.total}</span>
                                    <span className="text-3xl font-bold text-gold-gradient">
                                        {formatCurrency(cartTotal)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                <ShieldCheck className="w-6 h-6 text-gold-mid" />
                                <div className="space-y-0.5">
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/80">{t.checkout.security_title}</p>
                                    <p className="text-[10px] text-white/40 italic">{t.checkout.security_desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

const CheckoutPage = () => {
    const { t } = useTranslation();
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-serif text-charcoal italic animate-pulse text-2xl">{t.checkout.processing}</div>}>
            <CheckoutContent />
        </Suspense>
    );
}

export default CheckoutPage;
