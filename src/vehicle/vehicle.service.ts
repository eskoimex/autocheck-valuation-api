import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { ValuationService } from '../valuation/valuation.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
    private valuationService: ValuationService,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepo.create(createVehicleDto);
    return await this.vehicleRepo.save(vehicle);
  }

  async getVehicleByVin(vin: string): Promise<Vehicle> {
    return await this.vehicleRepo.findOne({ where: { vin } });
  }
}
