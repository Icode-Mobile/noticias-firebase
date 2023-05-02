import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

type DetailsPostParamsProps = {
  id: string;
};

type PostProps = {
  title: string;
  message: string;
  image: string;
};

export default function DetailsPost() {
  const { id } = useRoute().params as DetailsPostParamsProps;
  const [feedback, setFeedback] = useState<'yes' | 'no' | ''>('');
  const [post, setPost] = useState<PostProps>();

  useEffect(() => {
    const subListener = firestore()
      .collection('blogs')
      .doc(id)
      .onSnapshot((snapshot) => {
        if (snapshot) {
          setPost(snapshot.data() as PostProps);
        }
      });
    return () => subListener();
  }, [id]);

  useMemo(() => {
    if (feedback) {
      console.log(feedback);
    }
  }, [feedback]);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#295094',
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        paddingBottom: 100,
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
        {post?.title}
      </Text>
      <Image
        source={{
          uri: post?.image,
        }}
        style={{
          width: '85%',
          height: 180,
          borderRadius: 10,
          marginTop: 25,
        }}
      />
      <Text
        style={{
          fontFamily: 'Rubik_300Light',
          fontSize: 16,
          color: '#fff',
          marginHorizontal: 22,
          marginTop: 28,
        }}
      >
        {post?.message}
      </Text>
      <Text
        style={{
          fontFamily: 'Rubik_500Medium',
          color: '#fff',
          marginTop: 30,
          fontSize: 16,
        }}
      >
        Esse artigo foi útil para você?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: feedback === 'yes' ? '#000' : '#d9d9d9',
            width: 120,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginHorizontal: 10,
          }}
          onPress={() => setFeedback('yes')}
        >
          <Text
            style={{
              fontFamily: 'Rubik_600SemiBold',
              color: feedback === 'yes' ? '#eee' : '#111',
            }}
          >
            Sim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: feedback === 'no' ? '#000' : '#d9d9d9',
            width: 120,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginHorizontal: 10,
          }}
          onPress={() => setFeedback('no')}
        >
          <Text
            style={{
              fontFamily: 'Rubik_600SemiBold',
              color: feedback === 'no' ? '#eee' : '#111',
            }}
          >
            Não
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
