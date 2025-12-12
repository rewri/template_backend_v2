import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { CreateEmployeeController } from './create-employee/create-employee.controller';
import { CreateEmployeeService } from './create-employee/create-employee.service';
import { DeleteEmployeeController } from './delete-employee/delete-employee.controller';
import { DeleteEmployeeService } from './delete-employee/delete-employee.service';
import { FindEmployeeController } from './find-employee/find-employee.controller';
import { FindEmployeeService } from './find-employee/find-employee.service';
import { ListEmployeesController } from './list-employees/list-employees.controller';
import { ListEmployeesService } from './list-employees/list-employees.service';
import { EmployeeRepository } from './shared/repositories/employee.repository';
import { UpdateEmployeeController } from './update-employee/update-employee.controller';
import { UpdateEmployeeService } from './update-employee/update-employee.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateEmployeeController,
    FindEmployeeController,
    ListEmployeesController,
    UpdateEmployeeController,
    DeleteEmployeeController,
  ],
  providers: [
    CreateEmployeeService,
    FindEmployeeService,
    ListEmployeesService,
    UpdateEmployeeService,
    DeleteEmployeeService,
    EmployeeRepository,
  ],
  exports: [EmployeeRepository],
})
export class EmployeesModule {}
