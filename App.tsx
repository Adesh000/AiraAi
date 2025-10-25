import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BottomTab, COLORS, Login, storage } from './src';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState<string | null>(
    storage.getString('access_token') || null,
  );
  console.log('🚀 ~ App ~ token:', token);

  useEffect(() => {
    // Subscribe to MMKV changes
    const listener = storage.addOnValueChangedListener(changedKey => {
      if (changedKey === 'access_token') {
        setToken(storage.getString('access_token') || null);
      }
    });
    return () => listener.remove();
  }, []);
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
    backgroundColor: COLORS.primaryBackgroud,
  },
});

export default App;
