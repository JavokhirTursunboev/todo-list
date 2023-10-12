import customFetch from "../utilis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  return { data, isLoading, isError };
};

// =======================EDIT TASKS =======================//

export const useEditTasks = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { editTask };
};

// ===============DETELE TASKS ============================//

export const useDeleteTasks = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { deleteTask, deleteTaskLoading };
};

// ================ USE CREATE TASKS ======================//

export const useCreateTask = () => {
  const queryCliente = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),

    onSuccess: () => {
      queryCliente.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("tasks added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading };
};
