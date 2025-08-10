import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
  },
  messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  messageText: {
    fontSize: 16,
  },
});

export default styles