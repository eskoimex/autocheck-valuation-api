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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('loans')
@Controller('loans')
export class LoanApplicationController {
  constructor(private readonly loanService: LoanApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new loan application' })
  @ApiBody({ type: CreateLoanApplicationDto })
  @ApiResponse({
    status: 201,
    description: 'The loan application has been successfully submitted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createLoanApplication(@Body() createLoanDto: CreateLoanApplicationDto) {
    return this.loanService.createLoanApplication(createLoanDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of a loan application' })
  @ApiParam({ name: 'id', description: 'The ID of the loan application' })
  @ApiBody({ type: UpdateLoanStatusDto })
  @ApiResponse({
    status: 200,
    description: 'The loan status has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Loan application not found.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateLoanStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateLoanStatusDto,
  ) {
    return this.loanService.updateLoanStatus(id, updateStatusDto.status);
  }
}
