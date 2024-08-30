import { Test, TestingModule } from '@nestjs/testing';
import { ValuationController } from './valuation.controller';
import { ValuationService } from './valuation.service';

describe('ValuationController', () => {
  let controller: ValuationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValuationController],
      providers: [ValuationService],
    }).compile();

    controller = module.get<ValuationController>(ValuationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
