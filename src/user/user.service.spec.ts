import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repoistory"; // استورد الريبو

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: any;

  beforeEach(async () => {
    mockUserRepository = {
      findUsers: jest.fn(),
      findUserById: jest.fn(),
      findByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository }, // 👈 استخدم الكلاس
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password and call repository.createUser', async () => {
    const dto = { username: 'testuser', email: 'test@gmail.com', password: 'plain' };

    mockUserRepository.createUser.mockResolvedValue({
      id: '123',
      ...dto,
      password: 'hashed',
    });

    const result = await service.createUser({ ...dto });

    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });
});
