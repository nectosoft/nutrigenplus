"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/context/translation-context";
import { Leaf, ShieldCheck, Recycle } from "lucide-react";

export default function SustainabilitySection() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const cards = [
        {
            icon: <Leaf className="w-8 h-8 text-[#DE9D9D]" />,
            title: t.sustainability.ethos_title,
            desc: t.sustainability.ethos_desc,
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#DE9D9D]" />,
            title: t.sustainability.purity_title,
            desc: t.sustainability.purity_desc,
        },
        {
            icon: <Recycle className="w-8 h-8 text-[#DE9D9D]" />,
            title: t.sustainability.footprint_title,
            desc: t.sustainability.footprint_desc,
        },
    ];

    return (
        <section
            ref={containerRef}
            className="relative py-24 overflow-hidden bg-[#faf9f6]"
            id="sustainability"
        >
            {/* Background Decorative Elements */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-0 right-0 w-96 h-96 bg-[#DE9D9D]/5 rounded-full blur-3xl -z-10"
            />
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
                className="absolute bottom-0 left-0 w-80 h-80 bg-rose-400/5 rounded-full blur-3xl -z-10"
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    style={{ opacity }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h3 className="text-[#DE9D9D] tracking-[0.3em] text-sm font-medium mb-4">
                        {t.sustainability.subtitle}
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-8">
                        {t.sustainability.title}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="group p-8 bg-white/50 backdrop-blur-sm border border-black/5 hover:border-[#DE9D9D]/30 transition-all duration-500 rounded-2xl"
                        >
                            <div className="mb-6 p-4 bg-white shadow-sm rounded-xl w-fit group-hover:scale-110 transition-transform duration-500">
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-serif text-[#1a1a1a] mb-4 group-hover:text-[#DE9D9D] transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed font-light">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Brand Quote */}
                <div className="container mx-auto px-6 mt-40 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold-start/40 to-transparent -translate-y-full mb-12" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-10"
                    >
                        <p className="text-2xl md:text-4xl font-serif text-charcoal/60 italic max-w-4xl mx-auto leading-relaxed">
                            {t.sustainability.quote}
                        </p>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-px bg-gold-start/20" />
                            <span className="text-[10px] uppercase tracking-[0.6em] text-gold-end font-bold">The NutriGen+ Ethos</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
