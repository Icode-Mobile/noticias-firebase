import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context';

export const Header = () => {
  const { user } = useAuth();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={{
          uri: user ? user.photo : '',
        }}
        style={{
          width: 35,
          height: 35,
          borderRadius: 18,
        }}
      />
      <Text
        style={{
          fontFamily: 'Rubik_700Bold',
          color: '#fff',
          fontSize: 16,
        }}
      >
        Explore
      </Text>
      <Ionicons name='notifications-outline' size={24} color='white' />
    </View>
  );
};
