export type ExerciseCardProps = {
  title: string;
  sets: { set: number; reps: string; lbs: string }[];
  onEditPress: () => void;
};