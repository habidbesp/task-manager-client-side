import { deleteTaskNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note, Project, Task } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
  projectId: Project["_id"];
  taskId: Task["_id"];
};

export default function NoteDetail({
  note,
  projectId,
  taskId,
}: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTaskNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(data);
    },
  });

  const handelClick = () => {
    mutate({ projectId, taskId, noteId: note._id });
  };
  if (isLoading) return "Loading...";

  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} by:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>

      {canDelete && (
        <button
          className="bg-red-500 hover:bg-red-600 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          onClick={handelClick}
        >
          Delete
        </button>
      )}
    </div>
  );
}
