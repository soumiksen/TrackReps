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
    fontSize: 20,
    fontWeight: 'bold',
  },
  workoutText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addButton: {
    padding: 12,
    backgroundColor: '#199EFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  textColor: { color: '#FFFFFF' },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  btnWrapper: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#E7E7E7',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeSubText: {
    color: '#292929',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  statsContainerLeft: {
    flex: 1,
  },
  statsContainerRight: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
  },
  weeklyStatsVertical: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default styles;
