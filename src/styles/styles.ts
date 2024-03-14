// styles/GlobalStyles.js
import {color} from '@rneui/base';
import {StyleSheet} from 'react-native';

export const Colors = {
  primary: '#795c34',
  white: '#fff',
  lightBrown: '#ebe0d6',
  darkBrown: '#53341D',
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 0,
  },
  LogRegCard: {
    backgroundColor: 'white',
    margin: 10,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    borderRadius: 10,
    width: 250,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  smallButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 0,
    shadowColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.lightBrown,
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
    color: Colors.primary,
    marginVertical: 5,
  },
  badge: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9,
    position: 'absolute',
    right: -5,
    top: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: 5,
  },
  dateText: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 5,
  },
});
