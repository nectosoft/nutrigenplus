"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import { useTranslation } from "@/context/translation-context";
import { motion } from "framer-motion";

const TermsPage = () => {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <PageHero
                title={t.legal.terms.title}
                subtitle={t.legal.terms.last_updated}
            />

            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-lg prose-charcoal prose-serif max-w-none"
                    >
                        {t.legal.terms.content.map((section: any, idx: number) => (
                            <div key={idx} className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-8">{section.heading}</h2>
                                <p className="text-charcoal/60 leading-relaxed mb-6 font-sans">
                                    {section.text}
                                </p>
                                {section.items && (
                                    <ul className="space-y-4">
                                        {section.items.map((item: string, i: number) => (
                                            <li key={i} className="flex gap-4">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold-end mt-2 flex-shrink-0" />
                                                <span className="text-charcoal/70 font-sans">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default TermsPage;
