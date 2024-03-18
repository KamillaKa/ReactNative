import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/base';
import {useEffect} from 'react';
import {
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useMedia} from '../hooks/apiHooks';
import {useUpdateContext} from '../hooks/UpdateHook';
import {MediaItem, MediaItemWithOwner} from '../types/DBTypes';
import {GlobalStyles} from '../styles/styles';

const Modify = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;
  const {putMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const initValues: Pick<MediaItem, 'title' | 'description'> = {
    title: item.title,
    description: item.description,
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: initValues,
  });

  const resetForm = () => {
    reset(initValues);
    console.log(initValues);
  };

  const doModify = async (inputs: Pick<MediaItem, 'title' | 'description'>) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const mediaResponse = await putMedia(inputs, token, item.media_id);
        setUpdate(!update);
        Alert.alert(mediaResponse.message);
        navigation.navigate('My Files');
        resetForm();
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetForm();
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <Card containerStyle={GlobalStyles.card}>
          {item && item.media_type.includes('video') ? (
            <Video
              source={{uri: 'http:' + item.filename}}
              style={{height: 300}}
              useNativeControls
            />
          ) : (
            <Card.Image
              style={{aspectRatio: 1, height: 300, borderRadius: 10}}
              source={{
                uri: 'http:' + item.filename,
              }}
            />
          )}
          <Card.Divider />
          <Text style={[GlobalStyles.text]}>Title</Text>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Title is required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title?.message}
                inputContainerStyle={GlobalStyles.input}
              />
            )}
            name="title"
          />

          <Text style={[GlobalStyles.text]}>Description</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 1000,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value!}
                errorMessage={errors.description?.message}
                multiline={true}
                numberOfLines={5}
                inputContainerStyle={GlobalStyles.input}
              />
            )}
            name="description"
          />
          <Button
            title="Modify"
            onPress={handleSubmit(doModify)}
            buttonStyle={GlobalStyles.button}
          />
          <Card.Divider />
          <Button
            title="Reset"
            onPress={resetForm}
            buttonStyle={[GlobalStyles.button, {backgroundColor: 'red'}]}
          />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Modify;
