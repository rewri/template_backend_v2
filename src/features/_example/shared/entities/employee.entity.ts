import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExtensionNumber } from './extension_number.entity';

@Entity({ name: 'employees' })
@Index('idx_employee_email', ['email'])
@Index('idx_employee_name', ['name'])
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index('idx_employee_name_search')
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @OneToMany(
    () => ExtensionNumber,
    (extensionNumber) => extensionNumber.employee,
    { cascade: ['remove'], onDelete: 'CASCADE' },
  )
  extensionNumbers: ExtensionNumber[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
