"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/context/translation-context";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
    id: string;
    name: string;
    price: string;
    oldPrice?: string;
    saleLabel?: string;
    rating: number;
    image: string;
    backImage?: string;
    info: string;
    isLimited?: boolean;
}

const ProductCard = ({ id, name, price, oldPrice, saleLabel, rating, image, backImage, info, isLimited }: ProductCardProps) => {
    const { t } = useTranslation();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const numericPrice = parseFloat(price.replace(/[^\d.,]/g, "").replace(",", "."));

        addToCart({
            id,
            name,
            price,
            numericPrice,
            image,
            quantity: 1,
            info
        });

        toast.success(`${name} ${t.toast.added}`, {
            description: t.toast.desc,
            style: {
                background: "#FFFFFF",
                color: "#1A1A1A",
                border: "1px solid #D4AF37",
            },
        });
    };

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="group relative h-full"
        >
            {/* Animated Gold Border Overlay */}
            <div className="absolute inset-0 bg-gold-gradient rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-[1px] blur-[1px] -z-10" />

            <Card className="bg-white border-none shadow-lg rounded-xl overflow-hidden z-10 h-full flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                    <Link href={`/products/${id}`} className="relative aspect-square bg-alabaster flex items-center justify-center p-8 overflow-hidden cursor-pointer">
                        {/* Front Image */}
                        <Image
                            src={image}
                            alt={name}
                            width={400}
                            height={400}
                            className={`w-full h-auto drop-shadow-xl transition-all duration-700 ${backImage ? "group-hover:opacity-0 group-hover:scale-110" : "group-hover:scale-110"}`}
                        />

                        {/* Back Image (Optional) */}
                        {backImage && (
                            <Image
                                src={backImage}
                                alt={`${name} info`}
                                width={400}
                                height={400}
                                className="w-full h-auto drop-shadow-xl absolute inset-0 p-8 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                        )}

                        {/* Sale Label */}
                        {saleLabel && (
                            <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-md px-5 py-2 rounded-[1.2rem] text-[13px] font-bold tracking-tight text-white shadow-xl border border-white/10 z-20">
                                {saleLabel}
                            </div>
                        )}

                        {!saleLabel && (
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-gold-end shadow-sm">
                                {t.products.signature}
                            </div>
                        )}

                        {isLimited && (
                            <div className="absolute top-4 right-4 bg-gold-gradient px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white shadow-md">
                                {t.products.limited}
                            </div>
                        )}
                    </Link>

                    <div className="p-8 space-y-6 flex flex-col flex-grow text-center">
                        <div className="space-y-3">
                            <Link href={`/products/${id}`}>
                                <h3 className="text-2xl md:text-3xl font-serif text-charcoal leading-tight px-2 hover:text-gold-end transition-colors cursor-pointer">{name}</h3>
                            </Link>
                            <div className="flex items-center justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={`${i < rating ? "text-gold-start fill-gold-start" : "text-gray-200"
                                            }`}
                                    />
                                ))}
                                <span className="text-sm text-charcoal/40 ml-2 font-medium">{rating.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-alabaster">
                            <div className="flex flex-col items-center justify-center mb-8 gap-1">
                                <div className="flex items-center gap-4">
                                    {oldPrice && (
                                        <span className="text-xl text-charcoal/20 line-through font-light">{oldPrice}</span>
                                    )}
                                    <span className="text-4xl font-bold text-charcoal tracking-tight">{price}</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                className="w-full h-16 bg-[#DE9D9D] hover:bg-[#D48A8A] text-white text-base uppercase tracking-[0.2em] font-bold shadow-2xl shadow-rose-200/40 rounded-[2rem] transition-all duration-500 group/btn"
                            >
                                <ShoppingCart size={20} className="mr-3 group-hover/btn:scale-110 transition-transform" />
                                {t.products.add_to_cart}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
