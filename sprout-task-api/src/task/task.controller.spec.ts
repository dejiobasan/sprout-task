// task.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { NotFoundException } from '@nestjs/common';

const mockTaskService = {
  createTask: jest.fn(),
  getAllTask: jest.fn(),
  updateTaskStatus: jest.fn(),
  deleteTask: jest.fn(),
};

describe('TaskController', () => {
  let controller: TaskController;
  let service: typeof mockTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get(TaskService) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const dto = { title: 'Test', description: 'Desc' };
      const mockResult = {
        success: true,
        message: 'Task created successfully',
        data: { taskId: '12345678-1234-1234-1234-123456789012', ...dto, status: 'TODO' },
        timestamp: new Date().toISOString(),
      };

      service.createTask.mockResolvedValue(mockResult);

      const result = await controller.createTask(dto as any);
      expect(service.createTask).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAllTask', () => {
    it('should return tasks successfully', async () => {
      const query = { page: '12345678-1234-1234-1234-123456789012', limit: '10' };
      const mockResult = {
        success: true,
        message: 'Tasks fetched successfully',
        data: { tasks: [], totalTasks: 0, currentPage: 1, totalPages: 0 },
        timestamp: new Date().toISOString(),
      };

      service.getAllTask.mockResolvedValue(mockResult);

      const result = await controller.getAllTask(query as any);
      expect(service.getAllTask).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResult);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update a task successfully', async () => {
      const params = { taskId: '12345678-1234-1234-1234-123456789012' };
      const body = { status: 'DONE' };
      const mockResult = {
        success: true,
        message: 'Task updated successfully',
        data: { taskId: '1', title: 'Task 1', description: 'Desc', status: 'DONE', updatedAt: new Date().toISOString() },
        timestamp: new Date().toISOString(),
      };

      service.updateTaskStatus.mockResolvedValue(mockResult);

      const result = await controller.updateTaskStatus(params as any, body as any);
      expect(service.updateTaskStatus).toHaveBeenCalledWith(params, body);
      expect(result).toEqual(mockResult);
    });

    it('should throw NotFoundException if task does not exist', async () => {
      const params = { taskId: 'invalid' };
      const body = { status: 'DONE' };
      service.updateTaskStatus.mockRejectedValue(new NotFoundException());

      await expect(controller.updateTaskStatus(params as any, body as any)).rejects.toThrow(NotFoundException);
      expect(service.updateTaskStatus).toHaveBeenCalledWith(params, body);
    });
  });


  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      const params = { taskId: '12345678-1234-1234-1234-123456789012' };
      const mockResult = {
        success: true,
        message: 'Task deleted successfully',
        timestamp: new Date().toISOString(),
      };

      service.deleteTask.mockResolvedValue(mockResult);

      const result = await controller.deleteTask(params as any);
      expect(service.deleteTask).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockResult);
    });

    it('should throw NotFoundException if task does not exist', async () => {
      const params = { taskId: 'invalid' };
      service.deleteTask.mockRejectedValue(new NotFoundException());

      await expect(controller.deleteTask(params as any)).rejects.toThrow(NotFoundException);
      expect(service.deleteTask).toHaveBeenCalledWith(params);
    });
  });
});