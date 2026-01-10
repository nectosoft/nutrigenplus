"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck, Truck } from "lucide-react";
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
                    {/* Checkout Form */}
                    <div className="lg:w-3/5 space-y-12">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-serif text-charcoal">{t.checkout.title}</h1>
                            <div className="h-1 w-20 bg-gold-gradient" />
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-xl font-serif text-charcoal flex items-center gap-3">
                                    <Truck className="w-5 h-5 text-gold-end" />
                                    {t.checkout.shipping_address}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">{t.checkout.full_name}</label>
                                        <Input required placeholder={t.checkout.placeholder_name} className="h-12 border-alabaster bg-alabaster/20 focus:border-gold-start transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">{t.checkout.email}</label>
                                        <Input required type="email" placeholder={t.checkout.placeholder_email} className="h-12 border-alabaster bg-alabaster/20 focus:border-gold-start transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">{t.checkout.phone}</label>
                                        <Input required placeholder={t.checkout.placeholder_phone} className="h-12 border-alabaster bg-alabaster/20 focus:border-gold-start transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">{t.checkout.country}</label>
                                        <Input required placeholder={t.checkout.placeholder_country} className="h-12 border-alabaster bg-alabaster/20 focus:border-gold-start transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">{t.checkout.city}</label>
                                        <Input required placeholder={t.checkout.placeholder_city} className="h-12 border-alabaster bg-alabaster/20 focus:border-gold-start transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">{t.checkout.postal_code}</label>
                                        <Input required placeholder={t.checkout.placeholder_postal} className="h-12 border-alabaster bg-alabaster/20 focus:border-gold-start transition-all" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold ml-1">{t.checkout.address}</label>
                                        <Input required placeholder={t.checkout.placeholder_address} className="h-12 border-alabaster bg-alabaster/20 focus:border-gold-start transition-all" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-serif text-charcoal flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-gold-end" />
                                    {t.checkout.payment_method}
                                </h3>
                                <div className="p-6 bg-alabaster/40 rounded-3xl border border-gold-start/10 flex items-center justify-between group cursor-default">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-charcoal rounded flex items-center justify-center">
                                            <div className="w-6 h-4 border border-white/20 rounded-sm" />
                                        </div>
                                        <span className="text-sm font-medium text-charcoal/60 italic font-serif">{t.checkout.payment_stripe}</span>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border-2 border-gold-end flex items-center justify-center p-1">
                                        <div className="w-full h-full bg-gold-gradient rounded-full" />
                                    </div>
                                </div>
                            </div>

                            <PurchaseRitualButton
                                className="w-full"
                                text={t.checkout.place_order}
                                disabled={cart.length === 0}
                            />
                        </div>
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
