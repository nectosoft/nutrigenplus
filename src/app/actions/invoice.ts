"use server";

import { jsPDF } from "jspdf";
import fs from 'fs';
import path from 'path';

export async function generateInvoicePDF(order: any) {
    const doc = new jsPDF();
    const gold = [197, 160, 89];
    const charcoal = [26, 26, 26];
    const lightGray = [150, 150, 150];

    // --- 0. Helper: Load fonts for Cyrillic support ---
    try {
        const regularPath = 'C:\\Windows\\Fonts\\arial.ttf';
        const boldPath = 'C:\\Windows\\Fonts\\arialbd.ttf';

        if (fs.existsSync(regularPath)) {
            const fontBase64 = fs.readFileSync(regularPath).toString('base64');
            doc.addFileToVFS('Arial.ttf', fontBase64);
            doc.addFont('Arial.ttf', 'Arial', 'normal');
        }

        if (fs.existsSync(boldPath)) {
            const boldBase64 = fs.readFileSync(boldPath).toString('base64');
            doc.addFileToVFS('ArialBold.ttf', boldBase64);
            doc.addFont('ArialBold.ttf', 'Arial', 'bold');
        }

        doc.setFont('Arial', 'normal');
    } catch (e) {
        console.error("Failed to load Cyrillic fonts:", e);
    }

    // --- 1. Meta Setup ---
    const numericId = order.id.replace(/[^0-9]/g, "").slice(-10).padStart(10, '0');
    const invoiceNumber = numericId;
    const today = new Date(order.createdAt).toLocaleDateString('en-GB');

    // --- 2. Borders & Top Margin ---
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 15, 190, 15); // Top margin border

    // --- 3. Header ---
    try {
        const logoPath = path.join(process.cwd(), 'public', 'logo.png');
        if (fs.existsSync(logoPath)) {
            const logoData = fs.readFileSync(logoPath).toString('base64');
            doc.addImage(logoData, 'PNG', 20, 22, 35, 10);
        } else {
            doc.setFontSize(22);
            doc.setTextColor(gold[0], gold[1], gold[2]);
            doc.text("NUTRIGEN+", 20, 30);
        }
    } catch (e) {
        doc.setFontSize(22);
        doc.setTextColor(gold[0], gold[1], gold[2]);
        doc.text("NUTRIGEN+", 20, 30);
    }

    // Invoice Meta (Right Aligned)
    doc.setFontSize(10);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.setFont("Arial", "bold");
    doc.text("ФАКТУРА / INVOICE", 190, 25, { align: 'right' });
    doc.setFontSize(8);
    doc.setFont("Arial", "normal");
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text("(Оригинал / Original)", 190, 30, { align: 'right' });

    doc.setFontSize(9);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text(`NO / №: ${invoiceNumber}`, 190, 38, { align: 'right' });
    doc.text(`DATE / ДАТА: ${today}`, 190, 44, { align: 'right' });
    doc.text(`EVENT / СЪБИТИЕ: ${today}`, 190, 50, { align: 'right' });

    // --- 4. Address Blocks ---
    let startY = 65;
    doc.setFontSize(8);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text("ДОСТАВЧИК / SUPPLIER", 20, startY);
    doc.text("ПОЛУЧАТЕЛ / RECIPIENT", 110, startY);

    let supplierY = startY + 6;
    let recipientY = startY + 6;

    // Supplier Block
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.setFont("Arial", "bold");
    doc.setFontSize(10);
    doc.text("NutriGen+ Europe Ltd.", 20, supplierY);
    supplierY += 6;

    doc.setFont("Arial", "normal");
    doc.setFontSize(8.5);
    doc.text("EIK / ЕИК: 207123456", 20, supplierY);
    supplierY += 5;
    doc.text("VAT / ДДС: BG207123456", 20, supplierY);
    supplierY += 5;
    doc.text("MOL / МОЛ: Daniel Marinov", 20, supplierY);
    supplierY += 5;
    doc.text("Sofia, Bulgaria / София, България", 20, supplierY);

    // Recipient Block
    doc.setFont("Arial", "bold");
    doc.setFontSize(10);
    doc.text(order.fullName, 110, recipientY);
    recipientY += 6;

    doc.setFont("Arial", "normal");
    doc.setFontSize(8.5);
    // Show both office name and address if they are different
    let addressToDisplay = order.address;
    if (order.deliveryType === 'office' && order.officeName && order.officeName !== (order.cityName || order.city)) {
        addressToDisplay = `${order.officeName}\n${order.address}`;
    }
    const splitAddress = doc.splitTextToSize(addressToDisplay, 75);
    doc.text(splitAddress, 110, recipientY, { lineHeightFactor: 1.2 });
    recipientY += (splitAddress.length * 4.5) + 1;

    doc.text(`${order.postalCode} ${order.cityName || order.city}`, 110, recipientY);
    recipientY += 5;
    doc.text(`Phone / Тел: ${order.phone}`, 110, recipientY);
    recipientY += 5;
    doc.text("MOL / МОЛ: .................................", 110, recipientY);

    // --- 5. Products Table ---
    let y = Math.max(supplierY, recipientY) + 12;
    doc.setFillColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.rect(20, y, 170, 10, 'F');

    doc.setFontSize(8.5);
    doc.setFont("Arial", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("DESCRIPTION / ОПИСАНИЕ", 25, y + 6.5);
    doc.text("QTY / К-ВО", 118, y + 6.5, { align: 'center' });
    doc.text("PRICE / ЦЕНА", 148, y + 6.5, { align: 'center' });
    doc.text("TOTAL / ОБЩО", 185, y + 6.5, { align: 'right' });

    y += 10;
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.setFont("Arial", "normal");

    order.items.forEach((item: any) => {
        const splitName = doc.splitTextToSize(item.name, 80);
        doc.text(splitName, 25, y + 7);
        doc.text(item.quantity.toString(), 118, y + 7, { align: 'center' });
        doc.text(`${item.numericPrice.toFixed(2)}`, 148, y + 7, { align: 'center' });
        doc.text(`${(item.quantity * item.numericPrice).toFixed(2)}`, 185, y + 7, { align: 'right' });

        const nameLines = splitName.length;
        const rowHeight = Math.max(10, nameLines * 5.5);
        doc.setDrawColor(240, 240, 240);
        doc.line(20, y + rowHeight, 190, y + rowHeight);
        y += rowHeight;
    });

    // --- 6. Totals ---
    y += 12;
    const totalAmount = order.total;
    const taxBase = totalAmount / 1.2;
    const vatAmount = totalAmount - taxBase;

    doc.setFontSize(9);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text("TAX BASE / ДАНЪЧНА ОСНОВА:", 25, y);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text(`${taxBase.toFixed(2)} EUR`, 185, y, { align: 'right' });

    y += 7;
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.text("VAT (20%) / ДДС (20%):", 25, y);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text(`${vatAmount.toFixed(2)} EUR`, 185, y, { align: 'right' });

    y += 10;
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.8);
    doc.line(110, y - 5, 190, y - 5);

    doc.setFontSize(11);
    doc.setFont("Arial", "bold");
    doc.text("GRAND TOTAL / СУМА ЗА ПЛАЩАНЕ:", 25, y);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`${totalAmount.toFixed(2)} EUR`, 185, y, { align: 'right' });

    // --- 7. Bank & Signatures ---
    y += 30;
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    doc.setFont("Arial", "bold");
    doc.text("BANK DETAILS / БАНКОВИ ДЕТАЙЛИ", 20, y);

    y += 7;
    doc.setFont("Arial", "normal");
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.text("Bank / Банка: UNICREDIT BULBANK", 20, y);
    doc.text(`IBAN: BG00 UNCR 0000 0000 0000 00`, 85, y);
    doc.text(`SWIFT / БИК: UNCRBGSF`, 160, y);

    y += 20;
    doc.setFont("Arial", "bold");
    doc.text("Issued by / Съставил: .................................", 20, y);
    doc.text("Recipient / Получател: .................................", 110, y);

    // --- 8. Bottom Margin & Final Details ---
    y = 280;
    doc.setFontSize(8);
    doc.setTextColor(charcoal[0], charcoal[1], charcoal[2]);
    doc.setFont("Arial", "normal");
    doc.text(`Payment / Плащане: ${order.paymentMethod.toUpperCase()}`, 20, y);

    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 285, 190, 285); // Bottom margin border

    return doc.output('datauristring');
}
