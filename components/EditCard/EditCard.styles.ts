import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    padding: 15,
  },
  container: {
    padding: 16,
    display: 'flex',
    gap: 16,
    flex: 1,
  },
  menu: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    display: 'flex',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    zIndex: 1000,
    backgroundColor: 'white',
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: -4 }, 
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20, 
  },

  tableInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
