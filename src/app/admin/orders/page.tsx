import React from "react";
import { getOrders } from "@/app/actions/order";
import { auth } from "@/auth";
import Link from "next/link";
import AdminOrdersClient from "@/components/admin/AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const session = await auth();
    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <p className="text-charcoal/40 italic font-serif">Security protocol active. Unauthorized access.</p>
                    <Link href="/auth/login" className="text-gold-end font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:underline">Return to Login</Link>
                </div>
            </div>
        );
    }

    const orders = await getOrders();

    return <AdminOrdersClient orders={orders as any} />;
}
