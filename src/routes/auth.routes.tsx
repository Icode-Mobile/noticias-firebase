import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from 'screens/Home';
import CreatePost from 'screens/CreatePost';
import DetailsPost from 'screens/DetailsPost';
import UpdatePost from 'screens/UpdatePost';

const Stack = createNativeStackNavigator();

export default function AuthRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='CreatePost' component={CreatePost} />
      <Stack.Screen name='DetailsPost' component={DetailsPost} />
      <Stack.Screen name='UpdatePost' component={UpdatePost} />
    </Stack.Navigator>
  );
}
