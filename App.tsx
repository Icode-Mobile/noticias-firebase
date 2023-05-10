import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, LogBox, View, Text } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import RouteRoot from './src/routes';
import { AuthProvider } from './src/context';

SplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  GoogleSignin.configure({
    webClientId:
      '981402118683-b9qsmfc4at757qhdingav0s380ghrjn7.apps.googleusercontent.com',
  });

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Rubik_300Light,
          Rubik_400Regular,
          Rubik_500Medium,
          Rubik_600SemiBold,
          Rubik_700Bold,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <AuthProvider>
        <RouteRoot />
      </AuthProvider>
    </NavigationContainer>
  );
}
