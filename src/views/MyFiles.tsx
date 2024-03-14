import {FlatList, View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Text} from '@rneui/base';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {useUserContext} from '../hooks/ContextHooks';
import {GlobalStyles} from '../styles/styles';

const MyFiles = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray} = useMedia();
  const {user} = useUserContext();

  if (!user) {
    return (
      <View>
        <Text>No Media items uploaded yet.</Text>
      </View>
    );
  }
  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);

  return (
    <>
      <FlatList
        style={GlobalStyles.container}
        data={myMedia}
        renderItem={({item}) => (
          <MediaListItem
            navigation={navigation}
            item={item}
            containerStyle={{
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
          />
        )}
      />
    </>
  );
};

export default MyFiles;
