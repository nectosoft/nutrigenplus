const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            slug: 'bioactive-collagen',
            name: '6in1 Bioactive Collagen Peptides',
            stock: 100,
            lowStockThreshold: 15,
        },
        {
            slug: 'fish-collagen',
            name: 'Premium Fish Collagen',
            stock: 80,
            lowStockThreshold: 10,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        });
    }

    console.log('Products seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
