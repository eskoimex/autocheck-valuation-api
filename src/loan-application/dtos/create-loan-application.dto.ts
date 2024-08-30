import { IsString, IsInt, Min, MaxLength, IsPositive, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanApplicationDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the loan applicant',
  })
  @IsString()
  @MaxLength(100, {
    message: 'Applicant name should not exceed 100 characters.',
  })
  applicantName: string;

  @ApiProperty({
    example: 50000,
    description: 'The income of the loan applicant',
  })
  @IsInt()
  @IsPositive({ message: 'Applicant income must be a positive number.' })
  applicantIncome: number;

  @ApiProperty({
    example: 20000,
    description: 'The amount of the loan applied for',
  })
  @IsInt()
  @IsPositive({ message: 'Loan amount must be a positive number.' })
  loanAmount: number;

  @ApiProperty({
    example: '1HGCM82633A123456',
    description: 'The vehicle identification number associated with the loan',
  })
  @IsString()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message: 'VIN must be exactly 17 characters long and exclude I, O, Q.',
  })
  vin: string;
}
