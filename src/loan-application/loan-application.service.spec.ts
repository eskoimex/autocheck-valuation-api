import { Test, TestingModule } from '@nestjs/testing';
import { LoanApplicationService } from './loan-application.service';
import {
  LoanApplication,
  LoanStatus,
} from './entities/loan-application.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleService } from '../vehicle/vehicle.service';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

describe('LoanApplicationService', () => {
  let service: LoanApplicationService;
  let repo: Repository<LoanApplication>;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanApplicationService,
        VehicleService,
        {
          provide: getRepositoryToken(LoanApplication),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Vehicle),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LoanApplicationService>(LoanApplicationService);
    repo = module.get<Repository<LoanApplication>>(
      getRepositoryToken(LoanApplication),
    );
    vehicleService = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a loan application', async () => {
    const vehicle = { vin: '1HGCM82633A123456' } as Vehicle;
    const loanData = {
      applicantName: 'John Doe',
      applicantIncome: 50000,
      loanAmount: 20000,
      vehicle,
    };

    jest.spyOn(vehicleService, 'getVehicleByVin').mockResolvedValue(vehicle);
    jest.spyOn(repo, 'save').mockResolvedValue(loanData as LoanApplication);

    const result = await service.createLoanApplication({
      vin: vehicle.vin,
      applicantName: 'John Doe',
      applicantIncome: 50000,
      loanAmount: 20000,
    });

    expect(result).toEqual(loanData);
  });

  it('should update loan status', async () => {
    const loanData = {
      id: 1,
      status: LoanStatus.PENDING,
    } as LoanApplication;

    jest.spyOn(repo, 'findOne').mockResolvedValue(loanData);
    jest
      .spyOn(repo, 'save')
      .mockResolvedValue({ ...loanData, status: LoanStatus.APPROVED });

    const result = await service.updateLoanStatus(1, LoanStatus.APPROVED);
    expect(result.status).toEqual(LoanStatus.APPROVED);
  });
});
