export interface ExerciseCardProps {
  title: string;
  sets: Array<{
    set?: number;
    reps: string | number;
    lbs: string | number;
    completed: boolean;
  }>;
  onEditPress: () => void;
  exerciseID: string;
  workoutID?: string; // Made optional since it might not exist during seamless creation
  userID: string;
  mode: 'workout' | 'routine' | string;
  onSetComplete?: (setIndex: number, completed: boolean) => void; // New optional prop
}