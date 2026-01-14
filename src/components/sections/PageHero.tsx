"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
    title: string;
    subtitle?: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
    return (
        <section className="pt-40 pb-20 md:pt-48 md:pb-32 bg-alabaster/30 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-gold-start/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-gold-end/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-charcoal mb-6 tracking-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm md:text-base font-sans uppercase tracking-[0.3em] text-gold-end font-bold">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default PageHero;
