import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { PaginationPipe } from '../common/pipes/pagination.pipe';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Delete('bulk-delete')
  async bulkDelete(@Body('ids') ids: number[]) {
    return this.invoicesService.bulkDelete(ids);
  }

  @Get()
  @UsePipes(PaginationPipe)
  async findAllPaginated(@Query() { page, limit }) {
    return this.invoicesService.findAllPaginated(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }
}
