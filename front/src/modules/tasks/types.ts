export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  complexity: number;
  duration: number;
  points: number;
};
export type Tasks = Task[];

export type TaskForm = {
  id: number;
  title: string;
  description: string;
  complexity: number;
  duration: { hours: number; minutes: number; seconds: number };
};
