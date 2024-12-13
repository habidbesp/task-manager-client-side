import { api } from "@/lib/axios";
import { Project, TaskFormData } from "../types";
import { isAxiosError } from "axios";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
};
export async function createTask(
  createTaskParams: Pick<TaskAPI, "formData" | "projectId">
) {
  const { projectId, formData } = createTaskParams;
  try {
    const { data } = await api.post(`/projects/${projectId}/tasks`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
