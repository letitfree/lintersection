import React from 'react';

import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Linking, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import ActionsScreen from './src/screens/ActionsScreen';
import SignalementScreen from './src/screens/SignalementScreen';
import ReferendumScreen from './src/screens/ReferendumScreen';
import IdeeScreen from './src/screens/IdeeScreen';
import ContactScreen from './src/screens/ContactScreen';

import TabIcon from './src/components/TabIcon';
import { COLORS } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={COLORS.brun} barStyle="light-content" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: COLORS.brun,
                borderTopWidth: 0,
                height: 64,
                paddingBottom: 8,
                paddingTop: 8,
              },
              tabBarActiveTintColor: COLORS.sable,
              tabBarInactiveTintColor: 'rgba(250,248,244,0.4)',
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: '600',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              },
              tabBarIcon: ({ color, size, focused }) => (
                <TabIcon name={route.name} color={color} size={size} focused={focused} />
              ),
            })}
          >

            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Actions" component={ActionsScreen} />
            <Tab.Screen name="Signaler" component={SignalementScreen} />
            <Tab.Screen name="Voter" component={ReferendumScreen} />
            <Tab.Screen name="Idées" component={IdeeScreen} />
            <Tab.Screen name="Contact" component={ContactScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
