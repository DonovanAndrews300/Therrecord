import "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import {  PaperProvider, } from "react-native-paper";
import { DarkTheme, LightTheme } from "./theme";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./components/Navigation";


export default function App() {
 const colorScheme = useColorScheme();
 const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  return (
  <PaperProvider theme={theme}>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
