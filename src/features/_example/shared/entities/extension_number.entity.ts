import { ApiProperty } from '@nestjs/swagger';
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
@Index('idx_extension_number', ['number'], { unique: true })
@Index('idx_extension_employee_id', ['employee_id'])
@Index('idx_extension_employee_number', ['employee_id', 'number'])
export class ExtensionNumber {
  @ApiProperty({
    description: 'ID único da extensão',
    example: 1,
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Número da extensão telefônica',
    example: '1001',
    type: String,
    maxLength: 20,
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  number: string;

  @ApiProperty({
    description: 'ID do funcionário proprietário da extensão',
    example: 1,
    type: Number,
  })
  @Column({ type: 'int', nullable: false })
  employee_id: number;

  @ApiProperty({
    description: 'Funcionário proprietário da extensão',
    type: () => Employee,
  })
  @ManyToOne(() => Employee, (employee) => employee.extensionNumbers, {
    eager: false,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
