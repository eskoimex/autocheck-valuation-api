import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  LoanApplication,
  LoanStatus,
} from './entities/loan-application.entity';
import { VehicleService } from '../vehicle/vehicle.service';
import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';

@Injectable()
export class LoanApplicationService {
  constructor(
    @InjectRepository(LoanApplication)
    private loanAppRepo: Repository<LoanApplication>,
    private vehicleService: VehicleService,
  ) {}

  async createLoanApplication(
    dto: CreateLoanApplicationDto,
  ): Promise<LoanApplication> {
    const vehicle = await this.vehicleService.getVehicleByVin(dto.vin);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    const loanApplication = this.loanAppRepo.create({
      ...dto,
      vehicle,
    });

    return await this.loanAppRepo.save(loanApplication);
  }

  async updateLoanStatus(
    id: number,
    status: LoanStatus,
  ): Promise<LoanApplication> {
    const loanApp = await this.loanAppRepo.findOne({ where: { id } });
    if (!loanApp) {
      throw new Error('Loan application not found');
    }

    loanApp.status = status;
    return await this.loanAppRepo.save(loanApp);
  }
}
