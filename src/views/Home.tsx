import {FlatList, Text} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';

const Home = () => {
  const {mediaArray} = useMedia();
  return (
    <>
      <Text>Files</Text>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <MediaListItem item={item} />}
      />
    </>
  );
};

export default Home;
