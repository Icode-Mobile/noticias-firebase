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

type InputProps = {
  title: string;
  body: string;
};

interface UpdatePostFormProps {
  title: string;
  message: string;
  image: string;
}

const schema = yup.object({
  title: yup.string().required('Preencha o titulo por favor'),
  body: yup.string().required('Preencha a mensagem por favor'),
});

// terminar aqui
export const UpdatePostForm = ({
  title,
  message,
  image,
}: UpdatePostFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<InputProps>({
    resolver: yupResolver(schema),
  });
  const { goBack } = useNavigation();
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string>(image);

  const handleSubmitForm = (data: InputProps) => {
    if (data.title === title || data.body === message || newImage === image) {
      Alert.alert('Sem alteração', 'Seus dados não foram alterados');
      return;
    }
    Alert.alert(
      'Novos dados',
      `Titulo: ${data.title} \nMensagem: ${data.body}`
    );
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
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleRemoveImage = () => {
    setIsUploadImage(false);
    setNewImage('');
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
              defaultValue={title}
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
              defaultValue={message}
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
          {isUploadImage || newImage ? (
            <Image
              source={{
                uri: newImage,
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

          {isUploadImage || newImage ? (
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
                Imagem salva
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
            Atualizar
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
