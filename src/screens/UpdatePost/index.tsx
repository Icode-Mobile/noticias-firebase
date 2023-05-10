import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { UpdatePostForm } from 'components/UpdatePostForm';
import firestore from '@react-native-firebase/firestore';

type DetailsPostParamsProps = {
  id: string;
};

type PostProps = {
  title: string;
  message: string;
  image: string;
};

export default function UpdatePost() {
  const { id } = useRoute().params as DetailsPostParamsProps;
  const [post, setPost] = useState<PostProps>();
  const [postId, setPostId] = useState<string>('');

  useEffect(() => {
    const subListener = firestore()
      .collection('blogs')
      .doc(id)
      .onSnapshot((snapshot) => {
        if (snapshot) {
          setPost(snapshot.data() as PostProps);
          setPostId(snapshot.id);
        }
      });
    return () => subListener();
  }, [id]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{
          paddingTop: 40,
          backgroundColor: '#295094',
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          width: '100%',
        }}
        nestedScrollEnabled
      >
        <Text
          style={{
            fontFamily: 'Rubik_700Bold',
            color: '#fff',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Atualizando
        </Text>
        <View
          style={{
            marginTop: 50,
            width: '100%',
          }}
        >
          <KeyboardAvoidingView behavior='padding'>
            <>
              <UpdatePostForm
                title={post ? post.title : ''}
                message={post ? post.message : ''}
                image={post ? post.image : ''}
                id={post ? postId : ''}
              />
            </>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
