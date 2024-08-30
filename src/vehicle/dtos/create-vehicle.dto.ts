import { IsString, IsInt, Min, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    example: '1HGCM82633A123456',
    description: 'The vehicle identification number',
  })
  @IsString()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, {
    message: 'VIN must be exactly 17 characters long and exclude I, O, Q.',
  })
  vin: string;

  @ApiProperty({ example: 'Honda', description: 'The make of the vehicle' })
  @IsString()
  @MaxLength(50, { message: 'Make should not exceed 50 characters.' })
  make: string;

  @ApiProperty({ example: 'Accord', description: 'The model of the vehicle' })
  @IsString()
  @MaxLength(50, { message: 'Model should not exceed 50 characters.' })
  model: string;

  @ApiProperty({
    example: 2020,
    description: 'The year of manufacture of the vehicle',
  })
  @IsInt()
  @Min(1886, { message: 'Year must be a valid year of manufacture (>= 1886).' })
  year: number;

  @ApiProperty({ example: 15000, description: 'The mileage of the vehicle' })
  @IsInt()
  @Min(0, { message: 'Mileage cannot be negative.' })
  mileage: number;
}
