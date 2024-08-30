import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { ValuationModule } from './valuation/valuation.module';
import { LoanApplicationModule } from './loan-application/loan-application.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle/entities/vehicle.entity';
import { Valuation } from './valuation/entities/valuation.entity';
import { LoanApplication } from './loan-application/entities/loan-application.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Vehicle, Valuation, LoanApplication],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([
      VehicleModule,
      ValuationModule,
      LoanApplicationModule,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
