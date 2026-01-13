"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/translation-context";
import { Mail, MapPin, Send, Phone, ShieldCheck, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection() {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("access_key", "f26de63d-4673-47f3-8f07-14c8855c5b51");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success(t.contact.success);
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error(t.contact.error_generic);
            }
        } catch (error) {
            toast.error(t.contact.error_connection);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden" id="contact">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h3 className="text-gold-end tracking-[0.4em] text-[10px] font-bold uppercase italic opacity-60">
                                {t.contact.subtitle}
                            </h3>
                            <h2 className="text-4xl md:text-5xl font-serif text-charcoal leading-tight">
                                {t.contact.title}
                            </h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md italic">
                                {t.contact.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-10 bg-white rounded-3xl border border-gold-start/10 shadow-sm hover:shadow-xl transition-all duration-500 group"
                            >
                                <div className="w-12 h-12 bg-alabaster rounded-2xl flex items-center justify-center mb-8 text-gold-end group-hover:bg-gold-gradient group-hover:text-white transition-all duration-500 shadow-inner">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal mb-4">{t.contact.concierge}</h3>
                                <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6">
                                    {t.contact.concierge_desc}
                                </p>
                                <div className="text-[10px] text-gold-end font-bold border-b border-gold-start/20 inline-block cursor-pointer hover:border-gold-start transition-colors">
                                    {t.contact.office_email}
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-10 bg-charcoal rounded-3xl border border-white/5 shadow-2xl transition-all duration-500 group"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-gold-start group-hover:bg-gold-gradient group-hover:text-white transition-all duration-500 shadow-inner">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">{t.contact.priority_support}</h3>
                                <p className="text-[11px] text-white/40 font-medium leading-relaxed mb-6 italic">
                                    {t.contact.support_time}
                                </p>
                                <div className="text-[10px] text-gold-start font-bold border-b border-gold-start/20 inline-block cursor-pointer hover:border-gold-start transition-colors">
                                    {t.contact.phone}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-12 bg-alabaster rounded-3xl border border-black/[0.03] shadow-inner relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold ml-1">
                                    {t.contact.name}
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    className="w-full bg-white border border-black/[0.03] rounded-xl px-6 py-5 focus:ring-1 focus:ring-gold-start focus:border-gold-start outline-none transition-all font-light text-sm shadow-sm"
                                    placeholder={t.checkout.placeholder_name}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold ml-1">
                                    {t.contact.email}
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    className="w-full bg-white border border-black/[0.03] rounded-xl px-6 py-5 focus:ring-1 focus:ring-gold-start focus:border-gold-start outline-none transition-all font-light text-sm shadow-sm"
                                    placeholder={t.checkout.placeholder_email}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold ml-1">
                                    {t.contact.message}
                                </label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    className="w-full bg-white border border-black/[0.03] rounded-xl px-6 py-5 focus:ring-1 focus:ring-gold-start focus:border-gold-start outline-none transition-all font-light text-sm shadow-sm resize-none"
                                    placeholder="..."
                                />
                            </div>

                            <button
                                disabled={isSubmitting}
                                className="w-full bg-charcoal hover:bg-black text-white py-6 rounded-xl font-bold tracking-[0.4em] uppercase text-[10px] transition-all duration-700 flex items-center justify-center gap-4 disabled:opacity-70 group shadow-lg"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>{t.contact.send}</span>
                                        <div className="w-px h-3 bg-white/20" />
                                        <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-40 group-hover:opacity-100" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
