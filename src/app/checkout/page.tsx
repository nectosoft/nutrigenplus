"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    CreditCard,
    ShieldCheck,
    Truck,
    Sparkles,
    ChevronRight,
    Wallet,
    Home,
    Building2,
    Search,
    MapPin
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTranslation } from "@/context/translation-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { submitOrder, OrderData } from "@/app/actions/order";
import { getEcontOffices, getEcontCities, CourierOffice, CourierCity, calculateShippingFee, getAllEcontCities, getAllEcontOffices } from "@/app/actions/shipping";
import { toast } from "sonner";

const CheckoutContent = () => {
    const {
        cart,
        cartTotal,
        subtotal,
        bundleDiscount,
        clearCart
    } = useCart();
    const { t } = useTranslation();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const cityRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
                setShowCityDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "Bulgaria",
        city: "",
        postalCode: "",
        address: "",
        shippingProvider: 'econt' as 'econt',
        deliveryType: 'office' as 'office' | 'address',
        paymentMethod: 'card' as 'card' | 'cod',
        cityId: "",
        cityName: "",
        officeId: "",
        officeName: "",
        shippingCost: 5.50
    });

    const [cities, setCities] = useState<CourierCity[]>([]);
    const [offices, setOffices] = useState<CourierOffice[]>([]);
    const [isSearchingCities, setIsSearchingCities] = useState(false);
    const [isFetchingOffices, setIsFetchingOffices] = useState(false);
    const [allEcontCities, setAllEcontCities] = useState<CourierCity[]>([]);
    const [allEcontOffices, setAllEcontOffices] = useState<CourierOffice[]>([]);

    useEffect(() => {
        if (searchParams.get("success") === "true") {
            setIsSuccess(true);
            clearCart();
        }

        // Pre-fetch Econt data for instant selection
        const loadEcontData = async () => {
            const [cities, offices] = await Promise.all([
                getAllEcontCities(),
                getAllEcontOffices()
            ]);
            setAllEcontCities(cities);
            setAllEcontOffices(offices);
        };
        loadEcontData();
    }, [searchParams, clearCart]);

    const formatCurrency = (amount: number) => {
        if (cart.length === 0 && !isSuccess) return "";
        const priceStr = cart.length > 0 ? cart[0].price : "€0.00";
        // Handle both € and other currency symbols
        if (priceStr.includes("€") || priceStr.toLowerCase().includes("eur")) {
            return `${amount.toFixed(2)} €`;
        }
        return `€${amount.toFixed(2)}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Shipping Logic
    useEffect(() => {
        const updateShipping = async () => {
            const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
            const cost = await calculateShippingFee(
                formData.shippingProvider,
                formData.deliveryType,
                0, // Weight no longer used for fee calculation
                itemCount,
                formData.cityId,
                formData.officeId
            );
            setFormData(prev => ({ ...prev, shippingCost: cost }));
        };
        updateShipping();
    }, [formData.shippingProvider, formData.deliveryType, formData.cityId, formData.officeId, cart]);

    const handleCitySearch = async (val: string) => {
        setFormData(p => ({ ...p, cityName: val, city: val }));
        if (val.length < 2) {
            setCities([]);
            return;
        }

        if (allEcontCities.length > 0) {
            const results = allEcontCities
                .filter(c => {
                    const searchVal = val.toLowerCase().trim();
                    return (
                        c.name.toLowerCase().includes(searchVal) ||
                        (c.nameEn && c.nameEn.toLowerCase().includes(searchVal)) ||
                        (c.postCode && c.postCode.includes(searchVal))
                    );
                })
                .slice(0, 50);
            setCities(results);
            setShowCityDropdown(results.length > 0);
        } else {
            setIsSearchingCities(true);
            try {
                const results = await getEcontCities(val);
                setCities(results);
                setShowCityDropdown(results.length > 0);
            } catch (error) {
                console.error("City Search Error:", error);
                setCities([]);
                setShowCityDropdown(false);
            } finally {
                setIsSearchingCities(false);
            }
        }
    };

    const handleCitySelect = async (city: CourierCity) => {
        setFormData(p => ({
            ...p,
            cityName: city.name,
            city: city.name,
            cityId: city.id,
            officeId: "",
            officeName: "",
            postalCode: city.postCode || p.postalCode
        }));
        setCities([]);
        setShowCityDropdown(false);

        if (allEcontOffices.length > 0) {
            const results = allEcontOffices.filter(o => o.cityId === city.id);
            setOffices(results);
        } else {
            setIsFetchingOffices(true);
            try {
                const results = await getEcontOffices(city.id);
                setOffices(results);
            } catch (error) {
                console.error("Office Fetch Error:", error);
                setOffices([]);
            } finally {
                setIsFetchingOffices(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cart.length === 0) {
            toast.error(t.cart.empty);
            return;
        }

        setIsLoading(true);

        const orderData: Omit<OrderData, 'id' | 'orderNumber' | 'status' | 'createdAt'> = {
            ...formData,
            items: cart,
            total: cartTotal
        };

        try {
            const result = await submitOrder(orderData);

            if (result.error) {
                toast.error(result.error);
                setIsLoading(false);
                return;
            }

            if (result.method === 'cod') {
                setIsSuccess(true);
                clearCart();
            } else if (result.url) {
                window.location.assign(result.url);
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-40 pb-24 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto space-y-8 bg-alabaster/30 p-12 rounded-[3rem] border border-gold-start/10"
                    >
                        <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center mx-auto shadow-xl shadow-gold-end/20">
                            <CheckCircle2 className="text-white w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-5xl font-serif text-charcoal">{t.checkout.success_title}</h1>
                            <p className="text-xl text-charcoal/60 leading-relaxed font-serif italic">
                                {t.checkout.success_desc}
                            </p>
                        </div>
                        <div className="h-px w-24 bg-gold-gradient mx-auto" />
                        <Button asChild className="bg-gold-gradient text-white h-14 px-8 sm:px-12 text-[10px] sm:text-sm uppercase tracking-widest font-bold w-full sm:w-auto rounded-2xl">
                            <Link href="/">
                                {t.checkout.back_home}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6">
                <Link
                    href="/cart"
                    className="flex items-center gap-2 text-charcoal/40 hover:text-gold-end transition-colors mb-12 group w-fit"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-medium">{t.common.back_to_cart}</span>
                </Link>

                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-3/5">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="space-y-6">
                                <h1 className="text-4xl font-serif text-charcoal">{t.checkout.title}</h1>
                                <div className="h-[0.5px] w-20 bg-gold-gradient" />
                            </div>

                            {/* Contact Information */}
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-bold">1</div>
                                    <h3 className="text-lg font-serif uppercase tracking-widest">{t.checkout.shipping_address}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">{t.checkout.full_name}</label>
                                        <Input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder={t.checkout.placeholder_name}
                                            required
                                            className="h-14 rounded-2xl border-charcoal/10 focus:border-gold-end"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">{t.checkout.email}</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder={t.checkout.placeholder_email}
                                            required
                                            className="h-14 rounded-2xl border-charcoal/10 focus:border-gold-end"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">{t.checkout.phone}</label>
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder={t.checkout.placeholder_phone}
                                            required
                                            className="h-14 rounded-2xl border-charcoal/10 focus:border-gold-end"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Information */}
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-bold">2</div>
                                    <h3 className="text-lg font-serif uppercase tracking-widest">{t.checkout.delivery_type}</h3>
                                </div>

                                {/* Shipping Method Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {/* Carrier Selection */}
                                    {/* Carrier Selection - Simplified as only Econt is available */}
                                    <div className="bg-alabaster/30 p-1.5 rounded-[2rem] flex border border-charcoal/5">
                                        <div className="flex-1 flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white shadow-md shadow-gold-end/5 text-gold-end">
                                            <Truck size={18} className="mb-1.5" />
                                            <span className="font-bold text-[9px] uppercase tracking-[0.1em]">{t.checkout.carrier_name}</span>
                                        </div>
                                    </div>

                                    {/* Delivery Type */}
                                    <div className="bg-alabaster/30 p-1.5 rounded-[2rem] flex gap-1.5 border border-charcoal/5">
                                        {[
                                            { id: 'office', name: t.checkout.delivery_office, icon: Building2 },
                                            { id: 'address', name: t.checkout.delivery_home, icon: Home }
                                        ].map(type => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setFormData(p => ({ ...p, deliveryType: type.id as any }))}
                                                className={`flex-1 flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all ${formData.deliveryType === type.id ? 'bg-white shadow-md shadow-gold-end/10 text-gold-end' : 'text-charcoal/40 hover:text-charcoal/60'}`}
                                            >
                                                <type.icon size={18} className="mb-1.5" />
                                                <span className="font-bold text-[9px] uppercase tracking-[0.1em]">{type.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Selection Flow */}
                                <div className="space-y-3">
                                    <div className="relative" ref={cityRef}>
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30">
                                            <Search size={18} />
                                        </div>
                                        <Input
                                            type="text"
                                            value={formData.cityName}
                                            onChange={(e) => handleCitySearch(e.target.value)}
                                            onFocus={() => {
                                                if (cities.length > 0) setShowCityDropdown(true);
                                            }}
                                            placeholder={t.checkout.city}
                                            required
                                            autoComplete="off"
                                            className="h-14 pl-14 rounded-2xl border-charcoal/5 bg-white shadow-sm focus:border-gold-end text-sm"
                                        />
                                        {isSearchingCities && (
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                                <div className="w-4 h-4 border-2 border-gold-end border-t-transparent rounded-full animate-spin" />
                                            </div>
                                        )}
                                        {showCityDropdown && cities.length > 0 && (
                                            <div className="absolute z-50 w-full mt-2 bg-white border border-charcoal/10 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                                                {cities.map(city => (
                                                    <button
                                                        key={city.id}
                                                        type="button"
                                                        onClick={() => handleCitySelect(city)}
                                                        className="w-full p-4 text-left hover:bg-gold-start/5 text-sm border-b border-charcoal/5 last:border-none group flex justify-between items-center transition-colors"
                                                    >
                                                        <div>
                                                            <span className="font-medium text-charcoal">{city.name}</span>
                                                            {city.nameEn && city.nameEn !== city.name && (
                                                                <span className="ml-2 text-charcoal/40 text-xs italic">({city.nameEn})</span>
                                                            )}
                                                            <span className="ml-2 text-charcoal/40">{city.postCode ? `(${city.postCode})` : ''}</span>
                                                        </div>
                                                        <ChevronRight size={14} className="text-charcoal/20 group-hover:text-gold-end transition-transform group-hover:translate-x-1" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {formData.deliveryType === 'office' ? (
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30">
                                                <Building2 size={18} />
                                            </div>
                                            <select
                                                value={formData.officeId}
                                                onChange={(e) => {
                                                    const off = offices.find(o => o.id === e.target.value);
                                                    setFormData(p => ({
                                                        ...p,
                                                        officeId: e.target.value,
                                                        officeName: off?.name || "",
                                                        address: off?.address || ""
                                                    }));
                                                }}
                                                className="w-full h-14 pl-14 bg-white border border-charcoal/5 rounded-2xl px-6 focus:ring-2 focus:ring-gold-end/20 transition-all text-sm appearance-none outline-none focus:border-gold-end shadow-sm"
                                                required
                                                disabled={!formData.cityName || isFetchingOffices}
                                            >
                                                <option value="">{isFetchingOffices ? t.checkout.loading_offices : t.checkout.placeholder_office}</option>
                                                {offices.map(off => (
                                                    <option key={off.id} value={off.id}>
                                                        {off.name} {off.nameEn && off.nameEn !== off.name ? `(${off.nameEn})` : ''} — {off.address.substring(0, 40)}...
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/30">
                                                <ChevronRight size={18} className="rotate-90" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-charcoal/30">
                                                <MapPin size={18} />
                                            </div>
                                            <Input
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder={t.checkout.placeholder_address}
                                                required
                                                className="h-14 pl-14 rounded-2xl border-charcoal/5 bg-white shadow-sm focus:border-gold-end text-sm"
                                            />
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-bold">3</div>
                                    <h3 className="text-lg font-serif uppercase tracking-widest">{t.checkout.payment_method}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'card', name: t.checkout.card, icon: CreditCard, desc: t.checkout.security_desc },
                                        { id: 'cod', name: t.checkout.cod, icon: Wallet, desc: t.checkout.cod_desc }
                                    ].map(method => (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, paymentMethod: method.id as any }))}
                                            className={`p-4 rounded-3xl border transition-all flex flex-col items-center gap-2 relative ${formData.paymentMethod === method.id ? 'border-gold-end bg-gold-start/5' : 'border-charcoal/5 hover:border-charcoal/10'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.paymentMethod === method.id ? 'bg-gold-gradient text-white shadow-lg shadow-gold-end/20' : 'bg-charcoal/5 text-charcoal/40'}`}>
                                                <method.icon size={18} />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-[10px] uppercase tracking-widest">{method.name}</p>
                                                <p className="text-[8px] text-charcoal/40 mt-0.5 line-clamp-1">{method.desc}</p>
                                            </div>
                                            {formData.paymentMethod === method.id && (
                                                <div className="absolute top-3 right-3 w-4 h-4 bg-gold-end rounded-full flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <Button
                                type="submit"
                                disabled={isLoading || cart.length === 0}
                                className="w-full h-16 bg-gold-gradient text-white rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-gold-end/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-3"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>{t.checkout.place_order}</span>
                                        <ChevronRight size={16} />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Right Summary */}
                    <div className="lg:w-2/5">
                        <div className="sticky top-32 bg-charcoal/95 backdrop-blur-xl text-white p-8 md:p-12 rounded-[3.5rem] space-y-10 shadow-3xl relative overflow-hidden border border-white/5">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-gradient/10 blur-[90px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-gradient/5 blur-[90px] rounded-full translate-y-1/2 -translate-x-1/2" />

                            <div className="relative">
                                <h2 className="text-2xl font-serif tracking-tight border-b border-white/10 pb-8 flex items-center justify-between">
                                    <span>{t.cart.summary}</span>
                                    <Sparkles className="text-gold-mid w-5 h-5 opacity-50" />
                                </h2>

                                <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar my-10">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-6 group">
                                            <div className="relative w-20 h-20 bg-white/5 rounded-2xl flex-shrink-0 group-hover:bg-white/10 transition-colors">
                                                <Image src={item.image} alt={item.name} fill className="object-contain p-3" />
                                            </div>
                                            <div className="flex-grow flex flex-col justify-center">
                                                <h4 className="text-sm font-medium text-alabaster leading-snug">{item.name}</h4>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-[10px] uppercase tracking-widest text-white/40">{t.cart.quantity}: {item.quantity}</span>
                                                    <span className="text-sm font-bold text-gold-mid">
                                                        {formatCurrency(item.numericPrice * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-5 pt-8 border-t border-white/10">
                                    <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-white/30">
                                        <span>{t.cart.subtotal}</span>
                                        <span className="text-white/60">{formatCurrency(subtotal)}</span>
                                    </div>

                                    {bundleDiscount > 0 && (
                                        <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-gold-mid font-bold">
                                            <span className="flex items-center gap-2">
                                                <CheckCircle2 size={14} />
                                                {t.checkout.promo_bundle}
                                            </span>
                                            <span>-{formatCurrency(bundleDiscount)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-white/30">
                                        <span>{formData.deliveryType === 'office' ? t.checkout.shipping_office : t.checkout.shipping_home}</span>
                                        <span className="text-gold-mid italic">+ {formatCurrency(formData.shippingCost)}</span>
                                    </div>

                                    <div className="pt-8 flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">{t.cart.total}</span>
                                            <span className="text-2xl font-serif text-white">{t.cart.total}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-4xl font-bold text-gold-gradient block">
                                                {formatCurrency(cartTotal + formData.shippingCost)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Badge */}
                                <div className="mt-12 bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-gold-gradient flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-gold-end/20">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white mb-1">{t.checkout.security_title}</p>
                                        <p className="text-[9px] text-white/40 leading-relaxed uppercase tracking-widest">{t.checkout.security_desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

const CheckoutPage = () => {
    const { t } = useTranslation();
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-serif text-charcoal italic animate-pulse text-2xl">{t.checkout.processing}</div>}>
            <CheckoutContent />
        </Suspense>
    );
}

export default CheckoutPage;
