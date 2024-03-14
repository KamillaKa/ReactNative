import {Button} from '@rneui/base';
import {useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity, StyleSheet} from 'react-native';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUserContext} from '../hooks/ContextHooks';
import {GlobalStyles, Colors} from '../styles/styles';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => setToggleRegister(!toggleRegister);
  const {handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={[GlobalStyles.container, styles.loginContainer]}
      activeOpacity={1}
    >
      {!toggleRegister ? (
        <LoginForm />
      ) : (
        <RegisterForm handleToggle={handleToggle} />
      )}
      <Button onPress={handleToggle} buttonStyle={GlobalStyles.button}>
        {!toggleRegister ? 'No account yet? Register here!' : 'Back to Login.'}
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 350, // Constrain the form width for tablets and larger devices
  },
});

export default Login;
