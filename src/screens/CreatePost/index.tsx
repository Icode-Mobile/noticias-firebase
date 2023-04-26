import {
  ScrollView,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { CreatePostForm } from 'components/CreatePostForm';

export default function CreatePost() {
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
          Crie um blog
        </Text>
        <View
          style={{
            marginTop: 50,
            width: '100%',
          }}
        >
          <KeyboardAvoidingView behavior='padding'>
            <>
              <CreatePostForm />
            </>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
