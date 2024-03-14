import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from 'react';
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
import RNPickerSelect from 'react-native-picker-select';
import {useFile, useMedia, usePlaces} from '../hooks/apiHooks';
import {useUpdateContext} from '../hooks/UpdateHook';

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const {postExpoFile} = useFile();
  const {postMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const initValues = {
    title: '',
    description: '',
    rating: '',
    place_id: '',
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
    reset();
    setImage(null);
  };

  const doUpload = async (inputs: {
    title: string;
    description: string;
    rating: string;
    place_id: string;
  }) => {
    if (!image) {
      Alert.alert('No media selected');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const newInput = {
          ...inputs,
          rating: +inputs.rating,
          place_id: 1,
        };
        const fileResponse = await postExpoFile(image.assets![0].uri, token);
        console.log('fileResponse', fileResponse);
        const mediaResponse = await postMedia(fileResponse, newInput, token);
        setUpdate(!update);
        Alert.alert(mediaResponse.message);
        navigation.navigate('Home');
        resetForm();
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const placeholder = {
    label: 'Select rating',
    value: null,
  };

  const items = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetForm();
    });

    return unsubscribe;
  }, []);

  const places = usePlaces();

  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.container}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <Card>
          {image && image.assets![0].mimeType?.includes('video') ? (
            <Video
              source={{uri: image.assets![0].uri}}
              style={{height: 300}}
              useNativeControls
            />
          ) : (
            <Card.Image
              onPress={pickImage}
              style={GlobalStyles.image}
              source={{
                uri: image
                  ? image.assets![0].uri
                  : 'https://via.placeholder.com/150?text=Choose+media',
              }}
            />
          )}
          <Text style={[GlobalStyles.text]}>Place</Text>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Place is required',
              },
            }}
            render={({field: {onChange, value}}) => (
              <RNPickerSelect
                onValueChange={onChange}
                items={places.map((place) => ({
                  label: place.place_name,
                  value: place.place_id,
                }))}
                placeholder={{label: 'Select a place', value: null}}
                value={value}
              />
            )}
            name="place_id"
          />
          <Card.Divider />
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
              />
            )}
            name="title"
          />

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
                value={value}
                errorMessage={errors.description?.message}
                multiline={true}
                numberOfLines={5}
                style={{height: 120, textAlignVertical: 'top'}}
              />
            )}
            name="description"
          />
          <Card.Divider />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <RNPickerSelect
                onValueChange={onChange}
                items={items}
                placeholder={placeholder}
                value={value}
              />
            )}
            name="rating"
          />
          <Card.Divider />
          <Button title="Choose media" onPress={pickImage} />
          <Card.Divider />
          <Button title="Upload" onPress={handleSubmit(doUpload)} />
          <Card.Divider />
          <Button title="Reset" onPress={resetForm} />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Upload;
