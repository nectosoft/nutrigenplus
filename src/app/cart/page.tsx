"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTranslation } from "@/context/translation-context";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CartPage = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();
    const { t } = useTranslation();

    const formatCurrency = (amount: number) => {
        if (cart.length === 0) return "";
        return cart[0].price.replace(/[\d.,]+/, amount.toFixed(2));
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6">
                <Link
                    href="/#shop"
                    className="flex items-center gap-2 text-charcoal/40 hover:text-gold-end transition-colors mb-12 group w-fit"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-medium">{t.cart.continue}</span>
                </Link>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-10">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-serif text-charcoal">{t.cart.title}</h1>
                            <div className="h-1 w-20 bg-gold-gradient" />
                        </div>

                        {cart.length === 0 ? (
                            <div className="py-20 text-center space-y-6 bg-alabaster/30 rounded-3xl border border-dashed border-gold-start/20">
                                <ShoppingBag className="w-16 h-16 mx-auto text-gold-mid/20" />
                                <p className="text-xl font-serif text-charcoal/40 italic">{t.cart.empty}</p>
                                <Button asChild className="bg-gold-gradient text-white">
                                    <Link href="/#shop">{t.cart.continue}</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {cart.map((item) => {
                                    const productKey = item.id.split('-')[0] as keyof typeof t.products.items;
                                    const translatedProduct = (t.products.items as any)[productKey];
                                    const displayName = translatedProduct?.name || item.name;
                                    const displayInfo = translatedProduct?.info || item.info;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col md:flex-row gap-8 pb-8 border-b border-alabaster group"
                                        >
                                            <div className="relative w-full md:w-48 aspect-square bg-alabaster rounded-2xl overflow-hidden p-6">
                                                <Image
                                                    src={item.image}
                                                    alt={displayName}
                                                    fill
                                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="flex-grow space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <h3 className="text-2xl font-serif text-charcoal">{displayName}</h3>
                                                        <p className="text-xs text-charcoal/40 uppercase tracking-[0.2em]">{displayInfo}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-2 text-charcoal/20 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>

                                                <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                                                    <div className="flex items-center gap-6 bg-alabaster/50 px-6 py-3 rounded-full border border-alabaster">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="hover:text-gold-end transition-colors"
                                                        >
                                                            <Minus size={18} />
                                                        </button>
                                                        <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="hover:text-gold-end transition-colors"
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-sm text-charcoal/40 mb-1">{t.cart.item}</p>
                                                        <p className="text-2xl font-bold text-charcoal">
                                                            {formatCurrency(item.numericPrice * item.quantity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    {cart.length > 0 && (
                        <div className="lg:w-1/3">
                            <div className="sticky top-32 bg-alabaster p-8 rounded-3xl space-y-8 border border-gold-start/10 shadow-xl shadow-gold-start/5">
                                <h2 className="text-2xl font-serif text-charcoal border-b border-gold-start/10 pb-4">
                                    {t.cart.summary}
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-charcoal/60">
                                        <span>{t.cart.subtotal}</span>
                                        <span className="font-medium text-charcoal">{formatCurrency(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-charcoal/60">
                                        <span>{t.cart.shipping}</span>
                                        <span className="text-charcoal/40 font-medium italic">{t.cart.free}</span>
                                    </div>
                                    <div className="pt-4 border-t border-gold-start/10 flex justify-between items-end">
                                        <span className="text-xl font-serif text-charcoal">{t.cart.total}</span>
                                        <span className="text-3xl font-bold text-gold-gradient">
                                            {formatCurrency(cartTotal)}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    asChild
                                    className="w-full h-14 bg-gold-gradient text-white text-xs uppercase tracking-[0.3em] font-bold shadow-lg shadow-gold-end/20 hover:scale-[1.02] transition-transform"
                                >
                                    <Link href="/checkout">
                                        {t.cart.checkout}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-charcoal/40">
                                        <div className="w-1.5 h-1.5 bg-gold-end rounded-full animate-pulse" />
                                        {t.common.secure_payment}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-charcoal/40">
                                        <div className="w-1.5 h-1.5 bg-gold-end rounded-full animate-pulse" />
                                        {t.common.fast_delivery}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default CartPage;
