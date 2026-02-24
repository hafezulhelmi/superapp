/**
 * SuperApp - Main Application Entry Point
 * 
 * This is the root component that sets up the entire SuperApp framework
 * with Redux state management and navigation.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { store } from './store';
import RootNavigator from './navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
