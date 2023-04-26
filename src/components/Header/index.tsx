import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
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
          uri: 'https://github.com/Icode-Mobile.png',
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
