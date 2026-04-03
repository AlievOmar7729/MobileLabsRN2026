import React, { useMemo, useState } from 'react';
import { Pressable, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import GameScreen from './src/screens/GameScreen';
import TasksScreen from './src/screens/TasksScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { GameProvider } from './src/game-context';
import { darkTheme, lightTheme } from './src/theme';

const Tab = createBottomTabNavigator();

function AppContent() {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');

  const resolvedTheme = themeMode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : themeMode;
  const palette = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  const navigationTheme = useMemo(() => {
    const baseTheme = resolvedTheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: palette.colors.background,
        card: palette.colors.surface,
        text: palette.colors.text,
        border: palette.colors.border,
        primary: palette.colors.accent,
        notification: palette.colors.accentSecondary,
      },
    };
  }, [palette, resolvedTheme]);

  return (
    <ThemeProvider theme={palette}>
      <GameProvider themeMode={themeMode} setThemeMode={setThemeMode}>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerStyle: {
                backgroundColor: palette.colors.surface,
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerTintColor: palette.colors.text,
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '500',
              },
              headerLeft: () => (
                <Pressable style={{ marginLeft: 18 }}>
                  <Feather name="menu" size={22} color={palette.colors.text} />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable style={{ marginRight: 18 }}>
                  <Feather name="search" size={21} color={palette.colors.text} />
                </Pressable>
              ),
              tabBarStyle: {
                backgroundColor: palette.colors.surface,
                borderTopColor: palette.colors.border,
                height: 66,
                paddingTop: 8,
                paddingBottom: 8,
              },
              tabBarActiveTintColor: palette.colors.accent,
              tabBarInactiveTintColor: palette.colors.mutedText,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size, focused }) => {
                const iconSize = focused ? size + 2 : size;

                if (route.name === 'Game') {
                  return <MaterialCommunityIcons name="play" size={iconSize} color={color} />;
                }
                if (route.name === 'Challenges') {
                  return <MaterialCommunityIcons name="format-list-bulleted-square" size={iconSize} color={color} />;
                }

                return <Feather name="settings" size={iconSize} color={color} />;
              },
              sceneStyle: {
                backgroundColor: palette.colors.background,
              },
            })}
          >
            <Tab.Screen name="Game" component={GameScreen} options={{ title: 'Gesture Clicker' }} />
            <Tab.Screen name="Challenges" component={TasksScreen} options={{ title: 'Challenges' }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </GameProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContent />
    </GestureHandlerRootView>
  );
}
