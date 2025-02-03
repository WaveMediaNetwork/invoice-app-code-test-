import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [AuthModule, InvoicesModule],
})
export class AppModule {}
