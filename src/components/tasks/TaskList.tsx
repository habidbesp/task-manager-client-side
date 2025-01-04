import { Task } from "@/types/index";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};

type GroupedTask = {
  [key: string]: Task[];
};

const initialStatusGroups: GroupedTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

export const statusTranslations: { [key: string]: string } = {
  pending: "Pending",
  onHold: "On Hold",
  inProgress: "In Progress",
  underReview: "Under Review",
  completed: "Completed",
};

const colorTranslations: { [key: string]: string } = {
  pending: "border-t-orange-500",
  onHold: "border-t-gray-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-purple-500",
  completed: "border-t-green-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tasks</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3
              className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${colorTranslations[status]}`}
            >
              {statusTranslations[status]}
            </h3>
            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  There are no tasks
                </li>
              ) : (
                tasks.map((task) => (
                  <TaskCard key={task._id} task={task} canEdit={canEdit} />
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
