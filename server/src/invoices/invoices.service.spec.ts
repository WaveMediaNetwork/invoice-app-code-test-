import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma/prisma.service';

// 1) Mock PrismaService
const mockPrismaService = {
  invoice: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
};

describe('InvoicesService', () => {
  let invoicesService: InvoicesService;

  beforeEach(() => {
    // Reset all mocks before each test so calls don't accumulate
    mockPrismaService.invoice.findMany.mockReset();
    mockPrismaService.invoice.findUnique.mockReset();

    // 2) Instantiate InvoicesService with the mocked PrismaService
    invoicesService = new InvoicesService(
      mockPrismaService as unknown as PrismaService,
    );
  });

  it('should return all invoices', async () => {
    // Arrange
    const invoicesMock = [
      {
        id: 1,
        vendor_name: 'Vendor A',
        amount: 100,
        due_date: new Date('2025-01-01'),
        description: 'Test Invoice A',
        paid: false,
        user_id: 1,
      },
      {
        id: 2,
        vendor_name: 'Vendor B',
        amount: 200,
        due_date: new Date('2025-02-01'),
        description: 'Test Invoice B',
        paid: true,
        user_id: 1,
      },
    ];
    // Mock the database call
    mockPrismaService.invoice.findMany.mockResolvedValue(invoicesMock);

    // Act
    const result = await invoicesService.findAll();

    // Assert
    expect(mockPrismaService.invoice.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual(invoicesMock);
  });

  it('should return a single invoice by id', async () => {
    // Arrange
    const invoiceMock = {
      id: 3,
      vendor_name: 'Vendor C',
      amount: 300,
      due_date: new Date('2025-03-01'),
      description: 'Test Invoice C',
      paid: false,
      user_id: 2,
    };
    mockPrismaService.invoice.findUnique.mockResolvedValue(invoiceMock);

    // Act
    const result = await invoicesService.findOne('3');

    // Assert
    expect(mockPrismaService.invoice.findUnique).toHaveBeenCalledWith({
      where: { id: 3 },
    });
    expect(result).toEqual(invoiceMock);
  });
});
