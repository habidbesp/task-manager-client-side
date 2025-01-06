import { useLocation, useParams } from "react-router-dom";
import AddNoteForm from "./AddNoteForm";
import { Task } from "@/types/index";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
  notes: Task["notes"];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  return (
    <>
      <AddNoteForm projectId={projectId} taskId={taskId} />

      <div className="divide-y divide-gray-100 mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 my-5">Notes:</p>
            {notes.map((note) => (
              <NoteDetail
                key={note._id}
                note={note}
                projectId={projectId}
                taskId={taskId}
              />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center pt-3">
            This task has no notes.{" "}
          </p>
        )}
      </div>
    </>
  );
}
