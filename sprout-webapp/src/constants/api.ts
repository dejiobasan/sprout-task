export const API_BASE_URL = "/api/v1";

export const endpoints = {
  task: {
    createTask: "/tasks",
    updateTask: "/tasks/:taskId",
    deleteTask: "/tasks/:taskId",
    getAllTasks: "/tasks",
  },
};
