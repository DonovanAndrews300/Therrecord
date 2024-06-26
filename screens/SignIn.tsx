import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, Headline, useTheme } from 'react-native-paper';

import Logo from '../assets/icon.svg';
import { signInUser } from '../contexts/utils /auth';
import TextButton from '../components/TextButton';
export const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();  // This pulls the theme from context provided by PaperProvider

  const handleSignIn = async () => {
    await signInUser( email, password);
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.logoContainer}>
        {/* Display the SVG logo from the assets folder */}
        <Logo height={100} width={100} />
        <Headline style={[styles.logoText, { color: theme.colors.onBackground }]}><Text>Therrecord</Text></Headline>
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
      <TextButton
        onPress={() => console.log('Forgot Password Pressed')}
        uppercase={false}
        text={"Forgot password?"}
        color={theme.colors.primary}/>
      <TextButton
        mode="contained"
        onPress={handleSignIn}
        style={styles.button}
        text={"Sign in"}
        color={theme.colors.primary}>
      </TextButton>
      <TouchableOpacity onPress={navigateToSignUp} style={styles.signUpLink}>
        <Text style={[styles.linkText, { color: theme.colors.primary }]}>Don't have an account? Sign up</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -20  // Adjust this value as needed to overlay the text correctly
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

export default SignIn;
