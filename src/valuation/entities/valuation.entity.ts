import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

@Entity()
export class Valuation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estimatedValue: number;

  @Column()
  valuationDate: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.valuations)
  vehicle: Vehicle;
}
