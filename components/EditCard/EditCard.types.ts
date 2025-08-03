export type EditCardProps = {
  exerciseTitle: string;
  setExerciseTitle: (title: string) => void;
  setExerciseList: any;
  exerciseList: any;
  setShowMenu: (show: boolean) => void;
  data: { key: string; value: string }[];
  sets: { set: number; reps: string; lbs: string }[];
  setSets: (
    sets:
      | { set: number; reps: string; lbs: string; completed?: boolean }[]
      | ((
          prev: {
            set: number;
            reps: string;
            lbs: string;
          }[]
        ) => { set: number; reps: string; lbs: string; completed?: boolean }[])
  ) => void;
  mode?: 'add' | 'edit';
  exerciseToEdit?: { title: string; sets: any[] };
  indexToEdit?: number;
  setEditIndex?: (index: number | null) => void;
  variant: 'workout' | 'routine';
};
