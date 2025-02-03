import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  vendorName: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  dueDate: string;

  @IsString()
  description: string;

  @IsBoolean()
  paid: boolean;

  @IsNumber()
  userId: number;
}
