import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskStatus, required: false, default: TaskStatus.TODO })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class CreateTaskResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Task data',
    example: {
      taskId: '12345678-1234-1234-1234-123456789012',
      title: 'Go to the gym',
      description: 'I need to go the gym by 10am',
      status: 'TODO',
    },
  })
  data: {
    taskId: string;
    title: string;
    description: string;
    status: TaskStatus;
  };
  @ApiProperty()
  timestamp: string;
}

export class GetAllTaskQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  page?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  limit?: string;
}

export class GetAllTaskResponseDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty({
    description: 'Task data',
    example: {
      tasks: [
        {
          taskId: '12345678-1234-1234-1234-123456789012',
          title: 'Go to the gym',
          description: 'I need to go the gym by 10am',
          status: 'TODO',
          createdAt: '2022-01-01T00:00:00.000Z',
        },
      ],
      totalTasks: 1,
      currentPage: 1,
      totalPages: 1,
    },
  })
  data: {
    tasks: {
      taskId: string;
      title: string;
      description: string;
      status: string;
      createdAt: string;
    }[];
    totalTasks: number;
    currentPage: number;
    totalPages: number;
  };
  @ApiProperty()
  timestamp: string;
}


export class UpdateTaskStatusParamDto {
  @ApiProperty({
    description: 'Task ID',
    example: '12345678-1234-1234-1234-123456789012',
  })
  @IsUUID()
  taskId: string;
}
export class UpdateTaskStatusDto {
  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskStatusResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Task data',
    example: {
      taskId: '12345678-1234-1234-1234-123456789012',
      title: 'Go to the gym',
      description: 'I need to go the gym by 10am',
      status: 'IN_PROGRESS',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
  })
  data: {
    taskId: string;
    title: string;
    description: string;
    status: TaskStatus;
    updatedAt: string;
  };

  @ApiProperty()
  timestamp: string;
}

export class DeleteTaskParamDto {
  @ApiProperty({
    description: 'Task ID',
    example: '12345678-1234-1234-1234-123456789012',
  })
  @IsUUID()
  taskId: string;
}

export class DeleteTaskResponseDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  timestamp: string;
}
    