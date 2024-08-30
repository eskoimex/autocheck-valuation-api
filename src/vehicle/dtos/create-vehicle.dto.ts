import { IsString, IsInt, Min, MaxLength, Matches, Max } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message: 'VIN must be exactly 17 characters long and exclude I, O, Q.',
  })
  vin: string;

  @IsString()
  @MaxLength(50, { message: 'Make should not exceed 50 characters.' })
  make: string;

  @IsString()
  @MaxLength(50, { message: 'Model should not exceed 50 characters.' })
  model: string;

  @IsInt()
  @Min(1886, { message: 'Year must be a valid year of manufacture (>= 1886).' })
  @Max(new Date().getFullYear(), { message: `Year cannot be in the future.` })
  year: number;

  @IsInt()
  @Min(0, { message: 'Mileage cannot be negative.' })
  mileage: number;
}
