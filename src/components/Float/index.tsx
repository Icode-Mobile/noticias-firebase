import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Float = () => {
  const { navigate } = useNavigation();

  const handleCreatePost = () => {
    navigate('CreatePost');
  };

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 40,
        marginRight: 15,
        backgroundColor: '#134FEC',
        width: 120,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}
      activeOpacity={0.9}
      onPress={handleCreatePost}
    >
      <Text
        style={{
          fontFamily: 'Rubik_700Bold',
          color: '#fff',
        }}
      >
        Crie um blog
      </Text>
    </TouchableOpacity>
  );
};
