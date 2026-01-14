import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const beef = await prisma.product.upsert({
        where: { slug: 'bioactive-collagen' },
        update: {},
        create: {
            slug: 'bioactive-collagen',
            name: 'Bioactive Collagen Peptides (Beef)',
            stock: 100,
            lowStockThreshold: 10,
        },
    })

    const fish = await prisma.product.upsert({
        where: { slug: 'fish-collagen' },
        update: {},
        create: {
            slug: 'fish-collagen',
            name: 'Premium Fish Collagen Peptides',
            stock: 100,
            lowStockThreshold: 10,
        },
    })

    console.log({ beef, fish })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
