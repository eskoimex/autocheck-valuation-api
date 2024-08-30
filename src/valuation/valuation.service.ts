import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Valuation } from './entities/valuation.entity';
import { VehicleService } from '../vehicle/vehicle.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValuationService {

  constructor(
    @InjectRepository(Valuation) private valuationRepo: Repository<Valuation>,
    private vehicleService: VehicleService,
    private readonly rapidApiKey: string,
    private readonly rapidApiHost: string,
    private readonly configService: ConfigService,
  ) {
    this.rapidApiKey = this.configService.get<string>('RAPIDAPI_KEY');
    this.rapidApiHost = this.configService.get<string>('RAPIDAPI_HOST');

  }

  async valuateVehicle(vin: string): Promise<Valuation> {
    const vehicle = await this.vehicleService.getVehicleByVin(vin);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    // const response = await axios.get('https://vin-lookup.p.rapidapi.com/', {
    //   params: { vin },
    //   headers: { 'X-RapidAPI-Key': 'your-rapidapi-key' },
    // });

    const response = await axios.get('https://vin-decoder.p.rapidapi.com/vin', {
      params: { vin },
      headers: {
        'X-RapidAPI-Host': this.rapidApiHost,
        'X-RapidAPI-Key': this.rapidApiKey,
      },
    });

    const estimatedValue = response.data.valuation;
    const valuation = this.valuationRepo.create({
      estimatedValue,
      valuationDate: new Date(),
      vehicle,
    });

    return await this.valuationRepo.save(valuation);
  }
}
