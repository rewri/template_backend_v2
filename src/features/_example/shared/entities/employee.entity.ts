import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'ID único do funcionário',
    example: 1,
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome completo do funcionário',
    example: 'João da Silva',
    type: String,
    maxLength: 255,
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index('idx_employee_name_search')
  name: string;

  @ApiProperty({
    description: 'Email único do funcionário',
    example: 'joao.silva@empresa.com',
    format: 'email',
    type: String,
    maxLength: 255,
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description: 'Lista de números de extensão do funcionário',
    type: () => [ExtensionNumber],
    isArray: true,
  })
  @OneToMany(
    () => ExtensionNumber,
    (extensionNumber) => extensionNumber.employee,
    { cascade: ['remove'], lazy: true, onDelete: 'CASCADE' },
  )
  extensionNumbers: Promise<ExtensionNumber[]>;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-12-09T12:00:00.000Z',
    type: Date,
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    description: 'Data da última atualização do registro',
    example: '2024-12-09T12:00:00.000Z',
    type: Date,
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
