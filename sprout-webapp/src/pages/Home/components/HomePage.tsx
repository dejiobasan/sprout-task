import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux";
import { PageLoader } from "@/providers";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "@/redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { TaskStatus } from "@/types";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 6;
  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("TODO");

  const openUpdateDialog = (taskId: string, currentStatus: TaskStatus) => {
    setSelectedTaskId(taskId);
    setSelectedStatus(currentStatus);
    setOpen(true);
  };

  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const { data, isLoading, error, isFetching } = useGetTasksQuery({
    page,
    limit,
  });

  const tasks = data?.data?.tasks || [];
  const totalPages = data?.data?.totalPages || 1;

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-medium">Something went wrong!</p>
      </div>
    );
  }

  const handleDelete = async (taskId: string) => {
    try {
      dispatch(setLoading(true));
      const response = await deleteTask(taskId).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleUpdateSubmit = async () => {
    if (!selectedTaskId) return;

    try {
      dispatch(setLoading(true));
      const response = await updateTask({
        taskId: selectedTaskId,
        status: selectedStatus,
      }).unwrap();

      toast.success(response.message);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <Button onClick={() => navigate("/create-task")}>Create Task</Button>
        </div>
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <CheckCircle2 className="size-16 text-gray-400" />
            <h2 className="text-lg font-semibold">No Tasks Yet</h2>
            <p className="text-sm text-gray-500">
              You haven't created any tasks yet.
            </p>
            <Button onClick={() => navigate("/create-task")}>
              Create your first task
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {tasks.map(
                (task: {
                  taskId: string;
                  title: string;
                  description: string;
                  status: string;
                }) => (
                  <Card key={task.taskId}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{task.title}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.status === "DONE"
                              ? "bg-green-100 text-green-600"
                              : task.status === "IN_PROGRESS"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {task.description || "No description"}
                      </p>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          openUpdateDialog(
                            task.taskId,
                            task.status as TaskStatus,
                          )
                        }
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        disabled={isDeleting}
                        onClick={() => handleDelete(task.taskId)}
                        variant="destructive"
                        size="sm"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </CardFooter>
                  </Card>
                ),
              )}
            </div>
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <Button
                  variant="outline"
                  disabled={page === totalPages || isFetching}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Task Status</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Select a new status for this task
            </p>

            <Select
              value={selectedStatus}
              onValueChange={(value: TaskStatus) => setSelectedStatus(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="TODO">TODO</SelectItem>
                <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                <SelectItem value="DONE">DONE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={handleUpdateSubmit}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
