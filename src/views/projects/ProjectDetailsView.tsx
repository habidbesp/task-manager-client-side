import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
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
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("?newTask=true")}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Add Task
          </button>
        </nav>
        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
      </>
    );
}
