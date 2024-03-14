import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Card, Icon, ListItem, Button, Avatar, Text} from '@rneui/base';
import {ViewStyle} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {GlobalStyles} from '../styles/styles';
import Likes from './Likes';

type Props = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
  containerStyle?: ViewStyle;
};

const MediaListItem = ({item, navigation, containerStyle}: Props) => {
  // tai propsin sijasta hookilla const navigation = useNavigation();
  const {user} = useUserContext();
  return (
    <Card containerStyle={GlobalStyles.card}>
      <Card.Image
        onPress={() => {
          navigation.navigate('Single Media', item);
        }}
        style={{aspectRatio: 1, height: 300, borderRadius: 10}}
        source={{uri: item.thumbnail}}
      />
      <Card.Divider />
      <ListItem.Swipeable
        onSwipeBegin={(evt) => {
          console.log(evt);
        }}
        leftContent={(reset) => (
          <ListItem>
            {user && user.user_id === item.user_id ? (
              <>
                <Button
                  buttonStyle={GlobalStyles.button}
                  onPress={() => {
                    navigation.navigate('Modify', item);
                  }}
                >
                  <Icon type="ionicon" name="create" color="white" />
                </Button>
                <Button
                  buttonStyle={GlobalStyles.button}
                  color="error"
                  onPress={() => {
                    console.log('delete');
                  }}
                >
                  {' '}
                  <Icon type="ionicon" name="trash" color="white" />
                </Button>
              </>
            ) : (
              <ListItem.Content>
                <ListItem.Title>Kukkuu</ListItem.Title>
              </ListItem.Content>
            )}
          </ListItem>
        )}
      >
        {user && user.user_id === item.user_id && (
          <ListItem.Chevron
            color="black"
            style={{transform: 'rotate(180deg)'}}
          />
        )}
        <Avatar
          size={50}
          icon={{
            name: item.media_type.includes('image') ? 'image' : 'film',
            type: 'ionicon',
            color: '#333',
          }}
        />
        <ListItem.Content>
          <Text h4>{item.title}</Text>
          <Text>
            By: {item.username}, at:{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </Text>
        </ListItem.Content>

        <Likes item={item} />
      </ListItem.Swipeable>
    </Card>
  );
};
export default MediaListItem;
