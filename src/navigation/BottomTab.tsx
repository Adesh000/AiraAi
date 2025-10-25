import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chat, Memory } from '../screens';
import { MessageCircle, Brain } from 'lucide-react-native';
import { COLORS } from '../utils';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size, focused }) => (
            <MessageCircle
              color={focused ? COLORS.accent : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Memory"
        component={Memory}
        options={{
          tabBarLabel: 'Memory',
          tabBarIcon: ({ color, size, focused }) => (
            <Brain color={focused ? COLORS.accent : color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#2c2c2c',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 70,
    paddingBottom: 10,
    paddingTop: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
});
