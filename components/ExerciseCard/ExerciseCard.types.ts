export type ExerciseCardProps = {
  title: string;
  sets: { set: number; reps: string; lbs: string, completed?: boolean }[];
  onEditPress: () => void;
  mode: 'routine' | 'workout';
  exerciseID:  string[] | string;
  workoutID: string[] | string;
  userID: string;
};