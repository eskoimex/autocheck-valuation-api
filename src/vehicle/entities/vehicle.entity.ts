import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Valuation } from '../../valuation/entities/valuation.entity';
import { LoanApplication } from '../../loan-application/entities/loan-application.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  vin: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @OneToMany(() => Valuation, (valuation) => valuation.vehicle)
  valuations: Valuation[];

  @OneToMany(() => LoanApplication, (loan) => loan.vehicle)
  loanApplications: LoanApplication[];
}
