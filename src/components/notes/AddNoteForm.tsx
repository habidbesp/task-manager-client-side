import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { NoteFormData, Project, Task } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskNote } from "@/api/NoteApi";
import { toast } from "react-toastify";

type AddNoteFormParams = {
  projectId: Project["_id"];
  taskId: Task["_id"];
};

export default function AddNoteForm({ projectId, taskId }: AddNoteFormParams) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteFormData>({
    defaultValues: {
      content: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTaskNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(data);
      reset();
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({
      projectId,
      taskId,
      formData,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Add a Note
        </label>
        <input
          id="content"
          type="text"
          placeholder="Note content"
          className="w-full p-3 border border-gray-300"
          {...register("content", {
            required: "Note content is required",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Add Note"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
}
