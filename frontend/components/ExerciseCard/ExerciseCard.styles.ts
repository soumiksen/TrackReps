// ExerciseCard.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseDetailsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseImage: {
    width: 36,
    height: 36,
    backgroundColor: 'red',
    borderRadius: 18,
    marginRight: 10,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
