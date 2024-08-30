import { IsEnum } from 'class-validator';
import { LoanStatus } from '../entities/loan-application.entity';

export class UpdateLoanStatusDto {
  @IsEnum(LoanStatus, {
    message: 'Status must be either PENDING, APPROVED, or REJECTED.',
  })
  status: LoanStatus;
}
