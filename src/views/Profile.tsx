import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Button, Card, Icon, ListItem} from '@rneui/base';
import {useUserContext} from '../hooks/ContextHooks';
import {GlobalStyles} from '../styles/styles';

const Profile = () => {
  const {handleLogout, user} = useUserContext();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <>
      {user && (
        <Card containerStyle={GlobalStyles.card}>
          <Card.Image
            source={{uri: 'https://placekitten.com/300/300'}}
            style={{borderRadius: 10}}
          />
          <ListItem>
            <Icon name="person" />
            <ListItem.Title>{user.username}</ListItem.Title>
          </ListItem>
          <ListItem>
            <Icon name="email" />
            <ListItem.Title>{user.email}</ListItem.Title>
          </ListItem>
          <Card.Divider />
          <Button
            onPress={() => navigation.navigate('My Files')}
            buttonStyle={GlobalStyles.button}
          >
            My Files &nbsp;
            <Icon name="folder" color="white" />
          </Button >
          <Card.Divider />
          <Button onPress={handleLogout} buttonStyle={GlobalStyles.button}>
            Logout &nbsp;
            <Icon name="logout" color="white" />
          </Button>
        </Card>
      )}
    </>
  );
};

export default Profile;
