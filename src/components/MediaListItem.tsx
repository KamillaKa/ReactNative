import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Card, Icon, ListItem, Button, Avatar, Text} from '@rneui/base';
import {ViewStyle, View} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {GlobalStyles} from '../styles/styles';
import Likes from './Likes';

type Props = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
  containerStyle?: ViewStyle;
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Icon key={i} name="star" type="ionicon" color="#FFD700" size={20} />,
    );
  }
  return stars;
};

const MediaListItem = ({item, navigation}: Props) => {
  // tai propsin sijasta hookilla const navigation = useNavigation();
  const {user} = useUserContext();

  return (
    <Card containerStyle={GlobalStyles.card}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar
          size={50}
          icon={{
            name: item.media_type.includes('image') ? 'image' : 'film',
            type: 'ionicon',
            color: '#333',
          }}
        />
        <Text style={[GlobalStyles.title, {paddingRight: 10}]}>
          {item.username}
        </Text>
        {renderStars(item.rating)}
      </View>
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
                  buttonStyle={GlobalStyles.smallButton}
                  onPress={() => {
                    navigation.navigate('Modify', item);
                  }}
                >
                  <Icon type="ionicon" name="create" color="white" />
                </Button>
                <Button
                  buttonStyle={GlobalStyles.smallButton}
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
                <ListItem.Title>Nothing to see here O.O</ListItem.Title>
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

        <ListItem.Content>
          <Text h4>{item.title}</Text>
          <Text>
            {new Date(item.created_at).toLocaleString('fi-FI')}
            {'\n'}
          </Text>
        </ListItem.Content>

        <Likes item={item} />
      </ListItem.Swipeable>
    </Card>
  );
};
export default MediaListItem;
