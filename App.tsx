import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { storage } from './src/storage';
import { AuthStack, BottomTab, Login } from './src';

function App() {
  const token = storage.getString('access_token');
  console.log('🚀 ~ App ~ token:', token);
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          {token ? <BottomTab /> : <Login />}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
});

export default App;
