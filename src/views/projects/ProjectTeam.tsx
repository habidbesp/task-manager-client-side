import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProjectTeam() {
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  return (
    <>
      <h1 className="text-5xl font-black">Manage team</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Manage this project's team.
      </p>

      <nav className="my-5 flex gap-3">
        <button
          type="button"
          onClick={() => navigate("?addMember=true")}
          className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Add Collaborator
        </button>
        <Link
          to={`/projects/${projectId}`}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        >
          Project Overview
        </Link>
      </nav>
      <AddMemberModal />
    </>
  );
}
