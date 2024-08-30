import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { ValuationModule } from './valuation/valuation.module';
import { LoanApplicationModule } from './loan-application/loan-application.module';

@Module({
  imports: [VehicleModule, ValuationModule, LoanApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
