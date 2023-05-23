import { styled } from "nativewind";

import { ImageBackground } from "react-native";
import BlurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from "react";

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsAuthenticated] = useState<undefined | boolean>(undefined)



  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    BaiJamjuree_700Bold,
    Roboto_700Bold
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsAuthenticated(!!token)
    })
  }, [])


  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={BlurBg}
      className='relative bg-gray-900 flex-1'
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className='absolute left-2' />
      <StatusBar style="light" translucent />

      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}