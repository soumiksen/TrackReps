import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
  },
  verticalProgress: {
    width: 40,
    height: 150,
    backgroundColor: '#E7E7E7',
    borderRadius: 1000,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  fill: {
    backgroundColor: '#568FF8',
    width: '100%',
    borderRadius: 1000,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    color: '#919191'
  },
  activeLabel: {
    color: '#568FF8',
    fontWeight: 'bold',
  },
});

export default styles;
