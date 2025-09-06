import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import SlideUpCard from '@/components/Animations/SlideUpCard';
import ExpandingButtonRow from '@/components/Animations/ExpandingButtonRow';
import EditCard from '@/components/EditCard/EditCard';
import ExerciseCard from '@/components/ExerciseCard/ExerciseCard';
import { getRoutineDetail, updateRoutine } from '@/services/routine';
import styles from './EditRoutineScreen.styles';

const EditRoutineScreen = () => {
  const navigation = useNavigation<any>();
  const { id } = useLocalSearchParams();
  const { uid } = useContext(AuthContext);

  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exerciseList, setExerciseList] = useState<any[]>([]);
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [sets, setSets] = useState([{ set: 1, reps: '', lbs: '', completed: false }]);
  const [showMenu, setShowMenu] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<any>(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      if (!uid || !id) return;
      const res = await getRoutineDetail(uid, id as string);
      setWorkoutTitle(res?.name);
      setExerciseList(res?.exercises || []);
    };
    fetchWorkout();
  }, [uid, id]);

  const handleEditPress = (exercise: any, index: number) => {
    setExerciseTitle(exercise.title);
    setSets(exercise.sets);
    setExerciseToEdit(exercise);
    setEditIndex(index);
    setShowMenu(true);
  };

  const handleSaveWorkout = async () => {
    await updateRoutine(uid, id as string, { name: workoutTitle, exercises: exerciseList });
    navigation.navigate('(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Input placeholder="Workout Title" value={workoutTitle} onChangeText={setWorkoutTitle} />

        <ExpandingButtonRow
          showBtn={showBtn}
          btn1={<Button onPress={() => { setShowMenu(true); setShowBtn(true); }} variant="primary">Add Exercises</Button>}
          btn2={null}
        />

        <SlideUpCard visible={showMenu}>
          <EditCard
            exerciseTitle={exerciseTitle}
            setExerciseTitle={setExerciseTitle}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
            sets={sets}
            setSets={setSets}
            setShowMenu={setShowMenu}
            mode={editIndex !== null ? 'edit' : 'add'}
            setEditIndex={setEditIndex}
            exerciseToEdit={exerciseToEdit}
            indexToEdit={editIndex}
            variant="routine"
            onSave={(updatedList) => setExerciseList(updatedList)}
          />
        </SlideUpCard>

        <FlatList
          data={exerciseList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ExerciseCard
              title={item.title}
              sets={item.sets.map((s: any) => ({ ...s, reps: String(s.reps), lbs: String(s.lbs), completed: s.completed }))}
              onEditPress={() => handleEditPress(item, index)}
              mode="routine"
              userID={uid}
              exerciseID={item.id}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />

        <View style={styles.bottomBtn}>
          <Button onPress={handleSaveWorkout}>Save Workout</Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditRoutineScreen;
