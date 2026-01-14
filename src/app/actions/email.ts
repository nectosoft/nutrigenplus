"use server";

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOrderConfirmationEmail(orderData: any) {
    const { email, fullName, orderNumber, total, items } = orderData;

    const itemsHtml = items.map((item: any) => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">€${item.numericPrice.toFixed(2)}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: `"NutriGen+" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Order Confirmation - ${orderNumber}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #c5a059; font-family: serif; margin-bottom: 10px;">NUTRIGEN+</h1>
                    <p style="text-transform: uppercase; letter-spacing: 0.2em; font-size: 10px; color: #666;">Science Meets Luxury</p>
                </div>
                
                <h2 style="color: #1a1a1a;">Thank You for Your Order!</h2>
                <p>Dear ${fullName},</p>
                <p>We have received your order <strong>#${orderNumber}</strong> and it is now being processed with maximum priority.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr style="background-color: #f9f9f9;">
                            <th style="padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase;">Item</th>
                            <th style="padding: 10px; text-align: center; font-size: 12px; text-transform: uppercase;">Qty</th>
                            <th style="padding: 10px; text-align: right; font-size: 12px; text-transform: uppercase;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" style="padding: 20px 10px; font-weight: bold; text-align: right; border-top: 2px solid #1a1a1a;">Grand Total:</td>
                            <td style="padding: 20px 10px; font-weight: bold; text-align: right; border-top: 2px solid #1a1a1a; color: #c5a059; font-size: 18px;">€${total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
                
                <div style="margin-top: 30px; padding: 20px; background-color: #fdfaf4; border-radius: 15px;">
                    <p style="margin: 0; font-size: 14px; color: #6d5b3e;"><strong>Next Steps:</strong> We are currently preparing your shipment. You will receive another notification with the tracking number once it's on its way.</p>
                </div>
                
                <p style="margin-top: 30px;">Best regards,<br>The NutriGen+ Concierge</p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 11px; color: #999;">
                    <p>&copy; ${new Date().getFullYear()} NutriGen+ Europe. All rights reserved.</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: "Email delivery failed" };
    }
}
