import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from 'screens/Login';
import Signup from 'screens/Signup';

const Stack = createNativeStackNavigator();

export default function AppRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Login'
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}
