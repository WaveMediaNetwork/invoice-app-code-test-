import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  vendor_name: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  due_date: string;

  @IsString()
  description: string;

  @IsBoolean()
  paid: boolean;

  @IsNumber()
  user_id: number;
}
