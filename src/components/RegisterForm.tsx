import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input, Text} from '@rneui/base';
import {TouchableOpacity, Keyboard, ScrollView, Alert} from 'react-native';
import {useUser} from '../hooks/apiHooks';
import {GlobalStyles} from '../styles/styles';

const RegisterForm = ({handleToggle}: {handleToggle: () => void}) => {
  const {postUser, getUsernameAvailable, getEmailAvailable} = useUser();
  const initValues = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: initValues,
    mode: 'onBlur',
  });

  const doRegister = async (inputs: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  }) => {
    try {
      delete inputs.confirmPassword;
      await postUser(inputs);
      Alert.alert('User created', 'You can now login');
      handleToggle();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
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
              validate: async (value) => {
                try {
                  const {available} = await getUsernameAvailable(value);
                  console.log('username available?', value, available);
                  return available ? available : 'Username taken';
                } catch (error) {
                  console.log((error as Error).message);
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
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
              // pattern: {
              //   value:
              //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
              //   message:
              //     'Password must contain at least 5 characters, 1 special character (@, $, !, %, *, #, ?, &), and 1 number',
              // },
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

          <Text style={GlobalStyles.text}>Confirm password</Text>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Password is required'},
              validate: (value) =>
                value === getValues().password
                  ? true
                  : 'Passwords do not match',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Confirm password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmPassword?.message}
                containerStyle={{paddingHorizontal: 0, width: '100%'}}
                inputContainerStyle={GlobalStyles.input}
                errorStyle={GlobalStyles.errorText}
              />
            )}
            name="confirmPassword"
          />

          <Text style={GlobalStyles.text}>Email</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: {value: true, message: 'Email is required'},
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address',
              },
              validate: async (value) => {
                try {
                  const {available} = await getEmailAvailable(value);
                  return available ? available : 'Email taken';
                } catch (error) {
                  console.log((error as Error).message);
                }
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
                containerStyle={{paddingHorizontal: 0, width: '100%'}}
                inputContainerStyle={GlobalStyles.input}
                errorStyle={GlobalStyles.errorText}
              />
            )}
            name="email"
          />
          <Button
            title="Register"
            onPress={handleSubmit(doRegister)}
            buttonStyle={GlobalStyles.button}
          />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterForm;
