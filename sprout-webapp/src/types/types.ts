export interface BaseResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
}

export interface ApiResponse<T> extends BaseResponse {
  data: T;
}

export interface Task {
  taskId: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface GetAllTasksData {
  tasks: Task[];
  totalTasks: number;
  currentPage: number;
  totalPages: number;
}

export interface GetAllTasksResponse extends ApiResponse<GetAllTasksData> {}

export interface CreateTaskData {
  taskId: string;
  title: string;
  description: string;
  status: string;
}

export interface CreateTaskResponse extends ApiResponse<CreateTaskData> {}

export interface UpdateTaskData {
  taskId: string;
  title: string;
  description: string;
  status: string;
  updatedAt: string;
}

export interface UpdateTaskResponse extends ApiResponse<UpdateTaskData> {}

export const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
