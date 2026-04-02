import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MainScreen } from '../screens/MainScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { CustomDrawerContent } from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HeaderMenuButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.menuButton}>
      <Text style={styles.menuButtonText}>Menu</Text>
    </Pressable>
  );
}

function NewsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#16302b',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={({ navigation }) => ({
          title: 'News Feed',
          headerLeft: () => (
            <HeaderMenuButton
              onPress={() => navigation.getParent()?.openDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.article?.title ?? 'Article Details',
        })}
      />
    </Stack.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#0b6e4f',
        drawerLabelStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name="NewsStack"
        component={NewsStackNavigator}
        options={{ title: 'Top News' }}
      />
      <Drawer.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={({ navigation }) => ({
          title: 'Contacts',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#16302b',
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerLeft: () => (
            <HeaderMenuButton onPress={() => navigation.openDrawer()} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#dcebe3',
  },
  menuButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#16302b',
  },
});
