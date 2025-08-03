import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
  },
  container: {
    padding: 10,
    display: 'flex',
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
  },
  bottomBtn: {
    marginBottom: 30,
  },
});
export default styles;
