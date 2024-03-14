import {Controller, useForm} from 'react-hook-form';
import {TouchableOpacity, Keyboard, ScrollView, Alert} from 'react-native';
import {Button, Card, Input, Text} from '@rneui/base';
import {useUserContext} from '../hooks/ContextHooks';
import {Credentials} from '../types/LocalTypes';
import {GlobalStyles} from '../styles/styles';

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
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <Card containerStyle={GlobalStyles.LogRegCard}>
          <Text style={GlobalStyles.text}>Username</Text>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Username is required',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                errorMessage={errors.username?.message}
                containerStyle={{paddingHorizontal: 0, width: '100%'}}
                inputContainerStyle={GlobalStyles.input}
                errorStyle={GlobalStyles.errorText}
              />
            )}
            name="username"
          />

          <Text style={GlobalStyles.text}>Password</Text>
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
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginForm;
