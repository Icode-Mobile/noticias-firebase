import { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

type DetailsPostParamsProps = {
  id: string;
};

export default function DetailsPost() {
  const { id } = useRoute().params as DetailsPostParamsProps;
  const [feedback, setFeedback] = useState<'yes' | 'no' | ''>('');

  useEffect(() => {
    console.log('ID PARAMS', id);
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
        React Native está cada vez mais evoluido
      </Text>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/logo-og.png',
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
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. It is a long established fact that a reader will be
        distracted by the readable content of a page when looking at its layout.
        The point of using Lorem Ipsum is that it has a more-or-less normal
        distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English.
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
