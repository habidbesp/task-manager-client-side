import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, TeamMemberForm, teamMemberSchema } from "../types";

export async function findUserByEmail({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: TeamMemberForm;
}) {
  try {
    const { data } = await api.post(
      `projects/${projectId}/team/find`,
      formData
    );
    const response = teamMemberSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
