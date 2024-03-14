import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/base';
import {useUserContext} from '../hooks/ContextHooks';
import {Credentials} from '../types/LocalTypes';
import {GlobalStyles, Colors} from '../styles/styles';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {username: '', password: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doLogin = async (inputs: Credentials) => {
    handleLogin(inputs);
  };

  return (
    <Card containerStyle={GlobalStyles.LogRegCard}>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Username is required',
          },
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
            placeholderTextColor={Colors.placeholder}
            containerStyle={{paddingHorizontal: 0, width: '100%'}}
            inputContainerStyle={GlobalStyles.input}
            errorStyle={GlobalStyles.errorText} // Custom style for error messages
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'Password is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
            placeholderTextColor={Colors.placeholder}
            containerStyle={{paddingHorizontal: 0, width: '100%'}}
            inputContainerStyle={GlobalStyles.input}
            errorStyle={GlobalStyles.errorText}
          />
        )}
        name="password"
      />
      <Button
        title="Login"
        onPress={handleSubmit(doLogin)}
        buttonStyle={[GlobalStyles.button, {width: '100%', marginTop: 10}]}
        titleStyle={{fontWeight: 'bold'}}
      />
    </Card>
  );
};

export default LoginForm;
