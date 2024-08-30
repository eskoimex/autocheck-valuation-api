import { Controller } from '@nestjs/common';
import { LoanApplicationService } from './loan-application.service';

@Controller('loan-application')
export class LoanApplicationController {
  constructor(private readonly loanApplicationService: LoanApplicationService) {}
}
