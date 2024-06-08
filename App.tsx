import "react";
import { useColorScheme } from 'react-native';
import {  PaperProvider } from "react-native-paper";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { DarkTheme, LightTheme } from "./theme";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FirestoreProvider } from "./contexts/FirestoreContext";
import { AuthNavigator, AppNavigator } from "./components/Navigation";


export default function App() {
  const colorScheme = useColorScheme();

 
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  const RootNavigator = () =>
  {  const {user} = useAuth();
    return (
      <NavigationContainer>
        {user ? <AppNavigator/>:<AuthNavigator/>}
      </NavigationContainer>
    );
  };
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <FirestoreProvider>
          <RootNavigator/>
        </FirestoreProvider>        
      </AuthProvider>
    </PaperProvider>
  );
}

