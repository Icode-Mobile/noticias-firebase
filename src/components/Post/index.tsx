import { Alert, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface PostProps {
  item: {
    id: string;
    title: string;
    body: string;
    image: string;
  };
}

export const Post = ({ item }: PostProps) => {
  const { navigate } = useNavigation();

  const handleActionPost = () => {
    Alert.alert(item.title, 'O que deseja fazer?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: () => handleRemovePost(item.id),
      },
      {
        text: 'Atualizar',
        onPress: () =>
          navigate('UpdatePost', {
            id: item.id,
          }),
      },
    ]);
  };

  const handleRemovePost = (id: string) => {
    console.log('ITEM', id);
    alert('Remover post');
  };

  const handleDetailsPost = () => {
    navigate('DetailsPost', {
      id: item.id,
    });
  };

  return (
    <TouchableOpacity
      onLongPress={handleActionPost}
      onPress={handleDetailsPost}
      style={{
        width: '85%',
        marginTop: 30,
        overflow: 'hidden',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
      }}
      activeOpacity={0.9}
    >
      <Image
        source={{
          uri: item.image,
        }}
        style={{
          width: '100%',
          height: 130,
        }}
      />
      <Text
        style={{
          fontFamily: 'Rubik_500Medium',
          color: '#000',
          marginTop: 5,
          fontSize: 16,
          textAlign: 'center',
          marginHorizontal: 5,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{
          fontFamily: 'Rubik_300Light',
          color: '#000',
          marginHorizontal: 8,
          marginTop: 10,
          textAlign: 'center',
          paddingBottom: 10,
        }}
      >
        {item.body.substring(0, 255) + '...'}
        <Text
          style={{
            fontFamily: 'Rubik_500Medium',
            color: '#333',
          }}
        >
          Leia mais
        </Text>
      </Text>
    </TouchableOpacity>
  );
};
