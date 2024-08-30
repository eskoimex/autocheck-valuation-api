import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            createVehicle: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a vehicle', async () => {
    const createVehicleDto: CreateVehicleDto = {
      vin: '1HGCM82633A123456',
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      mileage: 15000,
    };

    jest
      .spyOn(service, 'createVehicle')
      .mockResolvedValue(createVehicleDto as any);
    const result = await controller.createVehicle(createVehicleDto);
    expect(result).toEqual(createVehicleDto);
  });
});
