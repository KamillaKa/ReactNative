import {Image, Text, View} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';

const Single = ({route}: {route: {params: MediaItemWithOwner}}) => {
  const item = route.params;
  return (
    <View>
      <Text>{item.title}</Text>
      <Image style={{height: 500}} source={{uri: 'http:' + item.filename}} />
      <Text>{item.description}</Text>
      <Text>{new Date(item.created_at).toLocaleString('fi-FI')}</Text>
      <Text>Owner: {item.username}</Text>
      <Text>Media type: {item.media_type.split('&#x2F;')[0]}</Text>
      <Text>File size: {Math.round(item.filesize / 1024)} kB</Text>
    </View>
  );
};

export default Single;
