"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";
import { Button } from "@/components/ui/button";

import { useTranslation } from "@/context/translation-context";
import { useCart } from "@/context/cart-context";

interface PurchaseRitualButtonProps {
    className?: string;
    text?: string;
    disabled?: boolean;
}

const PurchaseRitualButton = ({ className, text, disabled }: PurchaseRitualButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { cart } = useCart();
    const { t } = useTranslation();

    const displayDescription = text || t.common.begin_ritual;

    const handlePurchase = async () => {
        if (cart.length === 0) {
            toast.error(t.cart.empty || "Cart is empty");
            return;
        }

        setIsLoading(true);
        console.log("[Checkout] Initiating payment for items:", cart.length);

        try {
            await createCheckoutSession(cart);
            // If redirect happens, the page will change
        } catch (error: any) {
            console.error("Payment initiation failed:", error);
            const errorMessage = error.message || "Payment service unavailable";

            // Only toast if it's not a redirect (which Next.js handles)
            if (!error.message?.includes('NEXT_REDIRECT')) {
                toast.error(errorMessage);
                setIsLoading(false);
            }
        }
    };

    return (
        <Button
            onClick={handlePurchase}
            disabled={isLoading || disabled}
            className={`
                relative h-16 px-10 overflow-hidden
                bg-gold-gradient text-white 
                font-serif text-sm uppercase tracking-[0.3em] font-bold
                shadow-xl shadow-gold-end/20 
                hover:scale-[1.02] active:scale-[0.98] 
                transition-all duration-300
                group
                ${className || ""}
            `}
        >
            <motion.div
                initial={false}
                animate={{ opacity: isLoading ? 0 : 1 }}
                className="flex items-center gap-3"
            >
                <Sparkles className="w-4 h-4 text-white/80 group-hover:rotate-12 transition-transform" />
                <span>{displayDescription}</span>
            </motion.div>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gold-gradient">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Loader2 className="w-6 h-6 text-white" />
                    </motion.div>
                </div>
            )}

            {/* Subtle light sweep animation on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            </div>
        </Button>
    );
};

export default PurchaseRitualButton;
