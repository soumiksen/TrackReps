import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 16,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  workoutText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 12,
    backgroundColor: '#199EFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  textColor: { color: '#FFFFFF' },
});

export default styles;