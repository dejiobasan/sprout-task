
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TaskService', () => {
  let service: TaskService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get(PrismaService) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const dto = { title: 'Test Task', description: 'Test Desc' };
      const mockTask = {
        taskId: '12345678-1234-1234-1234-123456789012',
        title: dto.title,
        description: dto.description,
        status: 'TODO',
      };

      prisma.task.create.mockResolvedValue(mockTask);

      const result = await service.createTask(dto as any);

      expect(prisma.task.create).toHaveBeenCalledWith({ data: dto });
      expect(result.data.taskId).toBe(mockTask.taskId);
      expect(result.message).toBe('Task created successfully');
    });
  });

  describe('getAllTask', () => {
    it('should return paginated tasks', async () => {
      const mockTasks = [
        {
          taskId: '12345678-1234-1234-1234-123456789012',
          title: 'Task 1',
          description: 'Desc',
          status: 'TODO',
          createdAt: new Date(),
        },
      ];

      prisma.task.findMany.mockResolvedValue(mockTasks as any);
      prisma.task.count.mockResolvedValue(1);

      const result = await service.getAllTask({ page: '1', limit: '10' });

      expect(prisma.task.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(prisma.task.count).toHaveBeenCalled();
      expect(result.data.tasks.length).toBe(1);
      expect(result.data.totalTasks).toBe(1);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update task successfully', async () => {
      const mockTask = {
        taskId: '12345678-1234-1234-1234-123456789012',
        title: 'Updated Task',
        description: 'Desc',
        status: 'DONE',
        createdAt: new Date(),
      };

      prisma.task.update.mockResolvedValue(mockTask);

      const result = await service.updateTaskStatus(
        { taskId: '12345678-1234-1234-1234-123456789012' },
        { status: 'DONE' } as any,
      );

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { taskId: '12345678-1234-1234-1234-123456789012' },
        data: { status: 'DONE' },
      });

      expect(result.data.status).toBe('DONE');
      expect(result.message).toBe('Task updated successfully');
    });

    it('should throw NotFoundException if task does not exist', async () => {
      prisma.task.update.mockRejectedValue(new Error('Not found'));

      await expect(
        service.updateTaskStatus({ taskId: 'invalid' }, { status: 'DONE' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTask', () => {
    it('should delete task successfully', async () => {
      prisma.task.delete.mockResolvedValue({} as any);

      const result = await service.deleteTask({ taskId: '12345678-1234-1234-1234-123456789012' });

      expect(prisma.task.delete).toHaveBeenCalledWith({ where: { taskId: '12345678-1234-1234-1234-123456789012' } });
      expect(result.message).toBe('Task deleted successfully');
    });

    it('should throw NotFoundException if task does not exist', async () => {
      prisma.task.delete.mockRejectedValue(new Error('Not found'));

      await expect(service.deleteTask({ taskId: 'invalid' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});