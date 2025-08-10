import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  messagesList: {
    padding: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inlineButtonContainer: {
    marginBottom: 10,
    marginTop: 0,
    alignItems: 'flex-start',
  },
});

export default styles;
