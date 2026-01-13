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
    LogOut,
    Download,
    FileText
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
    cityName?: string;
    officeName?: string;
    cityId?: string;
    officeId?: string;
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

    const downloadCSV = () => {
        const headers = [
            "Order Number",
            "Date",
            "Customer",
            "Email",
            "Phone",
            "Total",
            "Payment",
            "Shipping Provider",
            "Delivery Type",
            "City",
            "PostCode",
            "Address/Office",
            "Items"
        ];

        const rows = orders.map(order => [
            order.orderNumber,
            formatDate(order.createdAt),
            order.fullName,
            order.email,
            order.phone,
            order.total.toFixed(2),
            order.paymentMethod,
            order.shippingProvider,
            order.deliveryType,
            order.cityName || order.city,
            order.postalCode,
            order.deliveryType === 'office' ? (order.officeName || order.address) : order.address,
            order.items.map(i => `${i.name} (${i.quantity})`).join("; ")
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-1.5 bg-gold-gradient rounded-full" />
                            <h1 className="text-4xl md:text-5xl font-serif text-charcoal tracking-tight">{t.admin.logistics_vault}</h1>
                        </div>
                        <div className="flex items-center flex-wrap gap-4">
                            <div className="flex items-center gap-3 bg-alabaster px-4 py-2 rounded-full border border-charcoal/5">
                                <User size={14} className="text-gold-end" />
                                <p className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                                    {t.admin.admin_protocol}: <span className="text-charcoal">nutrigenplus</span>
                                </p>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-full text-red-400 hover:text-red-600 transition-all text-xs font-bold uppercase tracking-wider border border-transparent hover:border-red-100"
                            >
                                <LogOut size={14} />
                                {t.admin.disconnect_identity}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-3 bg-white border border-charcoal/10 px-6 py-4 rounded-2xl hover:bg-charcoal hover:text-white transition-all duration-300 shadow-sm group"
                        >
                            <Download size={20} className="text-gold-end group-hover:text-gold-mid transition-colors" />
                            <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{t.admin.export_csv || "Export CSV"}</span>
                        </button>

                        <div className="bg-charcoal text-white px-8 py-4 rounded-2xl flex items-center gap-6 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />
                            <Package size={24} className="text-gold-mid relative z-10" />
                            <div className="text-left relative z-10">
                                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">{t.admin.total_orders}</p>
                                <p className="text-2xl font-bold font-serif">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-8">
                    {orders.length === 0 ? (
                        <div className="bg-alabaster/20 border-2 border-dashed border-charcoal/10 rounded-[3rem] p-24 text-center space-y-6">
                            <div className="w-20 h-20 bg-alabaster rounded-full flex items-center justify-center mx-auto">
                                <Package className="w-10 h-10 text-charcoal/10" />
                            </div>
                            <p className="text-charcoal/30 font-serif italic text-2xl">{t.admin.no_orders}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white border border-charcoal/5 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 group overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <div className="bg-alabaster/40 px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-charcoal/5 group-hover:bg-alabaster/60 transition-colors">
                                        <div className="flex flex-wrap items-center gap-8">
                                            <div className="space-y-1.5">
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/30 font-black">{t.admin.reference_number}</p>
                                                <div className="flex items-center gap-3">
                                                    <FileText size={16} className="text-gold-end" />
                                                    <p className="font-bold text-charcoal text-lg tracking-tight">{order.orderNumber}</p>
                                                </div>
                                            </div>
                                            <StatusBadge status={order.status} />
                                        </div>

                                        <div className="flex flex-wrap items-center gap-12">
                                            <div className="flex items-center gap-4 px-5 py-2.5 bg-white rounded-2xl border border-charcoal/5 shadow-sm">
                                                <Clock size={16} className="text-gold-end" />
                                                <span className="text-xs font-bold text-charcoal/60 uppercase tracking-widest">{formatDate(order.createdAt)}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/30 font-black">{t.admin.total_value}</p>
                                                <p className="text-3xl font-bold font-serif text-charcoal">{formatPrice(order.total)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
                                        {/* Customer Info */}
                                        <div className="lg:col-span-3 space-y-10">
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 text-gold-end">
                                                    <div className="w-8 h-8 rounded-xl bg-gold-start/10 flex items-center justify-center">
                                                        <User size={16} />
                                                    </div>
                                                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black">{t.admin.identity}</h3>
                                                </div>
                                                <div className="space-y-2 bg-alabaster/50 p-6 rounded-3xl border border-charcoal/5">
                                                    <p className="font-bold text-charcoal text-lg capitalize">{order.fullName}</p>
                                                    <div className="space-y-1 pt-2 border-t border-charcoal/5">
                                                        <p className="text-sm text-charcoal/70 break-all">{order.email}</p>
                                                        <p className="text-sm text-charcoal/70 font-medium">{order.phone}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 text-gold-end">
                                                    <div className="w-8 h-8 rounded-xl bg-gold-start/10 flex items-center justify-center">
                                                        <Truck size={16} />
                                                    </div>
                                                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black">{t.admin.distribution}</h3>
                                                </div>
                                                <div className="space-y-4 bg-alabaster/50 p-6 rounded-3xl border border-charcoal/5">
                                                    <div className="flex items-center gap-4 pb-4 border-b border-charcoal/5">
                                                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-charcoal shadow-sm">
                                                            {order.deliveryType === 'office' ? <Building2 size={20} /> : <Home size={20} />}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-bold">{order.shippingProvider}</p>
                                                            <p className="text-sm font-bold text-charcoal">{order.deliveryType === 'office' ? t.admin.office : t.admin.address}</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        {order.deliveryType === 'office' && (
                                                            <p className="text-sm font-bold text-gold-end leading-snug">
                                                                {order.officeName}
                                                            </p>
                                                        )}
                                                        <p className="text-sm text-charcoal/70 leading-relaxed font-medium">{order.address}</p>
                                                        <div className="flex items-center gap-2 pt-2">
                                                            <span className="bg-charcoal text-white text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest">{order.postalCode}</span>
                                                            <p className="text-sm font-bold text-charcoal capitalize">{order.cityName || order.city}</p>
                                                        </div>
                                                        <p className="text-[9px] text-charcoal/30 font-black uppercase tracking-[0.3em] pt-1">{order.country}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items & Payment */}
                                        <div className="lg:col-span-9 space-y-10">
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 text-gold-end">
                                                    <div className="w-8 h-8 rounded-xl bg-gold-start/10 flex items-center justify-center">
                                                        <Package size={16} />
                                                    </div>
                                                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-black">{t.admin.components}</h3>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex gap-6 p-6 rounded-[2rem] bg-alabaster/30 border border-charcoal/5 group/item hover:bg-white transition-all duration-500 hover:shadow-xl">
                                                            <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-2xl p-3 shadow-inner overflow-hidden border border-charcoal/5 group-hover/item:scale-105 transition-transform">
                                                                <Image src={item.image} alt={item.name} fill className="object-contain" />
                                                            </div>
                                                            <div className="flex flex-col justify-between py-1">
                                                                <p className="font-bold text-charcoal leading-tight text-lg">{item.name}</p>
                                                                <div className="flex items-center gap-6">
                                                                    <div className="space-y-0.5">
                                                                        <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-black">{t.admin.qty}</p>
                                                                        <p className="font-black text-charcoal">{item.quantity}</p>
                                                                    </div>
                                                                    <div className="space-y-0.5">
                                                                        <p className="text-[9px] uppercase tracking-widest text-charcoal/40 font-black">{t.admin.unit_px || "Price"}</p>
                                                                        <p className="font-bold text-gold-end">{formatPrice(item.numericPrice * item.quantity)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-charcoal text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group/footer">
                                                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32 group-hover/footer:scale-110 transition-transform duration-1000" />
                                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                                                    <div className="flex items-center gap-8">
                                                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-gold-mid shadow-lg backdrop-blur-md">
                                                            {order.paymentMethod === 'card' ? <CreditCard size={32} /> : <Wallet size={32} />}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">{t.admin.settlement}</p>
                                                            <p className="text-lg font-bold tracking-tight">{order.paymentMethod === 'card' ? t.admin.secure_card : t.admin.cod}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center md:text-right">
                                                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-2">{t.admin.grand_total}</p>
                                                        <p className="text-4xl md:text-5xl font-bold font-serif text-gold-mid tracking-tight leading-none">{formatPrice(order.total)}</p>
                                                    </div>
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
