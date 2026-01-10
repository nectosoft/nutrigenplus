"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

import { CartItem } from "@/context/cart-context";

export async function createCheckoutSession(items: CartItem[]) {
    // 1. Validate environment
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        console.error("[Stripe] CRITICAL: STRIPE_SECRET_KEY is missing");
        throw new Error("Server Configuration Error: Stripe Secret Key is missing.");
    }

    // Initialize Stripe inside the function or use the outer one
    const stripe = new Stripe(secretKey);

    let redirectUrl: string | null = null;

    try {
        // 2. Determine Origin
        const headersList = await headers();
        const origin = headersList.get("origin") ||
            (headersList.get("host") ? `https://${headersList.get("host")}` : "https://nutrigenplus.com");

        console.log("[Stripe] Initiating session. Items:", items.length, "Origin:", origin);

        // 3. Create Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item) => {
                // Ensure price is valid
                const amount = Math.round((item.numericPrice || 0) * 100);
                if (amount <= 0) {
                    throw new Error(`Invalid price for item: ${item.name}`);
                }

                // Ensure image is absolute
                let imageUrl = item.image || "";
                if (imageUrl && !imageUrl.startsWith('http')) {
                    imageUrl = `${origin}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
                }

                return {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: item.name || "Product",
                            description: item.info || "",
                            images: imageUrl ? [imageUrl] : [],
                        },
                        unit_amount: amount,
                    },
                    quantity: item.quantity || 1,
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

        console.log("[Stripe] Session created:", session.id);
        redirectUrl = session.url;

    } catch (error: any) {
        console.error("[Stripe Action Error Details]:", error);

        // Handle Stripe specific errors
        if (error.type === 'StripeAuthenticationError') {
            throw new Error("Invalid Stripe API Key. Please check your Hostinger environment variables.");
        }

        throw new Error(error.message || "An unexpected error occurred during checkout setup.");
    }

    // 4. Perform Redirect (Must be outside try-catch to work correctly in Next.js)
    if (redirectUrl) {
        redirect(redirectUrl);
    } else {
        throw new Error("Stripe did not return a valid checkout URL.");
    }
}
