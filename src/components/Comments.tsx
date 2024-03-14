import {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Input, Card, Button, ListItem} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useUserContext} from '../hooks/ContextHooks';
import {Comment, MediaItemWithOwner} from '../types/DBTypes';
import {useComment} from '../hooks/apiHooks';
import {GlobalStyles, Colors} from '../styles/styles';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const [comments, setComments] = useState<
    (Comment & {
      username: string;
    })[]
  >([]);
  const {user} = useUserContext();
  const {getCommentsByMediaId, postComment} = useComment();
  const navigation = useNavigation();

  const initValues = {comment_text: ''};

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doComment = async (inputs: {comment_text: string}) => {
    const token = await AsyncStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(inputs.comment_text, item.media_id, token);
      await getComments();
      // resetoi lomake
      reset();
    } catch (error) {
      console.error('postComment failed', error);
    }
  };

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      console.log('getComments failed', error);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();

    const unsubscribe = navigation.addListener('focus', () => {
      reset();
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <Card containerStyle={GlobalStyles.card}>
          <Card.Title style={GlobalStyles.title}>Comments</Card.Title>
          {comments.map((comment, index) => (
            <ListItem
              key={comment.comment_id || index}
              bottomDivider
              containerStyle={GlobalStyles.listItem}
            >
              <ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}
                >
                  <ListItem.Title
                    style={[
                      GlobalStyles.title,
                      {marginVertical: 0, paddingEnd: 5, fontSize: 16},
                    ]}
                  >
                    {comment.username}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {new Date(comment.created_at!).toLocaleDateString('fi-FI')}{' '}
                  </ListItem.Subtitle>
                </View>
                <ListItem.Title style={GlobalStyles.text}>
                  {comment.comment_text}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      )}
      {user && (
        <Card containerStyle={GlobalStyles.card}>
          <Card.Title style={GlobalStyles.title}>Post Comment</Card.Title>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Comment is required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.comment_text?.message}
                placeholder="Write a comment..."
                multiline={true}
                inputStyle={{fontSize: 14}}
                inputContainerStyle={[
                  GlobalStyles.input,
                  {borderBottomWidth: 0},
                ]}
              />
            )}
            name="comment_text"
          />
          <Button
            onPress={handleSubmit(doComment)}
            title={'Post'}
            buttonStyle={GlobalStyles.button}
            titleStyle={{color: 'white', fontSize: 14}}
          />
          <Card.Divider />
        </Card>
      )}
    </>
  );
};

export default Comments;
