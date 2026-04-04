import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import {
  CreateTaskDto,
  CreateTaskResponseDto,
  GetAllTaskQueryDto,
  GetAllTaskResponseDto,
  UpdateTaskStatusDto,
  UpdateTaskStatusParamDto,
  UpdateTaskStatusResponseDto,
  DeleteTaskParamDto,
  DeleteTaskResponseDto,
} from './dto';
import { ErrorResponseDto } from 'src/common/dtos/errorRes.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOkResponse({
    description: 'Task created successfully',
    type: CreateTaskResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: ErrorResponseDto,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Tasks fetched successfully',
    type: GetAllTaskResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: ErrorResponseDto,
  })
  async getAllTask(@Query() getAllTaskQueryDto: GetAllTaskQueryDto) {
    return this.taskService.getAllTask(getAllTaskQueryDto);
  }

  @Put('/:taskId')
  @ApiOkResponse({
    description: 'Task updated successfully',
    type: UpdateTaskStatusResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
  async updateTaskStatus(
    @Param() updateTaskStatusParamDto: UpdateTaskStatusParamDto,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return this.taskService.updateTaskStatus(
      updateTaskStatusParamDto,
      updateTaskStatusDto,
    );
  }

  @Delete('/:taskId')
  @ApiOkResponse({
    description: 'Task deleted successfully',
    type: DeleteTaskResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponseDto,
  })
  async deleteTask(@Param() deleteTaskParamDto: DeleteTaskParamDto) {
    return this.taskService.deleteTask(deleteTaskParamDto);
  }
}
