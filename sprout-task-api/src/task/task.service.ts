import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateTaskDto,
  GetAllTaskQueryDto,
  UpdateTaskStatusDto,
  UpdateTaskStatusParamDto,
  DeleteTaskParamDto,
} from './dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Task created successfully',
      data: {
        taskId: task.taskId,
        title: task.title,
        description: task.description,
        status: task.status,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async getAllTask(getAllTaskQueryDto: GetAllTaskQueryDto) {
    const { page = '1', limit = '10' } = getAllTaskQueryDto;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const [tasks, totalTasks] = await Promise.all([
      this.prisma.task.findMany({
        skip,
        take: limitNumber,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.task.count(),
    ]);

    const totalPages = Math.ceil(totalTasks / limitNumber);

    return {
      success: true,
      statusCode: 200,
      message: 'Tasks fetched successfully',
      data: {
        tasks: tasks.map((task) => ({
          taskId: task.taskId,
          title: task.title,
          description: task.description,
          status: task.status,
          createdAt: task.createdAt.toISOString(),
        })),
        totalTasks,
        currentPage: pageNumber,
        totalPages,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async updateTaskStatus(
    updateTaskStatusParamDto: UpdateTaskStatusParamDto,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    try {
      const task = await this.prisma.task.update({
        where: {
          taskId: updateTaskStatusParamDto.taskId,
        },
        data: updateTaskStatusDto,
      });

      return {
        success: true,
        statusCode: 200,
        message: 'Task updated successfully',
        data: {
          taskId: task.taskId,
          title: task.title,
          description: task.description,
          status: task.status,
          updatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }

  async deleteTask(deleteTaskParamDto: DeleteTaskParamDto) {
    try {
      await this.prisma.task.delete({
        where: {
          taskId: deleteTaskParamDto.taskId,
        },
      });

      return {
        success: true,
        statusCode: 200,
        message: 'Task deleted successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }
}
