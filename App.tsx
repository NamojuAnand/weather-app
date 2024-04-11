/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import HomeScreen from './src/containers/homeScreen';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HomeScreen />
    </SafeAreaView>
  )
}

export default App;
