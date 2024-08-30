import { Controller } from '@nestjs/common';
import { ValuationService } from './valuation.service';

@Controller('valuation')
export class ValuationController {
  constructor(private readonly valuationService: ValuationService) {}
}
