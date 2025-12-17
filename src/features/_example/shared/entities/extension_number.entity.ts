import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity({ name: 'extension_numbers' })
@Index('idx_extension_number', ['number'])
@Index('idx_extension_employee_id', ['employee_id'])
@Index('idx_extension_employee_number', ['employee_id', 'number'])
export class ExtensionNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  number: string;

  @Column({ type: 'int', nullable: false })
  employee_id: number;

  @ManyToOne(() => Employee, (employee) => employee.extensionNumbers, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
