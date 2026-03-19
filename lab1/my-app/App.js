import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>

          <Header />

          <View style={styles.content}>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
              <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    title: 'Головна',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                  }}
              />
              <Tab.Screen
                  name="Gallery"
                  component={GalleryScreen}
                  options={{
                    title: 'Фотогалерея',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="image-outline" size={size} color={color} />
                    ),
                  }}
              />
              <Tab.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{
                    title: 'Профіль',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                  }}
              />
            </Tab.Navigator>
          </View>

          <Footer />

        </View>
      </NavigationContainer>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});