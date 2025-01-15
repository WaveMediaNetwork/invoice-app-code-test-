import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
            invoices: {
                create: [
                    {
                        vendor_name: 'Vendor A',
                        amount: 500.0,
                        due_date: new Date(),
                        description: 'Invoice 1',
                        paid: false,
                    },
                ],
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
