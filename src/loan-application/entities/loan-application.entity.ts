import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED', 
  REJECTED = 'REJECTED',
}

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicantName: string;

  @Column()
  applicantIncome: number;

  @Column()
  loanAmount: number;

  // @Column({
  //   type: 'enum',
  //   enum: LoanStatus,
  //   default: LoanStatus.PENDING,
  // })
  // status: LoanStatus;
  @Column({
    type: 'text',
    transformer: {
      to: (value: LoanStatus) => value,
      from: (value: string) => LoanStatus[value as keyof typeof LoanStatus],
    },
  })
  status: LoanStatus;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.loanApplications)
  vehicle: Vehicle;
}
