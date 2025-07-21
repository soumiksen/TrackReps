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
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1000,
    borderBottomColor: 'transparent',
    backgroundColor: 'white',
  },
  tableInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
