export type EditCardProps = {
  exerciseTitle: string;
  setExerciseTitle: (title: string) => void;
  setExerciseList: any;
  exerciseList: any;
  setShowMenu: (show: boolean) => void;
  sets: { set: number; reps: string; lbs: string }[];
  setSets: any;
  mode?: 'add' | 'edit';
  exerciseToEdit?: { title: string; sets: any[] };
  indexToEdit?: number;
  setEditIndex?: (index: number | null) => void;
  variant: 'workout' | 'routine';
  onSave?: (updatedList: any[]) => void;
};
