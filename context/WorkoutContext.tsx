import { subscribeToWorkouts } from '@/services/workouts';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from './AuthContext';

interface Set {
  lbs: string;
  reps: string;
  sets: number;
  completed?: boolean;
}

export interface Exercise {
  title: string;
  sets: Set[];
}

interface Workout {
  name: string;
  id: string;
  exercises: Exercise[];
  timestamp: any;
  stats: {
    totalReps: any;
    totalWeight: any;
  };
  duration: any;
}

type WorkoutContextType = {
  workouts: Workout[];
};

export const WorkoutContext = createContext<WorkoutContextType>({
  workouts: [],
});

type WorkoutProviderProps = {
  children: ReactNode;
};

const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = subscribeToWorkouts(uid, (data) => {
      setWorkouts(data);
    });

    return () => unsubscribe();
  }, [uid]);

  return (
    <WorkoutContext.Provider value={{ workouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
