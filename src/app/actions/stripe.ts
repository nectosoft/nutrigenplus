"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.preview" as any, // Using a more standard preview version or removing it is safer
});

import { CartItem } from "@/context/cart-context";

export async function createCheckoutSession(items: CartItem[]) {
    try {
        const headersList = await headers();
        const origin = headersList.get("origin");

        if (!origin) {
            throw new Error("Missing origin header");
        }

        console.log("[Stripe] Creating session for items:", items.length);

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
        console.error("[Stripe Error]:", error.message);
        // We re-throw for redirect to work, but other errors will be caught by the client
        if (error.digest?.includes('NEXT_REDIRECT')) {
            throw error;
        }
        throw new Error(error.message || "An unexpected error occurred during checkout");
    }
}
