"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Instagram, Facebook, MessageSquare, Mail, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/translation-context";
import { useCart } from "@/context/cart-context";
import { usePathname, useRouter } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import QuickCart from "@/components/cart/QuickCart";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
    const { t } = useTranslation();
    const { setCartOpen, cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        // Active section detection using IntersectionObserver
        const sections = ["products", "ritual", "science", "ingredients", "philosophy", "sustainability", "faq", "contact"];

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px", // Focus on top quadrant
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            // Find the entry that is most visible in our observation zone
            const intersecting = entries.filter(e => e.isIntersecting);
            if (intersecting.length > 0) {
                // If multiple are intersecting, pick the one that just entered (last in entries is usually the one moving)
                // or just pick the first one if we want "first found in order"
                const id = intersecting[0].target.id;
                setActiveSection(id);
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: t.nav.shop, href: "#products", id: "products" },
        { name: t.nav.ritual, href: "#ritual", id: "ritual" },
        { name: t.nav.science, href: "#science", id: "science" },
        { name: t.nav.ingredients, href: "#ingredients", id: "ingredients" },
        { name: t.nav.philosophy, href: "#philosophy", id: "philosophy" },
        { name: t.nav.sustainability, href: "#sustainability", id: "sustainability" },
        { name: t.nav.contact, href: "#contact", id: "contact" },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const id = href.substring(1);

            if (pathname !== "/") {
                router.push(`/${href}`);
                return;
            }

            const element = document.getElementById(id);
            if (element) {
                const navHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
                    }`}
            >
                <div className={`container mx-auto px-6 flex items-center justify-between transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2"
                        onClick={(e) => {
                            if (pathname === "/") {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                    >
                        <div className="relative h-8 w-28 xs:h-10 xs:w-32 md:h-12 md:w-40 transition-transform group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="NutriGen+ Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {/* Shop Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setIsShopDropdownOpen(true)}
                            onMouseLeave={() => setIsShopDropdownOpen(false)}
                        >
                            <button
                                onClick={(e: any) => scrollToSection(e, "#products")}
                                className={`flex items-center gap-1 text-sm font-medium transition-all ${activeSection === "products" ? "text-[#DE9D9D]" : "text-charcoal/80 hover:text-[#DE9D9D]"
                                    }`}
                            >
                                {t.nav.shop}
                                <ChevronDown size={14} className={`transition-transform duration-300 ${isShopDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {isShopDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 pt-4 w-64"
                                    >
                                        <div className="bg-white rounded-2xl shadow-xl border border-alabaster p-4 flex flex-col gap-2">
                                            <Link
                                                href="/products/bioactive-collagen"
                                                className="p-3 rounded-xl hover:bg-alabaster transition-colors group/item"
                                            >
                                                <p className="text-sm font-serif font-bold text-charcoal group-hover/item:text-[#DE9D9D]">{t.products.items.bioactive.name}</p>
                                                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">{t.products.items.bioactive.info}</p>
                                            </Link>
                                            <Link
                                                href="/products/fish-collagen"
                                                className="p-3 rounded-xl hover:bg-alabaster transition-colors group/item"
                                            >
                                                <p className="text-sm font-serif font-bold text-charcoal group-hover/item:text-[#DE9D9D]">{t.products.items.fish.name}</p>
                                                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">{t.products.items.fish.info}</p>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.slice(1).map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`text-sm font-medium transition-all relative group ${activeSection === link.id ? "text-[#DE9D9D]" : "text-charcoal/80 hover:text-[#DE9D9D]"
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#DE9D9D] transition-all duration-300 ${activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                                    }`} />
                            </a>
                        ))}
                    </div>

                    {/* Action Items */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <LanguageSwitcher />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative hover:bg-gold-start/10 transition-colors group w-9 h-9 sm:w-10 sm:h-10"
                            onClick={() => setCartOpen(true)}
                        >
                            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal group-hover:text-[#DE9D9D]" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-[#DE9D9D] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Button>

                        <button
                            className="lg:hidden text-charcoal p-1 hover:bg-gold-start/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

            </nav>
            {/* Mobile Menu Overlay - Move out of nav to ensure true full-screen fixed positioning */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-full h-full z-[120] lg:hidden bg-white backdrop-blur-2xl noise-overlay flex flex-col"
                    >
                        {/* Decorative Background Element */}
                        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-gold-mid/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-[#DE9D9D]/10 blur-[100px] rounded-full pointer-events-none" />

                        {/* Mobile Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-alabaster/50 relative z-10 w-full">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="relative h-8 w-28">
                                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                                </div>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-gold-start/10 rounded-full transition-colors"
                            >
                                <X size={20} className="text-charcoal" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col relative z-10">
                            {/* Navigation Links */}
                            <div className="space-y-8 mb-12">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: idx * 0.05,
                                            duration: 0.5,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                    >
                                        <a
                                            href={link.href}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            className={`text-2xl font-serif block transition-all ${activeSection === link.id
                                                ? "text-gold-end translate-x-3"
                                                : "text-charcoal hover:text-gold-end hover:translate-x-1"
                                                }`}
                                        >
                                            {link.name}
                                        </a>

                                        {link.id === "products" && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="flex flex-col gap-4 pl-4 mt-4 border-l-2 border-gold-start/20"
                                            >
                                                <Link
                                                    href="/products/bioactive-collagen"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex flex-col gap-1 active:opacity-70"
                                                >
                                                    <span className="text-base font-serif text-charcoal">{t.products.items.bioactive.name}</span>
                                                    <span className="text-[9px] text-charcoal/40 uppercase tracking-widest font-bold">{t.products.items.bioactive.info}</span>
                                                </Link>
                                                <Link
                                                    href="/products/fish-collagen"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="flex flex-col gap-1 active:opacity-70"
                                                >
                                                    <span className="text-base font-serif text-charcoal">{t.products.items.fish.name}</span>
                                                    <span className="text-[9px] text-charcoal/40 uppercase tracking-widest font-bold">{t.products.items.fish.info}</span>
                                                </Link>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Utility Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-auto space-y-8"
                            >
                                {/* Action Button */}
                                <Button
                                    asChild
                                    className="w-full h-12 bg-charcoal hover:bg-charcoal/90 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-xl flex items-center justify-between px-6 group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <a href="#contact" onClick={(e: any) => scrollToSection(e, "#contact")}>
                                        {t.nav.contact}
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </Button>

                                {/* Contact & Socials */}
                                <div className="grid grid-cols-2 gap-6 items-end">
                                    <div className="space-y-3">
                                        <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold">{t.contact.priority_support}</p>
                                        <div className="space-y-2">
                                            <a href={`mailto:${t.contact.office_email}`} className="flex items-center gap-2 text-xs text-charcoal/60 hover:text-gold-end transition-colors">
                                                <Mail size={14} />
                                                <span className="truncate">{t.contact.office_email}</span>
                                            </a>
                                            <a href={`tel:${t.contact.phone}`} className="flex items-center gap-2 text-xs text-charcoal/60 hover:text-gold-end transition-colors">
                                                <Phone size={14} />
                                                <span>{t.contact.phone}</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <a href="#" className="w-10 h-10 bg-alabaster rounded-full flex items-center justify-center text-charcoal hover:bg-gold-gradient hover:text-white transition-all shadow-sm">
                                            <Instagram size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-alabaster rounded-full flex items-center justify-center text-charcoal hover:bg-gold-gradient hover:text-white transition-all shadow-sm">
                                            <Facebook size={18} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <QuickCart />
        </>
    );
};

export default Navbar;

