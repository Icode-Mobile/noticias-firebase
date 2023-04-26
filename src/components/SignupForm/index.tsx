import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Box, Checkbox, NativeBaseProvider, Stack } from 'native-base';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

type InputProps = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object({
  name: yup
    .string()
    .email('Digite um nome válido')
    .required('Preencha o seu nome por favor'),
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Preencha o seu email por favor'),
  password: yup.string().required('Digite sua senha por favor'),
});

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputProps>({
    resolver: yupResolver(schema),
  });
  const { goBack } = useNavigation();

  const handleSubmitForm = (data: InputProps) => {
    Alert.alert(
      'Credenciais',
      `Email: ${data.email} \nSenha: ${data.password}`
    );
  };

  const handleGoBackLogin = () => {
    goBack();
  };

  return (
    <NativeBaseProvider>
      <View
        style={{
          marginTop: 20,
          width: '90%',
        }}
      >
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              placeholder='Nome'
              placeholderTextColor={'black'}
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
                color: 'black',
                height: 50,
                paddingLeft: 15,
                fontFamily: 'Rubik_400Regular',
              }}
              autoCapitalize='words'
              selectionColor={'black'}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name='name'
        />
        {errors.name ? (
          <View
            style={{
              width: '100%',
              height: 20,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'Rubik_300Light',
                color: 'red',
              }}
            >
              {errors.name.message}
            </Text>
          </View>
        ) : null}

        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              placeholder='Email'
              placeholderTextColor={'black'}
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
                color: 'black',
                height: 50,
                paddingLeft: 15,
                fontFamily: 'Rubik_400Regular',
                marginTop: 10,
              }}
              autoCapitalize='none'
              selectionColor={'black'}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name='email'
        />
        {errors.email ? (
          <View
            style={{
              width: '100%',
              height: 20,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'Rubik_300Light',
                color: 'red',
              }}
            >
              {errors.email.message}
            </Text>
          </View>
        ) : null}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              placeholder='Senha'
              placeholderTextColor={'black'}
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
                color: 'black',
                height: 50,
                marginTop: 10,
                paddingLeft: 15,
                fontFamily: 'Rubik_400Regular',
              }}
              selectionColor={'black'}
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='password'
        />
        {errors.password ? (
          <View
            style={{
              width: '100%',
              height: 20,
              paddingLeft: 10,
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'Rubik_300Light',
                color: 'red',
              }}
            >
              {errors.password.message}
            </Text>
          </View>
        ) : null}

        <Stack my={5} mx={3} height={5}>
          <Checkbox
            name='Ver senha'
            onChange={(v) => setShowPassword(v)}
            value='check'
            aria-label='Marque para ver senha ou não'
          >
            <Text
              style={{
                fontFamily: 'Rubik_400Regular',
                color: 'white',
              }}
            >
              Ver Senha
            </Text>
          </Checkbox>
        </Stack>

        <TouchableOpacity
          style={{
            width: '90%',
            backgroundColor: 'white',
            alignSelf: 'center',
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.9}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text
            style={{
              fontFamily: 'Rubik_500Medium',
              color: 'black',
              fontSize: 16,
            }}
          >
            Registrar
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: 50,
          }}
        >
          <View
            style={{
              height: 0.5,
              width: '45%',
              backgroundColor: '#fff',
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Rubik_300Light',
              fontSize: 14,
              marginHorizontal: 20,
            }}
          >
            ou
          </Text>
          <View
            style={{
              height: 0.5,
              backgroundColor: '#fff',
              width: '45%',
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: 80,
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}
          >
            <AntDesign name='google' size={24} color='#134FEC' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: 80,
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 20,
            }}
          >
            <AntDesign name='github' size={24} color='#000' />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={handleGoBackLogin} activeOpacity={0.8}>
            <Text
              style={{
                fontFamily: 'Rubik_400Regular',
                color: '#bbb',
              }}
            >
              Já possui uma conta?
              <Text
                style={{
                  fontFamily: 'Rubik_700Bold',
                  color: '#fff',
                }}
              >
                {' '}
                Entre agora
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NativeBaseProvider>
  );
};
