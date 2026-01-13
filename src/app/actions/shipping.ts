"use server";

const ECONT_URL = 'https://ee.econt.com/services/Nomenclatures/NomenclaturesService';

const ECONT_USER = process.env.ECO_API_USERNAME || "danimarinov777@gmail.com";
const ECONT_PASS = process.env.ECO_API_PASSWORD || "Gamergame1";

export interface CourierOffice {
    id: string;
    name: string;
    nameEn?: string;
    city: string;
    cityId?: string;
    address: string;
    code: string;
}

export interface CourierCity {
    id: string;
    name: string;
    nameEn?: string;
    postCode: string;
}

/**
 * Fetch Econt Offices
 */
export async function getEcontOffices(cityId?: string): Promise<CourierOffice[]> {
    try {
        const response = await fetch(`${ECONT_URL}.getOffices.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${ECONT_USER}:${ECONT_PASS}`).toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                countryCode: 'BGR',
                cityId: cityId ? parseInt(cityId) : undefined
            })
        });

        const data = await response.json();
        const offices = data.offices || [];

        return offices.map((off: any) => ({
            id: off.id.toString(),
            name: off.name,
            nameEn: off.nameEn,
            city: off.address.city.name,
            cityId: off.address.city.id.toString(),
            address: off.address.fullAddress,
            code: off.code
        }));
    } catch (error) {
        console.error("Econt API Error (Offices):", error);
        return [];
    }
}

/**
 * Fetch Econt Cities
 */
export async function getEcontCities(search: string): Promise<CourierCity[]> {
    try {
        const response = await fetch(`${ECONT_URL}.getCities.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${ECONT_USER}:${ECONT_PASS}`).toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                countryCode: 'BGR',
                name: search
            })
        });

        const data = await response.json();
        const cities = data.cities || [];

        return cities.slice(0, 50).map((city: any) => ({
            id: city.id.toString(),
            name: city.name,
            nameEn: city.nameEn,
            postCode: city.postCode
        }));

    } catch (error) {
        console.error("Econt API Error (Cities):", error);
        return [];
    }
}

/**
 * Calculate Shipping Fee
 */
export async function calculateShippingFee(
    carrier: 'econt',
    type: 'office' | 'address',
    totalWeightGrams: number,
    itemCount: number,
    cityId?: string,
    officeId?: string
) {
    // Free shipping rule: 2+ products
    if (itemCount >= 2) {
        return 0;
    }

    // Default Econt prices
    if (type === 'office') return 5.50;
    return 8.50;
}

/**
 * Fetch ALL Econt Cities
 */
export async function getAllEcontCities(): Promise<CourierCity[]> {
    try {
        const response = await fetch(`${ECONT_URL}.getCities.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${ECONT_USER}:${ECONT_PASS}`).toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                countryCode: 'BGR'
            })
        });

        const data = await response.json();
        const cities = data.cities || [];

        return cities.map((city: any) => ({
            id: city.id.toString(),
            name: city.name,
            nameEn: city.nameEn,
            postCode: city.postCode
        }));

    } catch (error) {
        console.error("Econt API Error (All Cities):", error);
        return [];
    }
}

/**
 * Fetch ALL Econt Offices
 */
export async function getAllEcontOffices(): Promise<CourierOffice[]> {
    try {
        const response = await fetch(`${ECONT_URL}.getOffices.json`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${Buffer.from(`${ECONT_USER}:${ECONT_PASS}`).toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                countryCode: 'BGR'
            })
        });

        const data = await response.json();
        const offices = data.offices || [];

        return offices.map((off: any) => ({
            id: off.id.toString(),
            name: off.name,
            nameEn: off.nameEn,
            city: off.address.city.name,
            cityId: off.address.city.id.toString(),
            address: off.address.fullAddress,
            code: off.code
        }));

    } catch (error) {
        console.error("Econt API Error (All Offices):", error);
        return [];
    }
}
