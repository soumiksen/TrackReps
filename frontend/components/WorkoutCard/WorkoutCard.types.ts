export type WorkoutCardProps = {
  title: string;
  reps?: string;
  volume?: string;
  id: string;
  mode: 'workout' | 'routine';
  duration: string;
};
