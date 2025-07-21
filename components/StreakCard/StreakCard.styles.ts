import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  StreakCard: {
    backgroundColor: '#199EFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  streakContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  streak: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
});

export default styles;