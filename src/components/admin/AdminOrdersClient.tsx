"use client";

import React from "react";
import {
    Truck,
    CreditCard,
    Wallet,
    Home,
    Building2,
    Package,
    Clock,
    User,
    LogOut
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useTranslation } from "@/context/translation-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface OrderItem {
    name: string;
    image: string;
    quantity: number;
    numericPrice: number;
}

interface Order {
    id: string;
    orderNumber: string;
    status: string;
    createdAt: Date | string;
    total: number;
    fullName: string;
    email: string;
    phone: string;
    deliveryType: string;
    shippingProvider: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    paymentMethod: string;
    items: OrderItem[];
}

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        pending: "bg-gold-start/10 text-gold-end border-gold-start/20",
        completed: "bg-green-500/10 text-green-600 border-green-500/20",
        cancelled: "bg-red-500/10 text-red-600 border-red-500/20"
    };

    return (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles[status] || styles.pending}`}>
            {status}
        </span>
    );
};

export default function AdminOrdersClient({ orders }: { orders: Order[] }) {
    const { t } = useTranslation();

    const formatPrice = (amount: number) => {
        return `${amount.toFixed(2)} €`;
    };

    const formatDate = (dateString: Date | string) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 bg-gold-gradient rounded-full" />
                            <h1 className="text-4xl font-serif text-charcoal">{t.admin.logistics_vault}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-charcoal/40 font-serif italic text-lg">
                                {t.admin.admin_protocol}: <span className="text-gold-end font-bold not-italic">nutrigenplus</span>
                            </p>
                            <button
                                onClick={() => signOut()}
                                className="p-2 hover:bg-charcoal/5 rounded-full text-charcoal/40 hover:text-red-500 transition-colors"
                                title={t.admin.disconnect_identity}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-charcoal text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
                            <Package size={20} className="text-gold-mid" />
                            <div className="text-left">
                                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{t.admin.total_orders}</p>
                                <p className="text-xl font-bold">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="bg-alabaster/30 border border-charcoal/5 rounded-[3rem] p-20 text-center space-y-4">
                            <Package className="w-16 h-16 text-charcoal/10 mx-auto" />
                            <p className="text-charcoal/40 font-serif italic text-xl">{t.admin.no_orders}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white border border-charcoal/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                                >
                                    {/* Order Header */}
                                    <div className="bg-alabaster/30 px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-charcoal/5">
                                        <div className="flex items-center gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">{t.admin.reference_number}</p>
                                                <p className="font-bold text-charcoal text-xs sm:text-base">{order.orderNumber}</p>
                                            </div>
                                            <StatusBadge status={order.status} />
                                        </div>

                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-3 text-charcoal/40">
                                                <Clock size={16} />
                                                <span className="text-[10px] sm:text-xs font-medium">{formatDate(order.createdAt)}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">{t.admin.total_value}</p>
                                                <p className="text-base sm:text-2xl font-bold text-gold-end">{formatPrice(order.total)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                        {/* Customer & Shipping */}
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-gold-end">
                                                    <User size={16} />
                                                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold">{t.admin.identity}</h3>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-bold text-charcoal">{order.fullName}</p>
                                                    <p className="text-sm text-charcoal/60">{order.email}</p>
                                                    <p className="text-sm text-charcoal/60">{order.phone}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-gold-end">
                                                    <Truck size={16} />
                                                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold">{t.admin.distribution}</h3>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-alabaster flex items-center justify-center text-charcoal/40">
                                                            {order.deliveryType === 'office' ? <Building2 size={16} /> : <Home size={16} />}
                                                        </div>
                                                        <p className="text-sm font-medium">{t.admin.to} {order.deliveryType === 'office' ? t.admin.office : t.admin.address} ({order.shippingProvider})</p>
                                                    </div>
                                                    <div className="pl-11 space-y-0.5">
                                                        <p className="text-sm text-charcoal/60">{order.address}</p>
                                                        <p className="text-sm text-charcoal/60">{order.postalCode} {order.city}</p>
                                                        <p className="text-sm text-charcoal/40 font-bold uppercase tracking-widest text-[10px]">{order.country}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="lg:col-span-2 space-y-6">
                                            <div className="flex items-center gap-2 text-gold-end">
                                                <Package size={16} />
                                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold">{t.admin.components}</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-alabaster/30 border border-charcoal/5">
                                                        <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg p-2 overflow-hidden">
                                                            <Image src={item.image} alt={item.name} fill className="object-contain" />
                                                        </div>
                                                        <div className="flex-grow space-y-1">
                                                            <p className="text-sm font-bold text-charcoal leading-tight">{item.name}</p>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">{t.admin.qty} {item.quantity}</span>
                                                                <span className="font-bold text-gold-end">{formatPrice(item.numericPrice * item.quantity)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 p-6 rounded-3xl bg-charcoal text-white flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold-mid">
                                                        {order.paymentMethod === 'card' ? <CreditCard size={20} /> : <Wallet size={20} />}
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{t.admin.settlement}</p>
                                                        <p className="text-[10px] sm:text-sm font-bold">{order.paymentMethod === 'card' ? t.admin.secure_card : t.admin.cod}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{t.admin.grand_total}</p>
                                                    <p className="text-base sm:text-2xl font-bold text-gold-mid">{formatPrice(order.total)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
