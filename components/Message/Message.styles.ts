import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
  },
  messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7E7E7',
  },
  messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#568FF8',
    color: 'white'
  },
  messageText: {
    fontSize: 16,
  },
  messageRightText: {
    color: 'white'
  },
  messageLeftText: {
    color: 'black'
  }
});

export default styles