import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.invoice.findMany();
  }

  async findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    if (!createInvoiceDto.userId) {
      throw new Error('User ID is required.');
    }

    const parsedDueDate = new Date(createInvoiceDto.dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      throw new Error('Invalid due date format.');
    }

    return this.prisma.invoice.create({
      data: {
        vendorName: createInvoiceDto.vendorName,
        amount: createInvoiceDto.amount,
        dueDate: parsedDueDate,
        description: createInvoiceDto.description,
        paid: createInvoiceDto.paid,
        userId: createInvoiceDto.userId,
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
