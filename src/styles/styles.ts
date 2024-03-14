// styles/GlobalStyles.js
import {StyleSheet} from 'react-native';

export const Colors = {
  // #563d2d
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#3897f0',
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
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    marginBottom: 2,
  },
  text: {
    fontSize: 16,
    color: '#262626',
    marginBottom: 5,
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#262626',
    marginVertical: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 5,
  },
});
