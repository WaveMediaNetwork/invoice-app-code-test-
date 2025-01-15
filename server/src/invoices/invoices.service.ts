import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
    constructor(private readonly prisma: PrismaService) {}

    // Existing methods
    async findAll() {
        return this.prisma.invoice.findMany();
    }

    async findOne(id: string) {
        return this.prisma.invoice.findUnique({
            where: { id: Number(id) },
        });
    }
    async create(createInvoiceDto: CreateInvoiceDto) {
        return this.prisma.invoice.create({
            data: {
                vendor_name: createInvoiceDto.vendor_name,
                amount: createInvoiceDto.amount,
                due_date: new Date(createInvoiceDto.due_date),
                description: createInvoiceDto.description,
                paid: createInvoiceDto.paid,
                user_id: createInvoiceDto.user_id,
                // No need to explicitly set `date`, as it's automatically set by Prisma
            },
        });
    }

    async bulkDelete(ids: number[]) {
        return this.prisma.invoice.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    }

    // New paginated method
    async findAllPaginated(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.invoice.findMany({
                skip,
                take: limit,
                orderBy: { id: 'asc' },
            }),
            this.prisma.invoice.count(),
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}
