/** @format */

// utils/snackGenerator.ts

import { Theme } from "./presets"; // Adjust the import path as needed

function generateSnackCode(theme: Theme): string {
  return `
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const DATA = [
  { id: '1', title: 'First Item', img: "https://via.placeholder.com/40" },
  { id: '2', title: 'Second Item', img: "https://via.placeholder.com/40" },
  { id: '3', title: 'Third Item', img: "https://via.placeholder.com/40" },
];

const theme = ${JSON.stringify(theme, null, 2)};

function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: theme.colors.card }]}>
      <Image source={{uri: item.img}} style={styles.image} />
      <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'My List',
            headerStyle: {
              backgroundColor: theme.colors.card,
            },
            headerTintColor: theme.colors.text,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 18,
  },
});
`;
}

export function generateSnackUrl(theme: Theme): string {
  const files = {
    "App.js": {
      type: "CODE",
      contents: generateSnackCode(theme),
    },
  };

  const dependencies = {
    "@react-navigation/native": "6.1.7",
    "@react-navigation/stack": "6.3.17",
    "react-native-screens": "3.22.1",
    "react-native-safe-area-context": "4.6.3",
    "react-native-gesture-handler": "2.12.0",
  };

  const params = new URLSearchParams({
    files: JSON.stringify(files),
    dependencies: JSON.stringify(dependencies),
    preview: "true",
    platform: "web",
    theme: "light",
    hideDevTools: "true",
  });

  return `https://snack.expo.dev/?${params.toString()}`;
}
