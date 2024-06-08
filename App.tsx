import "react";
import { useColorScheme } from 'react-native';
import {  PaperProvider } from "react-native-paper";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { DarkTheme, LightTheme } from "./theme";
import AppNavigator from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { FirestoreProvider } from "./contexts/FirestoreContext";


export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <FirestoreProvider>
            <AppNavigator/>
          </FirestoreProvider>        
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

