import { Module } from '@nestjs/common';
import { LoanApplicationService } from './loan-application.service';
import { LoanApplicationController } from './loan-application.controller';

@Module({
  controllers: [LoanApplicationController],
  providers: [LoanApplicationService],
})
export class LoanApplicationModule {}
