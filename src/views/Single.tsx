import React, {useEffect, useState} from 'react';
import {Card, Text, ListItem, Icon} from '@rneui/themed';
import {Video, ResizeMode} from 'expo-av';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {usePlaces} from '../hooks/apiHooks';
import {MediaItemWithOwner} from '../types/DBTypes';
import Comments from '../components/Comments';
import {GlobalStyles, Colors} from '../styles/styles';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;
  const [fileType, fileFormat] = item.media_type.split('/');
  const places = usePlaces();
  const [placeName, setPlaceName] = useState<string>('');

  useEffect(() => {
    const place = places.find((p) => p.place_id === item.place_id);
    if (place) {
      setPlaceName(place.place_name);
    }
  }, [places, item.place_id]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card containerStyle={GlobalStyles.card}>
            <Card.Title style={GlobalStyles.title}>{item.title}</Card.Title>
            {fileType === 'image' ? (
              <Card.Image
                style={GlobalStyles.image}
                resizeMode="contain"
                source={{uri: item.filename}}
              />
            ) : (
              <Video
                style={{height: 350}}
                source={{uri: item.filename}}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
              />
            )}
            <Text style={[GlobalStyles.title, {marginLeft: 13}]}>
              {placeName}
            </Text>
            <Card.FeaturedSubtitle
              style={[
                GlobalStyles.text,
                {paddingHorizontal: 15, fontSize: 16, fontWeight: 'bold'},
              ]}
            >
              {'\n'}
              Description:
              {'\n'}
              <Text style={{fontWeight: 'normal', fontSize: 15}}>
                {'\n'}
                {item.description}
                {'\n'}
              </Text>
            </Card.FeaturedSubtitle>
            <ListItem>
              <Icon name="star" color="#FFF200" />
              <Text>{item.rating}</Text>
            </ListItem>
            <ListItem>
              <Icon name="today" color={Colors.darkBrown} />
              <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
            </ListItem>
            <ListItem>
              <Icon name="person" color={Colors.darkBrown} />
              <Text>{item.username}</Text>
            </ListItem>
            <ListItem>
              <Icon name="image" color={Colors.darkBrown} />
              <Text>
                {fileType} / {fileFormat}, {Math.round(item.filesize / 1024)} kB
              </Text>
            </ListItem>
            <Comments item={item} />
          </Card>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Single;
