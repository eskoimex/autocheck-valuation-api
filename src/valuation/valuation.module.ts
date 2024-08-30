import { Module } from '@nestjs/common';
import { ValuationService } from './valuation.service';
import { ValuationController } from './valuation.controller';

@Module({
  controllers: [ValuationController],
  providers: [ValuationService],
})
export class ValuationModule {}
