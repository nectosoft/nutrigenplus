"use server";

import prisma from "@/lib/prisma";
import { CartItem } from "@/context/cart-context";
import { createCheckoutSession } from "./stripe";
import fs from 'fs';
import path from 'path';

export type OrderData = {
    id: string;
    orderNumber: string;
    fullName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    postalCode: string;
    country: string;
    shippingProvider: 'speedy' | 'econt';
    deliveryType: 'office' | 'address';
    paymentMethod: 'card' | 'cod';
    items: CartItem[];
    total: number;
    shippingCost: number;
    cityId?: string;
    cityName?: string;
    officeId?: string;
    officeName?: string;
    status: string;
    createdAt: string;
};

const ORDERS_FILE = path.join(process.cwd(), 'src', 'data', 'orders.json');

export async function submitOrder(orderData: Omit<OrderData, 'id' | 'orderNumber' | 'status' | 'createdAt'>) {
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`.toUpperCase();

    const newOrder: OrderData = {
        ...orderData,
        id: orderNumber,
        orderNumber: orderNumber,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    console.log("[Order Action] PROCESSING ORDER:", orderNumber);

    try {
        // --- 1. PRIMARY STORAGE: DATABASE ---
        let dbSyncSuccess = false;
        try {
            await prisma.$transaction(async (tx) => {
                // Create Order
                return await (tx.order as any).create({
                    data: {
                        orderNumber: newOrder.orderNumber,
                        fullName: newOrder.fullName,
                        email: newOrder.email,
                        phone: newOrder.phone,
                        city: newOrder.city,
                        address: newOrder.address,
                        postalCode: newOrder.postalCode,
                        country: newOrder.country,
                        shippingProvider: newOrder.shippingProvider,
                        deliveryType: newOrder.deliveryType,
                        paymentMethod: newOrder.paymentMethod,
                        total: newOrder.total,
                        shippingCost: newOrder.shippingCost,
                        cityId: newOrder.cityId,
                        cityName: newOrder.cityName,
                        officeId: newOrder.officeId,
                        officeName: newOrder.officeName,
                        status: "pending",
                        items: {
                            create: newOrder.items.map(item => ({
                                productId: item.id,
                                name: item.name,
                                quantity: item.quantity,
                                price: item.numericPrice,
                                image: item.image
                            }))
                        }
                    }
                });
            });
            console.log("DB TRANSACTION SUCCESSFUL:", orderNumber);
            dbSyncSuccess = true;
        } catch (dbError: any) {
            console.error("DB TRANSACTION FAILED:", dbError);
            if (dbError.message?.includes("Insufficient stock")) {
                throw dbError;
            }
        }

        // --- 2. SECONDARY STORAGE: FILE (Only if writable/local) ---
        try {
            const dataDir = path.join(process.cwd(), 'src', 'data');
            // We only attempt to write to file if we are in development or if the DB failed
            if (process.env.NODE_ENV === 'development' || !dbSyncSuccess) {
                if (!fs.existsSync(dataDir)) {
                    fs.mkdirSync(dataDir, { recursive: true });
                }

                let orders: OrderData[] = [];
                if (fs.existsSync(ORDERS_FILE)) {
                    const fileContent = fs.readFileSync(ORDERS_FILE, 'utf8');
                    orders = JSON.parse(fileContent);
                }

                orders.unshift(newOrder);
                fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
            }
        } catch (fileError) {
            console.log("File storage bypassed (Read-only environment):", orderNumber);
            // We ignore file errors in production if DB works
            if (!dbSyncSuccess) {
                throw new Error("Failed to store order (Database and File storage failed)");
            }
        }

        // --- 3. TRIGGER NOTIFICATIONS ---
        if (dbSyncSuccess || process.env.NODE_ENV === 'development') {
            // We fire and forget the email to not block the response, 
            // but we can also await it if we want to be sure.
            // For now, let's await to ensure we catch errors in logs.
            try {
                const { sendOrderConfirmationEmail } = await import("./email");
                await sendOrderConfirmationEmail(newOrder);
                console.log("CONFIRMATION EMAIL SENT:", orderNumber);
            } catch (emailError) {
                console.error("FAILED TO SEND CONFIRMATION EMAIL:", emailError);
            }
        }

        // --- 4. RETURN RESULT ---
        if (newOrder.paymentMethod === 'cod') {
            return { success: true, method: 'cod', orderId: newOrder.id };
        } else {
            const stripeResult = await createCheckoutSession(newOrder.items, newOrder.shippingCost);
            if (stripeResult.error) return { error: stripeResult.error };
            return { success: true, method: 'card', url: stripeResult.url, orderId: newOrder.id };
        }
    } catch (error: any) {
        console.error("Order process critical failure:", error);
        return { error: error.message || "Failed to process order" };
    }
}

export async function getOrders(): Promise<OrderData[]> {
    try {
        // --- 1. Try Database First in Production ---
        try {
            const dbOrders = await prisma.order.findMany({
                include: { items: true },
                orderBy: { createdAt: 'desc' }
            });

            if (dbOrders.length > 0) {
                return dbOrders.map((order: any) => ({
                    id: order.id,
                    orderNumber: order.orderNumber,
                    fullName: order.fullName,
                    email: order.email,
                    phone: order.phone,
                    city: order.city,
                    address: order.address,
                    postalCode: order.postalCode,
                    country: order.country,
                    shippingProvider: order.shippingProvider as any,
                    deliveryType: order.deliveryType as any,
                    paymentMethod: order.paymentMethod as any,
                    total: order.total,
                    shippingCost: order.shippingCost || 0,
                    cityId: order.cityId || "",
                    cityName: order.cityName || "",
                    officeId: order.officeId || "",
                    officeName: order.officeName || "",
                    status: order.status,
                    createdAt: order.createdAt.toISOString(),
                    items: order.items.map((item: any) => ({
                        id: item.productId,
                        name: item.name,
                        quantity: item.quantity,
                        numericPrice: item.price,
                        price: `€${item.price.toFixed(2)}`,
                        image: item.image,
                        info: ""
                    }))
                }));
            }
        } catch (dbError) {
            console.error("Failed to fetch from DB, falling back to file:", dbError);
        }

        // --- 2. Fallback to file for Local Dev ---
        if (fs.existsSync(ORDERS_FILE)) {
            const fileContent = fs.readFileSync(ORDERS_FILE, 'utf8');
            return JSON.parse(fileContent);
        }

        return [];
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return [];
    }
}
