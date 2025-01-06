import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "@/types/index";
import { isAxiosError } from "axios";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
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

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPI, "projectId" | "taskId">) {
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);
    const response = taskSchema.safeParse(data);

    // console.log(response.data);
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

export async function updateStatus(
  taskParams: Pick<TaskAPI, "projectId" | "taskId" | "status">
) {
  const { projectId, taskId, status } = taskParams;
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks/${taskId}/status`,
      { status }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
