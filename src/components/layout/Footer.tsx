"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Instagram, Facebook, Phone, MapPin, ShieldCheck, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/translation-context";
import { useSession } from "next-auth/react";

// Custom TikTok Icon
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const Footer = () => {
    const { t } = useTranslation();
    const { data: session } = useSession();

    const socialLinks = [
        { icon: <Instagram size={18} />, href: `https://instagram.com/${t.contact.socials.instagram}`, label: "Instagram" },
        { icon: <Facebook size={18} />, href: `https://facebook.com/${t.contact.socials.facebook}`, label: "Facebook" },
        { icon: <TikTokIcon size={18} />, href: `https://tiktok.com/@${t.contact.socials.tiktok}`, label: "TikTok" },
    ];

    return (
        <footer className="bg-[#1a1a1a] text-alabaster pt-16 md:pt-24 pb-12 overflow-hidden relative">
            {/* Background Grain/Noise or subtle gradient */}
            <div className="absolute inset-0 pointer-events-none noise-overlay" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-20">

                    {/* Column 1: Brand Identity */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <div className="relative h-12 w-40">
                                <Image
                                    src="/logo.png"
                                    alt="NutriGen+"
                                    fill
                                    className="object-contain brightness-0 invert"
                                    priority
                                />
                            </div>
                        </Link>
                        <p className="text-alabaster/50 text-sm leading-relaxed max-w-sm font-light">
                            {t.footer.brand_desc}
                        </p>
                        <div className="flex gap-5">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#DE9D9D] hover:border-[#DE9D9D] hover:text-white transition-all duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Navigation (Debloated) */}
                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-xs uppercase tracking-[0.3em] text-[#DE9D9D] font-medium">{t.footer.explore}</h4>
                        <ul className="space-y-4 text-sm text-alabaster/60 font-light">
                            <li><Link href="#products" className="hover:text-white transition-colors">{t.nav.shop}</Link></li>
                            <li><Link href="#science" className="hover:text-white transition-colors">{t.nav.science}</Link></li>
                            <li><Link href="#philosophy" className="hover:text-white transition-colors">{t.nav.philosophy}</Link></li>
                            <li><Link href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact & Location (Debloated/Refined) */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-xs uppercase tracking-[0.3em] text-[#DE9D9D] font-medium">{t.footer.service}</h4>
                        <ul className="space-y-4 text-sm text-alabaster/60 font-light">
                            <li className="flex items-center gap-3">
                                <Mail size={14} className="text-[#DE9D9D]" />
                                <a href={`mailto:${t.contact.office_email}`} className="hover:text-white transition-colors italic border-b border-transparent hover:border-white/20">
                                    {t.contact.office_email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={14} className="text-[#DE9D9D]" />
                                <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                                    {t.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={14} className="text-[#DE9D9D] mt-1 shrink-0" />
                                <span className="leading-relaxed">
                                    {t.contact.address}<br />
                                    {t.contact.city}
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter (Premium) */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-xs uppercase tracking-[0.3em] text-[#DE9D9D] font-medium">{t.footer.join}</h4>
                        <p className="text-sm text-alabaster/60 font-light leading-relaxed">
                            {t.footer.newsletter_desc}
                        </p>
                        <div className="space-y-3">
                            <Input
                                type="email"
                                placeholder="..."
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#DE9D9D] h-12 rounded-xl"
                            />
                            <Button className="w-full bg-[#DE9D9D] hover:bg-[#cf8c8c] text-white border-none h-12 rounded-xl transition-all duration-300 font-medium tracking-widest text-xs uppercase">
                                {t.footer.subscribe}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/10 font-bold">
                    <p>© 2026 NutriGen+. {t.footer.rights}</p>
                    <div className="flex gap-8 items-center">
                        <Link href="/privacy" className="hover:text-white/40 transition-colors">{t.footer.privacy}</Link>
                        <Link href="/terms" className="hover:text-white/40 transition-colors">{t.footer.terms}</Link>

                        {/* Admin Access Points */}
                        <div className="flex gap-4 border-l border-white/5 pl-8">
                            {session ? (
                                <Link href="/admin/orders" className="flex items-center gap-2 text-[#DE9D9D] hover:text-white transition-colors">
                                    <ClipboardList size={12} />
                                    <span>{t.footer.orders_log}</span>
                                </Link>
                            ) : (
                                <Link href="/auth/login" className="flex items-center gap-2 text-white/20 hover:text-[#DE9D9D] transition-colors">
                                    <ShieldCheck size={12} />
                                    <span>{t.footer.admin_access}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

