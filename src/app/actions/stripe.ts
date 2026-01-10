"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-12-15.clover" as any,
});

import { CartItem } from "@/context/cart-context";

export async function createCheckoutSession(items: CartItem[]) {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    // In a real app, you would validate items against your DB
    // For this generic implementation, we create a premium line item
    const currency = "eur";

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
            price_data: {
                currency,
                product_data: {
                    name: item.name,
                    description: item.info || "",
                    images: [`${origin}${item.image}`],
                },
                unit_amount: Math.round(item.numericPrice * 100), // Stripe expects cents
            },
            quantity: item.quantity,
        })),
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: [
                'BG', 'DE', 'AT', 'FR', 'IT', 'ES', 'NL', 'BE', 'LU', 'GR', 'RO', 'PL', 'HU', 'CZ', 'SK', 'IE', 'PT', 'SE', 'DK', 'FI', 'EE', 'LV', 'LT', 'SI', 'HR', 'CY', 'MT', 'GB', 'US', 'CA'
            ],
        },
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${origin}/checkout?success=true`,
        cancel_url: `${origin}/cart`,
    });

    if (session.url) {
        redirect(session.url);
    }
}
