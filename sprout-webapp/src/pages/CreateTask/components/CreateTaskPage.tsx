import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCreateTaskMutation } from "@/redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setLoading } from "@/redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(5, "Description must be at least 5 characters")
      .max(1000, "Description must be at most 1000 characters")
      .required("Description is required"),
  });

  const handleSubmit = async (values: {
    title: string;
    description: string;
  }) => {
    try {
      dispatch(setLoading(true));
      const response = await createTask(values).unwrap();
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-sm border rounded-2xl p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Create Task</h1>
          <p className="text-sm text-gray-500">
            Fill in the details to create a new task
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Title</label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter task title"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Task"}
                </Button>

                <Button type="button" variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTaskPage;
