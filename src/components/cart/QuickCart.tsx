"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTranslation } from "@/context/translation-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const QuickCart = () => {
    const {
        cart,
        isCartOpen,
        setCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount
    } = useCart();
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-alabaster flex items-center justify-between bg-alabaster/30">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-gold-end" />
                                <h2 className="text-xl font-serif text-charcoal">{t.cart.title}</h2>
                                <span className="bg-gold-gradient text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    {cartCount}
                                </span>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-gold-start/10 rounded-full transition-colors group"
                            >
                                <X className="w-5 h-5 text-charcoal/40 group-hover:text-gold-end" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                                    <ShoppingBag className="w-12 h-12" />
                                    <p className="font-serif italic">{t.cart.empty}</p>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {cart.map((item) => {
                                        const productKey = item.id.split('-')[0] as keyof typeof t.products.items;
                                        const translatedProduct = (t.products.items as any)[productKey];
                                        const displayName = translatedProduct?.name || item.name;
                                        const displayInfo = translatedProduct?.info || item.info;

                                        return (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="flex items-center gap-4 py-4 border-b border-alabaster last:border-none group"
                                            >
                                                <div className="relative w-20 h-20 bg-alabaster rounded-xl flex-shrink-0 overflow-hidden group-hover:bg-gold-start/5 transition-colors">
                                                    <Image src={item.image} alt={displayName} fill className="object-contain p-2" />
                                                </div>

                                                <div className="flex-grow min-w-0">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="text-xs font-serif text-charcoal truncate">{displayName}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-charcoal/20 hover:text-red-500 transition-colors ml-2"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-[8px] text-charcoal/40 uppercase tracking-widest leading-tight line-clamp-1">{displayInfo}</p>

                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-3 bg-alabaster/40 rounded-full px-3 py-1 border border-alabaster">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="p-1 hover:text-gold-end transition-colors"
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="p-1 hover:text-gold-end transition-colors"
                                                            >
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                        <span className="font-bold text-sm text-gold-end">
                                                            {item.price.replace(/[\d.,]+/, (m) => (parseFloat(m.replace(',', '.')) * item.quantity).toFixed(2))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {
                            cart.length > 0 && (
                                <div className="p-6 border-t border-alabaster space-y-4 bg-alabaster/10">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-charcoal/60">
                                            <span>{t.cart.subtotal}</span>
                                            <span>{cart[0].price.replace(/[\d.,]+/, cartTotal.toFixed(2))}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-charcoal/60">
                                            <span>{t.cart.shipping}</span>
                                            <span className="text-gold-end italic">{t.cart.free}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-serif text-charcoal pt-2 border-t border-alabaster">
                                            <span>{t.cart.total}</span>
                                            <span className="text-gold-gradient font-bold">
                                                {cart[0].price.replace(/[\d.,]+/, cartTotal.toFixed(2))}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <Button
                                            asChild
                                            className="w-full bg-gold-gradient text-white h-12 text-xs uppercase tracking-[0.2em] font-bold hover:scale-[1.02] transition-transform"
                                            onClick={() => setCartOpen(false)}
                                        >
                                            <Link href="/cart">
                                                {t.cart.checkout}
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                        <button
                                            onClick={() => setCartOpen(false)}
                                            className="w-full text-center text-[10px] uppercase tracking-widest text-charcoal/40 hover:text-gold-end transition-colors py-2"
                                        >
                                            {t.cart.continue}
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </motion.div >
                </>
            )}
        </AnimatePresence >
    );
};

export default QuickCart;
