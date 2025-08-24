import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'flex-end', // ensures input stays at the bottom
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: 'flex-end', // messages start from bottom
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  inlineButtonContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
  },
});

export default styles;
