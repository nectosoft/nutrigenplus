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
    FileText,
    ChevronDown,
    ChevronUp,
    Eye,
    MoreHorizontal,
    Search
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useTranslation } from "@/context/translation-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateInvoicePDF } from "@/app/actions/invoice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
    const configs: Record<string, { dot: string; bg: string; text: string; label: string }> = {
        pending: { dot: "bg-gold-start", bg: "bg-gold-start/5", text: "text-gold-end", label: "Pending" },
        completed: { dot: "bg-green-500", bg: "bg-green-500/5", text: "text-green-600", label: "Completed" },
        cancelled: { dot: "bg-red-500", bg: "bg-red-500/5", text: "text-red-600", label: "Cancelled" }
    };

    const config = configs[status as keyof typeof configs] || configs.pending;

    return (
        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-charcoal/5 ${config.bg} ${config.text}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            <span className="text-[9px] font-black uppercase tracking-wider">
                {config.label}
            </span>
        </div>
    );
};

export default function AdminOrdersClient({ orders }: { orders: Order[] }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = React.useState<'logistics' | 'invoices'>('logistics');
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isUpdating, setIsUpdating] = React.useState<string | null>(null);
    const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null);

    const formatPrice = (amount: number | null | undefined) => {
        if (amount === null || amount === undefined) return "0.00 €";
        return `${Number(amount).toFixed(2)} €`;
    };

    const formatDate = (dateString: Date | string | null | undefined) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return "Invalid Date";
        }
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
            order.deliveryType === 'office' ? (order.officeName ? `${order.officeName}: ${order.address}` : order.address) : order.address,
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


    const handleDownloadInvoice = async (order: Order) => {
        try {
            const dataUri = await generateInvoicePDF(order);

            // Convert data URI to Blob for more reliable downloading and naming
            const response = await fetch(dataUri);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            // Clean up the order number for the filename (remove # and replace spaces)
            const safeOrderNumber = order.orderNumber.replace('#', '').replace(/\s+/g, '_');
            link.download = `INV-${safeOrderNumber}.pdf`;

            document.body.appendChild(link);
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

            toast.success("Invoice generated successfully");
        } catch (error) {
            console.error("Failed to generate invoice:", error);
            toast.error("Failed to generate invoice");
        }
    };

    const filteredOrders = orders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-alabaster/30 p-6 md:p-8 rounded-[2rem] border border-charcoal/5">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-1.5 bg-gold-gradient rounded-full" />
                        <h1 className="text-2xl md:text-3xl font-serif text-charcoal tracking-tight leading-none">{t.admin.logistics_vault}</h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={downloadCSV}
                            className="flex items-center gap-2 bg-white border border-charcoal/5 px-4 py-2 rounded-xl hover:bg-charcoal hover:text-white transition-all duration-300 shadow-sm group"
                        >
                            <Download size={14} className="text-gold-end group-hover:text-gold-mid transition-colors" />
                            <span className="font-bold text-[9px] uppercase tracking-[0.2em]">{t.admin.export_csv || "Export CSV"}</span>
                        </button>

                        <div className="bg-charcoal text-white px-4 py-2 rounded-xl flex items-center gap-4 shadow-sm border border-charcoal/5">
                            <Package size={14} className="text-gold-mid" />
                            <div className="flex flex-col -space-y-0.5">
                                <span className="text-[7px] uppercase tracking-[0.2em] text-white/40 font-black leading-none">{t.admin.total_orders}</span>
                                <span className="text-sm font-bold font-serif leading-none">{orders.length}</span>
                            </div>
                        </div>

                        <div className="hidden md:block h-6 w-px bg-charcoal/10 mx-1" />

                        <div className="hidden lg:flex items-center gap-3 bg-white/50 px-3 py-1.5 rounded-xl border border-charcoal/5">
                            <User size={12} className="text-gold-end" />
                            <p className="text-[9px] font-bold uppercase tracking-widest text-charcoal/40">
                                <span className="text-charcoal/20 mr-1 opacity-50">#</span>nutrigenplus
                            </p>
                        </div>

                        <button
                            onClick={() => signOut()}
                            className="p-2.5 hover:bg-red-50 rounded-xl text-red-400 hover:text-red-500 transition-all border border-charcoal/5 bg-white shadow-sm"
                            title={t.admin.disconnect_identity}
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 mb-12 p-1.5 bg-alabaster rounded-2xl w-fit border border-charcoal/5">
                    {[
                        { id: 'logistics', label: t.admin.logistics_vault, icon: Package },
                        { id: 'invoices', label: t.admin.invoice_archive, icon: FileText },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                ? "bg-white text-gold-end shadow-sm border border-charcoal/5"
                                : "text-charcoal/40 hover:text-charcoal hover:bg-white/50"
                                }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search Bar for Orders/Invoices */}
                {(activeTab === 'logistics' || activeTab === 'invoices') && (
                    <div className="mb-8 relative group">
                        <input
                            type="text"
                            placeholder={t.admin.search_orders}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-alabaster/50 border border-charcoal/5 rounded-[1.5rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-gold-mid/20 transition-all font-serif italic text-base text-charcoal shadow-inner"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-charcoal/5 shadow-sm group-focus-within:border-gold-mid/30 transition-colors">
                            <Search size={14} className="text-gold-end" />
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {activeTab === 'logistics' && (
                        <motion.div
                            key="logistics"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {filteredOrders.length === 0 ? (
                                <div className="bg-alabaster/20 border-2 border-dashed border-charcoal/10 rounded-[2rem] p-16 text-center space-y-4">
                                    <div className="w-16 h-16 bg-alabaster rounded-full flex items-center justify-center mx-auto border border-charcoal/5">
                                        <Package className="w-8 h-8 text-charcoal/10" />
                                    </div>
                                    <p className="text-charcoal/30 font-serif italic text-xl">{t.admin.no_orders}</p>
                                </div>
                            ) : (
                                <div className="bg-white border border-charcoal/5 rounded-[1.5rem] overflow-hidden shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse min-w-[900px]">
                                            <thead>
                                                <tr className="bg-alabaster/40 border-b border-charcoal/5">
                                                    <th className="pl-6 pr-3 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">{t.admin.reference_number}</th>
                                                    <th className="px-3 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">Date / Time</th>
                                                    <th className="px-3 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">Customer</th>
                                                    <th className="px-3 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">Status</th>
                                                    <th className="px-3 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">Total</th>
                                                    <th className="pl-3 pr-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-charcoal/5">
                                                {filteredOrders.map((order) => (
                                                    <React.Fragment key={order.id}>
                                                        <tr
                                                            className={`hover:bg-alabaster/20 transition-all cursor-pointer group ${expandedOrderId === order.id ? 'bg-alabaster/30' : ''}`}
                                                            onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                                                        >
                                                            <td className="pl-6 pr-3 py-4">
                                                                <span className="text-[10px] font-bold text-charcoal/30 tracking-tight group-hover:text-charcoal/60 transition-colors">#{order.orderNumber}</span>
                                                            </td>
                                                            <td className="px-3 py-4">
                                                                <span className="text-[11px] font-medium text-charcoal/50">{formatDate(order.createdAt)}</span>
                                                            </td>
                                                            <td className="px-3 py-4">
                                                                <span className="text-sm font-bold text-charcoal group-hover:text-gold-end transition-colors">{order.fullName}</span>
                                                            </td>
                                                            <td className="px-3 py-4">
                                                                <StatusBadge status={order.status} />
                                                            </td>
                                                            <td className="px-3 py-4">
                                                                <span className="text-sm font-bold font-serif text-charcoal">{formatPrice(order.total)}</span>
                                                            </td>
                                                            <td className="pl-3 pr-6 py-4 text-right">
                                                                <div className="flex items-center justify-end gap-1">
                                                                    <button
                                                                        className="p-2 hover:bg-gold-start/10 rounded-lg text-gold-end transition-colors"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setExpandedOrderId(expandedOrderId === order.id ? null : order.id);
                                                                        }}
                                                                        title="View Details"
                                                                    >
                                                                        <Eye size={14} />
                                                                    </button>
                                                                    <button
                                                                        className="p-2 hover:bg-charcoal/5 rounded-lg text-charcoal/30 hover:text-charcoal transition-colors"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDownloadInvoice(order);
                                                                        }}
                                                                        title="Download Invoice"
                                                                    >
                                                                        <Download size={14} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <AnimatePresence>
                                                            {expandedOrderId === order.id && (
                                                                <tr className="bg-alabaster/5">
                                                                    <td colSpan={6} className="p-0 border-b border-charcoal/5 shadow-inner">
                                                                        <motion.div
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: 'auto', opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            className="overflow-hidden"
                                                                        >
                                                                            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                                                                                {/* Identity Section */}
                                                                                <div className="lg:col-span-3 space-y-4">
                                                                                    <div className="flex items-center gap-2 text-charcoal/20">
                                                                                        <User size={12} />
                                                                                        <h4 className="text-[8px] uppercase tracking-[0.3em] font-black">{t.admin.identity}</h4>
                                                                                    </div>
                                                                                    <div className="space-y-1.5 py-1 px-4 border-l border-charcoal/10 bg-white/40 rounded-r-xl">
                                                                                        <p className="text-sm font-bold text-charcoal">{order.fullName}</p>
                                                                                        <p className="text-xs text-charcoal/50 font-medium break-all">{order.email}</p>
                                                                                        <p className="text-xs text-charcoal/50 font-medium">{order.phone}</p>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Logistics Section */}
                                                                                <div className="lg:col-span-4 space-y-4">
                                                                                    <div className="flex items-center gap-2 text-charcoal/20">
                                                                                        <Truck size={12} />
                                                                                        <h4 className="text-[8px] uppercase tracking-[0.3em] font-black">{t.admin.distribution}</h4>
                                                                                    </div>
                                                                                    <div className="space-y-2 py-1 px-4 border-l border-charcoal/10 bg-white/40 rounded-r-xl">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <span className="text-[8px] font-black uppercase bg-charcoal text-white px-2 py-0.5 rounded">
                                                                                                {order.shippingProvider}
                                                                                            </span>
                                                                                            <span className="text-[8px] font-bold text-charcoal/30 uppercase tracking-widest">
                                                                                                {order.deliveryType === 'office' ? t.admin.office : t.admin.address}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="space-y-1.5">
                                                                                            {order.deliveryType === 'office' && order.officeName && (
                                                                                                <div className="flex items-center gap-2">
                                                                                                    <div className="w-1 h-1 rounded-full bg-gold-end" />
                                                                                                    <p className="text-[10px] font-black text-charcoal uppercase tracking-wider">{order.officeName}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            <p className="text-[11px] text-charcoal/80 leading-relaxed font-bold bg-charcoal/5 p-2 rounded-lg border border-charcoal/5">
                                                                                                {order.address}
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2">
                                                                                            <span className="text-[9px] font-bold text-charcoal/30 px-1.5 py-0.5 bg-charcoal/5 rounded">
                                                                                                {order.postalCode}
                                                                                            </span>
                                                                                            <span className="text-[11px] font-black text-charcoal uppercase tracking-tight">
                                                                                                {order.cityName || order.city}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                {/* Components Section */}
                                                                                <div className="lg:col-span-5 space-y-4">
                                                                                    <div className="flex items-center gap-2 text-charcoal/20">
                                                                                        <Package size={12} />
                                                                                        <h4 className="text-[8px] uppercase tracking-[0.3em] font-black">{t.admin.components}</h4>
                                                                                    </div>
                                                                                    <div className="space-y-2 py-1 px-4 border-l border-charcoal/10 max-h-[180px] overflow-y-auto custom-scrollbar bg-white/40 rounded-r-xl">
                                                                                        {order.items.map((item, idx) => (
                                                                                            <div key={idx} className="flex items-center justify-between py-1.5 border-b border-charcoal/5 last:border-0 group/item">
                                                                                                <div className="flex items-center gap-3 overflow-hidden">
                                                                                                    <div className="w-8 h-8 rounded-lg bg-white border border-charcoal/5 p-1 flex-shrink-0">
                                                                                                        <Image src={item.image} alt={item.name} width={32} height={32} className="object-contain" />
                                                                                                    </div>
                                                                                                    <span className="text-[11px] font-bold text-charcoal truncate pr-2 group-hover/item:text-gold-end transition-colors">{item.name}</span>
                                                                                                </div>
                                                                                                <div className="flex items-center gap-4 flex-shrink-0">
                                                                                                    <span className="text-[10px] text-charcoal/30 font-black">x{item.quantity}</span>
                                                                                                    <span className="font-serif font-bold text-charcoal text-[11px] text-right w-16">{formatPrice(item.numericPrice * item.quantity)}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>

                                                                                    {/* Simplified Settlement Strip */}
                                                                                    <div className="pt-3 flex items-center justify-between border-t border-charcoal/5">
                                                                                        <div className="flex items-center gap-2">
                                                                                            {order.paymentMethod === 'card' ? <CreditCard size={12} className="text-blue-500/50" /> : <Wallet size={12} className="text-gold-end/50" />}
                                                                                            <span className="text-[8px] font-black uppercase text-charcoal/30 tracking-[0.2em]">
                                                                                                {order.paymentMethod === 'card' ? 'Electronic Card' : 'COD settlement'}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="flex flex-col items-end -space-y-1">
                                                                                            <span className="text-[7px] uppercase tracking-[0.3em] text-charcoal/20 font-black">{t.admin.grand_total}</span>
                                                                                            <span className="text-xl font-bold font-serif text-charcoal">{formatPrice(order.total)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </motion.div>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </AnimatePresence>
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}


                    {activeTab === 'invoices' && (
                        <motion.div
                            key="invoices"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white border border-charcoal/5 rounded-[1.5rem] overflow-hidden shadow-sm"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-alabaster/40 border-b border-charcoal/5">
                                            <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">{t.admin.reference_number}</th>
                                            <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">Customer</th>
                                            <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">Date</th>
                                            <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40">Total</th>
                                            <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-black text-charcoal/40 text-right">{t.admin.actions}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-charcoal/5">
                                        {filteredOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-alabaster/20 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <span className="text-[10px] font-bold text-charcoal/40 tracking-tight">#{order.orderNumber}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-charcoal group-hover:text-gold-end transition-colors">{order.fullName}</span>
                                                        <span className="text-[10px] text-charcoal/30 font-medium">{order.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[11px] font-medium text-charcoal/60 lowercase tracking-tight">{formatDate(order.createdAt)}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold font-serif text-charcoal">{formatPrice(order.total)}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDownloadInvoice(order)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-gold-end transition-all shadow-sm"
                                                    >
                                                        <Download size={12} />
                                                        {t.admin.download}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {filteredOrders.length === 0 && (
                                <div className="p-16 text-center border-t border-charcoal/5">
                                    <p className="text-charcoal/30 font-serif italic text-lg">No invoices matches your search criteria.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <Footer />
        </main>
    );
}
