import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Headline, useTheme } from 'react-native-paper';

import Logo from '../assets/icon.svg';  // Ensure the path is correct

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const theme = useTheme();  // This pulls the theme from context provided by PaperProvider

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return; // Early return if the passwords do not match
    }
    console.log('Sign Up with:', email, password);
    navigation.navigate("Home");
  };

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.logoContainer}>
        <Logo height={100} width={100} />
        <Headline style={[styles.logoText, { color: theme.colors.onBackground }]}>Therrecord</Headline>
      </View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        theme={{ colors: { primary: theme.colors.primary, background: theme.colors.surface } }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: theme.colors.primary, background: theme.colors.surface } }}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: theme.colors.primary, background: theme.colors.surface } }}
      />
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.button}
        color={theme.colors.primary}>
        Sign Up
      </Button>
      <TouchableOpacity onPress={navigateToSignIn} style={styles.signUpLink}>
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  logoContainer: {
    flexDirection: 'column',  // Change to 'column' to stack logo and text vertically
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -20,  // Adjust top margin to space out the text from the logo
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center'
  },
  linkText: {
    fontSize: 16
  }
});

export default SignUp;
