import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // 🔐 Hash password for security (NEVER store plaintext passwords)
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 🏗️ Create a user with an invoice
    await prisma.user.create({
        data: {
            email: 'test@example.com',
            password: hashedPassword, // Store the hashed password
            name: 'Test User',
            invoices: {
                create: [
                    {
                        vendorName: 'Vendor A',  // ✅ Updated field name
                        amount: 500.0,
                        dueDate: new Date(),      // ✅ Updated field name
                        description: 'Invoice 1',
                        paid: false,
                    },
                ],
            },
        },
    });

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
