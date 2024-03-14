// styles/GlobalStyles.js
import {StyleSheet} from 'react-native';

export const Colors = {
  background: '#FFFFFF',
  primary: '#3897f0',
  text: '#262626',
  border: '#DBDBDB',
  iconInactive: '#AAB8C2',
  inputBackground: '#FAFAFA', // Light grey or white for input background
  inputBorder: '#DBDBDB', // Light grey for border
  inputText: '#262626', // Dark grey or black for text
  placeholder: '#666', // Placeholder text color
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 8,
    borderWidth: 0,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.41,
    elevation: 2,
  },
  LogRegCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 8,
    borderWidth: 0,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1.41,
    elevation: 2,
    width: '80%',
  },
  text: {
    color: Colors.text,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    borderRadius: 5, // Rounded corners for input fields
    borderWidth: 0,
    padding: 10,
    marginBottom: 10,
    color: Colors.inputText,
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    marginBottom: 15,
    height: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
