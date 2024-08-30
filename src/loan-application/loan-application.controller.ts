import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoanApplicationService } from './loan-application.service';
import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';
import { UpdateLoanStatusDto } from './dtos/update-loan-status.dto';

@Controller('loans')
export class LoanApplicationController {
  constructor(private readonly loanService: LoanApplicationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createLoanApplication(@Body() createLoanDto: CreateLoanApplicationDto) {
    return this.loanService.createLoanApplication(createLoanDto);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateLoanStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateLoanStatusDto,
  ) {
    return this.loanService.updateLoanStatus(id, updateStatusDto.status);
  }
}
