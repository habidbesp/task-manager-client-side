import { api } from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
};
export async function createTask(
  taskParams: Pick<TaskAPI, "formData" | "projectId">
) {
  const { projectId, formData } = taskParams;
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTaskById(
  taskParams: Pick<TaskAPI, "projectId" | "taskId">
) {
  const { projectId, taskId } = taskParams;
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);
    const response = taskSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTask(
  taskParams: Pick<TaskAPI, "projectId" | "taskId" | "formData">
) {
  const { projectId, taskId, formData } = taskParams;
  try {
    const { data } = await api.put<string>(
      `/projects/${projectId}/tasks/${taskId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function deleteTask(
  taskParams: Pick<TaskAPI, "projectId" | "taskId">
) {
  const { projectId, taskId } = taskParams;
  try {
    const { data } = await api.delete<string>(
      `/projects/${projectId}/tasks/${taskId}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
