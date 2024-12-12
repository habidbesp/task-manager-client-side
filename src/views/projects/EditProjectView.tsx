import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditProjectView() {
  const { projectId } = useParams();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: [`editProject`, projectId],
    queryFn: async () => {
      if (projectId) {
        const data = await getProjectById(projectId);
        return data;
      }
    },
    retry: false,
  });

  if (isLoading) return <div>"Loading..."</div>;
  if (isError) return <Navigate to="/404" />;

  if (data && projectId)
    return <EditProjectForm data={data} projectId={projectId} />;
}
