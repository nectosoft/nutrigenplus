"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/translation-context";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error(t.auth.login_error);
            } else {
                toast.success(t.auth.login_success);
                router.push("/admin/orders");
            }
        } catch (error) {
            toast.error(t.contact.error_generic);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-40 pb-24 container mx-auto px-6 h-[80vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full space-y-8 bg-white p-12 rounded-[3rem] border border-charcoal/5 shadow-2xl shadow-charcoal/5 relative overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-start/5 blur-[80px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold-end/5 blur-[80px] rounded-full" />

                    <div className="text-center space-y-4 relative z-10">
                        <div className="w-20 h-20 bg-gold-gradient rounded-3xl flex items-center justify-center mx-auto shadow-xl transform -rotate-12">
                            <Lock className="text-white w-10 h-10" />
                        </div>
                        <h1 className="text-4xl font-serif text-charcoal tracking-tight">{t.auth.vault_access}</h1>
                        <p className="text-charcoal/40 font-serif italic">
                            {t.auth.login_desc}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 group-focus-within:text-gold-end transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder={t.auth.username}
                                    className="w-full h-14 pl-12 pr-6 bg-alabaster/30 border border-charcoal/5 rounded-2xl outline-none focus:border-gold-end/50 focus:bg-white transition-all text-sm font-medium"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 group-focus-within:text-gold-end transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder={t.auth.password}
                                    className="w-full h-14 pl-12 pr-6 bg-alabaster/30 border border-charcoal/5 rounded-2xl outline-none focus:border-gold-end/50 focus:bg-white transition-all text-sm font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-charcoal text-white rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all group disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    {t.auth.verify_button}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
