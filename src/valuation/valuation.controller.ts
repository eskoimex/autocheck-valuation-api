import { Controller, Post, Param } from '@nestjs/common';
import { ValuationService } from './valuation.service';

@Controller('valuations')
export class ValuationController {
  constructor(private readonly valuationService: ValuationService) {}

  @Post(':vin')
  async valuateVehicle(@Param('vin') vin: string) {
    return this.valuationService.valuateVehicle(vin);
  }
}
