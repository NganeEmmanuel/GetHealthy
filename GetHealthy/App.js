import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './Components/Screens/NavigationScreen/AuthNavigation';  // Stack navigator for Login/Signup
import TabNavigation from './Components/Screens/NavigationScreen/TabNavigation';   // Tab navigator after login
import GlobalAPI from './Components/Utils/GlobalAPI';
import { AuthProvider, useAuth } from './Components/Screens/AuthenticationScreen/AuthProvider';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']); //remove this when you want to debug this error
function AppContent() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const authenticateUser = () => {
      try {
        const userData = GlobalAPI.authenticateUser().then(resp => {
          if(resp != true){ return }
          setIsAuthenticated(true)
        }).catch(err => {
          return ;
        }); // authenticate user
      } catch (error) {
        console.log('Error authenticating user:', error);
        return ;
      }
    };

    authenticateUser();
  }, [])

  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
  }
});
