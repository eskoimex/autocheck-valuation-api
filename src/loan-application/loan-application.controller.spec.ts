import { Test, TestingModule } from '@nestjs/testing';
import { LoanApplicationController } from './loan-application.controller';
import { LoanApplicationService } from './loan-application.service';
import { CreateLoanApplicationDto } from './dtos/create-loan-application.dto';
import { LoanStatus } from './entities/loan-application.entity';

describe('LoanApplicationController', () => {
  let controller: LoanApplicationController;
  let service: LoanApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanApplicationController],
      providers: [
        {
          provide: LoanApplicationService,
          useValue: {
            createLoanApplication: jest.fn(),
            updateLoanStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoanApplicationController>(
      LoanApplicationController,
    );
    service = module.get<LoanApplicationService>(LoanApplicationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a loan application', async () => {
    const createLoanDto: CreateLoanApplicationDto = {
      vin: '1HGCM82633A123456',
      applicantName: 'John Doe',
      applicantIncome: 50000,
      loanAmount: 20000,
    };

    jest
      .spyOn(service, 'createLoanApplication')
      .mockResolvedValue(createLoanDto as any);
    const result = await controller.createLoanApplication(createLoanDto);
    expect(result).toEqual(createLoanDto);
  });

  it('should update loan status', async () => {
    const statusDto = { status: LoanStatus.APPROVED };

    jest
      .spyOn(service, 'updateLoanStatus')
      .mockResolvedValue({ id: 1, status: LoanStatus.APPROVED } as any);
    const result = await controller.updateLoanStatus(1, statusDto);
    expect(result.status).toEqual(LoanStatus.APPROVED);
  });
});
