export type EditCardProps = {
  exerciseTitle: string;
  setExerciseTitle: (title: string) => void;
  setExerciseList: (list: any[]) => void;
  exerciseList: any[];
  setShowMenu: (show: boolean) => void;
  data: { key: string; value: string }[];
  sets: { set: number; reps: string; lbs: string }[];
  setSets: (
    sets:
      | { set: number; reps: string; lbs: string }[]
      | ((
          prev: { set: number; reps: string; lbs: string }[]
        ) => { set: number; reps: string; lbs: string }[])
  ) => void;
  mode?: 'add' | 'edit';
  exerciseToEdit?: { title: string; sets: any[] };
  indexToEdit?: number;
  setEditIndex?: (index: number | null) => void;
};