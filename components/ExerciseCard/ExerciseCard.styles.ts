import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  reps: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    borderColor: '#199EFF',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exerciseDetailsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exerciseImage: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
