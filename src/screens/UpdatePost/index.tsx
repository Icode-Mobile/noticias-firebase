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

type DetailsPostParamsProps = {
  id: string;
};

export default function UpdatePost() {
  const { id } = useRoute().params as DetailsPostParamsProps;

  useEffect(() => {}, [id]);

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
                title='React Native está cada vez mais evoluido'
                message='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only...'
                image='https://reactnative.dev/img/logo-og.png'
              />
            </>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
