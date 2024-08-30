import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('VehicleService', () => {
  let service: VehicleService;
  let repo: Repository<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(Vehicle),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    repo = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a vehicle', async () => {
    const vehicleData = {
      vin: '1HGCM82633A123456',
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      mileage: 15000,
    };

    jest.spyOn(repo, 'save').mockResolvedValue(vehicleData as Vehicle);
    const result = await service.createVehicle(vehicleData);
    expect(result).toEqual(vehicleData);
  });

  it('should find a vehicle by VIN', async () => {
    const vehicleData = {
      vin: '1HGCM82633A123456',
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      mileage: 15000,
    };

    jest.spyOn(repo, 'findOne').mockResolvedValue(vehicleData as Vehicle);
    const result = await service.getVehicleByVin('1HGCM82633A123456');
    expect(result).toEqual(vehicleData);
  });
});
