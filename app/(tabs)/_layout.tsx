import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mostruario",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "car" : "car-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: "Revisões",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "key" : "key-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="car"
        options={{
          title: "Sobre",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "options" : "options-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
