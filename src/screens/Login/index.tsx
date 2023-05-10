import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Logo from 'images/Logo.svg';

import { LoginForm } from 'components/LoginForm';

export default function Login() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={{
          backgroundColor: '#295094',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 40,
            backgroundColor: '#295094',
          }}
        >
          <Logo
            width={200}
            height={55}
            style={{
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
          <View
            style={{
              marginTop: 50,
              marginLeft: 30,
            }}
          >
            <Text
              style={{
                fontFamily: 'Rubik_700Bold',
                color: '#fff',
                fontSize: 22,
              }}
            >
              Faça seu login
            </Text>
            <KeyboardAvoidingView behavior='padding'>
              <>
                <LoginForm />
              </>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
