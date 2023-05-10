import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { NativeBaseProvider } from 'native-base';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

type InputProps = {
  title: string;
  body: string;
};

const schema = yup.object({
  title: yup.string().required('Preencha o titulo por favor'),
  body: yup.string().required('Preencha a mensagem por favor'),
});

export const CreatePostForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputProps>({
    resolver: yupResolver(schema),
  });
  const { goBack } = useNavigation();
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  const handleSubmitForm = (data: InputProps) => {
    if (image) {
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const uri = image.replace('file://', '');

      const task = storage().ref(filename).putFile(uri);

      task.then((e) => {
        firestore()
          .collection('blogs')
          .add({
            title: data.title,
            message: data.body,
            image: `https://firebasestorage.googleapis.com/v0/b/noticias-firebase-45b51.appspot.com/o/${e.metadata.fullPath}?alt=media`,
          })
          .then(() => {
            Alert.alert('Post Criado', 'Seu post foi enviado com sucesso!');
            goBack();
          });
      });
    } else {
      Alert.alert('Imagem obrigatória', 'Escolha uma imagem!');
    }
  };

  const handleOpenCameraLibrary = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        'Permissão necessária',
        'É preciso que você permita o acesso às suas imagens!'
      );
      return;
    }
    let { assets, canceled } = await ImagePicker.launchImageLibraryAsync();
    if (!canceled) {
      setIsUploadImage(true);
      setImage(assets ? assets[0].uri : '');
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleRemoveImage = () => {
    setImage('');
    setIsUploadImage(false);
  };

  return (
    <NativeBaseProvider>
      <View
        style={{
          marginTop: 20,
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              placeholder='Titulo'
              placeholderTextColor={'black'}
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
                color: 'black',
                height: 50,
                paddingLeft: 15,
                fontFamily: 'Rubik_400Regular',
              }}
              autoCapitalize='none'
              selectionColor={'black'}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name='title'
        />
        {errors.title ? (
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
              {errors.title.message}
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
              placeholder='Mensagem'
              placeholderTextColor={'black'}
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
                color: 'black',
                height: value ? value.length - 10 : 60,
                marginTop: 15,
                paddingLeft: 15,
                fontFamily: 'Rubik_400Regular',
                minHeight: 60,
                maxHeight: 110,
                paddingRight: 10,
              }}
              selectionColor={'black'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
          name='body'
        />
        {errors.body ? (
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
              {errors.body.message}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          {isUploadImage && image ? (
            <Image
              source={{
                uri: image,
              }}
              style={{
                width: 150,
                height: 120,
                marginTop: 20,
                borderRadius: 10,
              }}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: 'transparent',
                borderStyle: 'dotted',
                borderWidth: 1,
                borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: 150,
                height: 120,
                marginTop: 20,
                borderRadius: 10,
              }}
              onPress={handleOpenCameraLibrary}
            >
              <AntDesign name='pluscircle' size={22} color='white' />
              <Text
                style={{
                  fontFamily: 'Rubik_400Regular',
                  textAlign: 'center',
                  fontSize: 12,
                  marginHorizontal: 5,
                  color: '#fff',
                  marginTop: 10,
                }}
              >
                Coloque sua imagem aqui
              </Text>
            </TouchableOpacity>
          )}

          {isUploadImage ? (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <AntDesign name='checkcircle' size={20} color='#1daa4c' />
              <Text
                style={{
                  fontFamily: 'Rubik_500Medium',
                  fontSize: 13,
                  width: '80%',
                  marginTop: 5,
                  textAlign: 'center',
                  color: '#1daa4c',
                }}
              >
                Imagem enviada com sucesso
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                }}
                activeOpacity={0.6}
                onPress={handleRemoveImage}
              >
                <Text
                  style={{
                    fontFamily: 'Rubik_400Regular',
                    color: 'red',
                  }}
                >
                  Remover
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={{
            width: '80%',
            backgroundColor: '#000',
            alignSelf: 'center',
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}
          activeOpacity={0.9}
          onPress={handleSubmit(handleSubmitForm)}
        >
          <Text
            style={{
              fontFamily: 'Rubik_400Regular',
              color: '#fff',
              fontSize: 16,
            }}
          >
            Criar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '80%',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            borderWidth: 0.8,
            borderColor: 'red',
          }}
          activeOpacity={0.9}
          onPress={handleGoBack}
        >
          <Text
            style={{
              fontFamily: 'Rubik_400Regular',
              color: '#fff',
              fontSize: 16,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
};
