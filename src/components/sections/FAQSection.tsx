"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/context/translation-context";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const FAQItem = ({ number, question, answer, isOpen, onClick }: { number: string, question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
    <div className={`group transition-all duration-700 ${isOpen ? "bg-alabaster pb-12" : "bg-white"}`}>
        <button
            onClick={onClick}
            className="w-full container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left border-t border-black/[0.03]"
        >
            <span className="md:col-span-1 text-[9px] font-bold tracking-[0.4em] text-gold-end italic opacity-40">
                {number}
            </span>
            <div className="md:col-span-10 space-y-8">
                <h3 className={`text-xl md:text-2xl font-serif leading-tight transition-all duration-500 ${isOpen ? "text-charcoal pr-12" : "text-gray-400 group-hover:text-charcoal group-hover:pl-4"}`}>
                    {question}
                </h3>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <p className="text-base text-gray-500 font-light leading-relaxed max-w-2xl border-l border-gold-start/20 pl-8 italic">
                                {answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="md:col-span-1 flex justify-end pt-1">
                <div className={`w-8 h-8 rounded-full border border-black/5 flex items-center justify-center transition-all duration-700 ${isOpen ? "bg-charcoal border-charcoal rotate-45" : "group-hover:bg-alabaster group-hover:border-transparent"}`}>
                    <ArrowUpRight className={`w-3 h-3 transition-colors ${isOpen ? "text-white" : "text-gray-300 group-hover:text-charcoal"}`} />
                </div>
            </div>
        </button>
    </div>
);

const FAQSection = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    const questions = [
        { q: t.faq.q1.q, a: t.faq.q1.a },
        { q: t.faq.q2.q, a: t.faq.q2.a },
        { q: t.faq.q3.q, a: t.faq.q3.a },
        { q: t.faq.q4.q, a: t.faq.q4.a },
        { q: t.faq.q5.q, a: t.faq.q5.a },
        { q: t.faq.q6.q, a: t.faq.q6.a },
        { q: t.faq.q7.q, a: t.faq.q7.a },
    ];

    return (
        <section id="faq" className="py-40 bg-white">
            <div className="container mx-auto px-6 mb-24">
                <div className="max-w-3xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-px w-10 bg-[#DE9D9D]" />
                        <span className="text-[#DE9D9D] font-bold tracking-[0.4em] text-[10px] uppercase">
                            {t.faq.subtitle}
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5, margin: "-100px" }}
                        className="text-5xl md:text-7xl font-serif text-charcoal"
                    >
                        {t.faq.title}
                    </motion.h2>
                </div>
            </div>

            <div className="border-t border-black/5">
                {questions.map((item, index) => (
                    <FAQItem
                        key={index}
                        number={`0${index + 1}`}
                        question={item.q}
                        answer={item.a}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>

        </section>
    );
};

export default FAQSection;

