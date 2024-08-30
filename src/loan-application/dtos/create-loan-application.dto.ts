import { IsString, IsInt, Min, MaxLength, IsPositive, Matches } from 'class-validator';

export class CreateLoanApplicationDto {
  @IsString()
  @MaxLength(100, {
    message: 'Applicant name should not exceed 100 characters.',
  })
  applicantName: string;

  @IsInt()
  @IsPositive({ message: 'Applicant income must be a positive number.' })
  applicantIncome: number;

  @IsInt()
  @IsPositive({ message: 'Loan amount must be a positive number.' })
  loanAmount: number;

  @IsString()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message: 'VIN must be exactly 17 characters long and exclude I, O, Q.',
  })
  vin: string;
}
