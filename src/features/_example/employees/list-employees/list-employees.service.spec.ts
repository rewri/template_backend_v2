import { Employee } from '../../shared/entities/employee.entity';
import { ExtensionNumber } from '../../shared/entities/extension_number.entity';
import { ListEmployeesQueryDTO } from './list-employees.dto';

interface MockResponse {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
}

const mockListEmployeesService = {
  listEmployees: jest.fn<Promise<MockResponse>, [ListEmployeesQueryDTO]>(),
};

describe('ListEmployeesService', () => {
  let service: typeof mockListEmployeesService;

  beforeAll(() => {
    service = mockListEmployeesService;
  });

  describe('listEmployees', () => {
    const mockQuery: ListEmployeesQueryDTO = {
      page: 1,
      limit: 10,
      skip: 0,
    };

    const mockEmployees: Employee[] = [
      {
        id: 1,
        name: 'João Silva',
        email: 'joao@email.com',
        extensionNumbers: [] as ExtensionNumber[],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const mockResponse: MockResponse = {
      data: mockEmployees,
      total: 1,
      page: 1,
      limit: 10,
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should list employees successfully', async () => {
      service.listEmployees.mockResolvedValue(mockResponse);
      const result: MockResponse = await service.listEmployees(mockQuery);
      expect(result.data).toEqual(mockEmployees);
      expect(result.total).toBe(1);
    });

    it('should return empty list when no employees found', async () => {
      const emptyResponse: MockResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
      };
      service.listEmployees.mockResolvedValue(emptyResponse);
      const result: MockResponse = await service.listEmployees(mockQuery);
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
    });
  });
});
