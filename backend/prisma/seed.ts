import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.donation.deleteMany()

    const user = await prisma.donation.create({

        data: {

            email: 'test@email.come',
            displayName: 'tan',
            count: 100,

        },

    })

    console.log({ user })

}

main()
    .catch((e) => {

        console.error(e)
        process.exit(1)

    })
    .finally(async () => {

        await prisma.$disconnect()

    })