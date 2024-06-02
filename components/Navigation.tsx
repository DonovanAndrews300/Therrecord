// Navigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, SessionDetails,SessionList, SignIn, SignUp,Recorder }from '../screens/index';
import { RecentSessions } from './RecentSession';

const Stack = createStackNavigator();

export const AppNavigator = () =>  {
  return (
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Recorder" component={Recorder} />
        <Stack.Screen name="RecentSession" component={RecentSessions} />
        <Stack.Screen name="SessionDetails" component={SessionDetails} />
        <Stack.Screen name="SessionList" component={SessionList} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
  );
};

export default AppNavigator;