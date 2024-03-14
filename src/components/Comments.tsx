import {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Input, Card, Button, ListItem} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
          <Card.Title style={{fontSize: 16, color: Colors.text}}>
            Comments
          </Card.Title>
          {comments.map((comment, index) => (
            <ListItem
              key={comment.comment_id || index}
              bottomDivider
              containerStyle={{paddingVertical: 5}}
            >
              <ListItem.Content>
                <ListItem.Subtitle>
                  {new Date(comment.created_at!).toLocaleDateString('fi-FI')}{' '}
                </ListItem.Subtitle>
                <ListItem.Title style={{fontWeight: 'bold'}}>
                  {comment.username}
                </ListItem.Title>
                <ListItem.Title>{comment.comment_text}</ListItem.Title>
                <ListItem.Title style={{fontSize: 12, color: '#8e8e8e'}}>
                  {new Date(comment.created_at).toLocaleDateString('fi-FI')}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      )}
      {user && (
        <Card containerStyle={[GlobalStyles.card, {marginTop: 10}]}>
          <Card.Title
            style={{
              marginHorizontal: 10,
              marginBottom: 5,
              fontSize: 16,
              color: Colors.text,
            }}
          >
            Post Comment
          </Card.Title>
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
