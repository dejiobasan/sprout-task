import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./BaseQuery";
import { endpoints } from "@/constants";
import {
  type GetAllTasksResponse,
  type CreateTaskResponse,
  type UpdateTaskResponse,
  type BaseResponse,
} from "@/types";

export const taskApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "taskApi",
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<
      GetAllTasksResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: endpoints.task.getAllTasks,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Task"],
      transformResponse: (response: GetAllTasksResponse) => response,
    }),
    createTask: builder.mutation<
      CreateTaskResponse,
      {
        title: string;
        description: string;
        status?: string;
      }
    >({
      query: (data) => ({
        url: endpoints.task.createTask,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
      transformResponse: (response: CreateTaskResponse) => response,
    }),
    updateTask: builder.mutation<UpdateTaskResponse, {taskId: string, status: string}>({
      query: ({taskId, status}) => ({
        url: endpoints.task.updateTask.replace(":taskId", taskId),
        method: "PUT",
        body: {status}
      }),
      invalidatesTags: ["Task"],
      transformResponse: (response: UpdateTaskResponse) => response,
    }),
    deleteTask: builder.mutation<BaseResponse, string>({
      query: (taskId: string) => ({
        url: endpoints.task.deleteTask.replace(":taskId", taskId),
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
      transformResponse: (response: BaseResponse) => response,
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
