import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon, Badge} from '@rneui/base';
import {useEffect, useReducer} from 'react';
import {useLike} from '../hooks/apiHooks';
import {Like, MediaItemWithOwner} from '../types/DBTypes';
import {GlobalStyles, Colors} from '../styles/styles';

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  count?: number;
  like?: Like | null;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state; // no change if action.like is undefined
  }
  return state; // Return the unchanged state if the action type is not recognized
};

const Likes = ({item}: {item: MediaItemWithOwner}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {getUserLike, getCountByMediaId, postLike, deleteLike} = useLike();

  // get user like
  const getLikes = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(item.media_id, token);
      likeDispatch({type: 'like', like: userLike});
      const countResponse = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      // FAKE like object for testing only
      //likeDispatch({type: 'like', like: {like_id: 3, media_id: 5, user_id: 3, created_at: new Date()}});
      console.log('get user like error', (e as Error).message);
    }
  };

  // get like count
  const getLikeCount = async () => {
    try {
      const countResponse = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (e) {
      likeDispatch({type: 'setLikeCount', count: 0});
      console.log('get user like error', (e as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item]);

  const handleLike = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      if (likeState.userLike) {
        await deleteLike(likeState.userLike.like_id, token);
      } else {
        await postLike(item.media_id, token);
      }
      getLikes(); // Refresh likes state
    } catch (error) {
      console.error('Like action error:', error);
    }
  };

  console.log(likeState);

  return (
    <Button
      onPress={handleLike}
      type="clear"
      containerStyle={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
      }}
      buttonStyle={GlobalStyles.button}
    >
      <Icon
        type="material-community"
        color={likeState.userLike ? Colors.primary : Colors.iconInactive}
        name={likeState.userLike ? 'heart' : 'heart-outline'}
        size={30}
      />
      <Badge
        status="error"
        value={likeState.count}
        containerStyle={{position: 'absolute', top: -4, right: -4}}
        textStyle={{color: 'white'}}
      />
    </Button>
  );
};

export default Likes;
