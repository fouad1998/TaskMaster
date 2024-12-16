import { TaskForm } from "./types";

export function convertFormTask(formTask: TaskForm) {
  return {
    title: formTask.title,
    description: formTask.description,
    complexity: formTask.complexity,
    duration:
      formTask.duration.hours * 3600 +
      formTask.duration.minutes * 60 +
      formTask.duration.seconds,
  };
}
