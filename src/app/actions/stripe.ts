"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { CartItem } from "@/context/cart-context";

export async function createCheckoutSession(items: CartItem[]) {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error("[Stripe] STRIPE_SECRET_KEY is missing from environment variables");
        throw new Error("Configuration Error: Stripe Secret Key is missing on the server.");
    }

    try {
        const headersList = await headers();
        const origin = headersList.get("origin") ||
            (headersList.get("host") ? `https://${headersList.get("host")}` : null);

        if (!origin) {
            console.error("[Stripe] Missing origin/host header. Headers:", JSON.stringify(Object.fromEntries(headersList.entries())));
            throw new Error("Missing origin header");
        }

        console.log("[Stripe] Creating session. Items:", items.length, "Origin:", origin);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item) => {
                // Ensure image URL is absolute
                const imageUrl = item.image.startsWith('http')
                    ? item.image
                    : `${origin}${item.image.startsWith('/') ? '' : '/'}${item.image}`;

                return {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: item.name,
                            description: item.info || "",
                            images: [imageUrl],
                        },
                        unit_amount: Math.round(item.numericPrice * 100),
                    },
                    quantity: item.quantity,
                };
            }),
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
            return redirect(session.url);
        } else {
            throw new Error("Failed to generate checkout URL");
        }
    } catch (error: any) {
        console.error("[Stripe Action Error]:", error);
        // We re-throw for redirect to work
        if (error.digest?.includes('NEXT_REDIRECT') || error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        throw new Error(error.message || "An unexpected error occurred during checkout");
    }
}
