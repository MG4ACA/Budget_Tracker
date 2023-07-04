import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Text,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as EmailValidator from 'email-validator';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');

  const auth = FIREBASE_AUTH;

  const validateInputs = () => {
    if (EmailValidator.validate(email)) {
      setErrEmail('');
      if (password !== '' && password.length >= 8) {
        setErrPassword('');
        return true;
      } else {
        setErrPassword('Password must be at least 8 characters long.');
        return false;
      }
    } else {
      setErrEmail('Enter valid email.');
      return false;
    }
  };

  const signIn = async () => {
    if (validateInputs()) {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(response);
      } catch (error: any) {
        console.log(error);
        alert('Sign in failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter correct details.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <LinearGradient
          colors={['#ffffff', 'transparent']}
          start={{ x: 0.0, y: 0.6 }}
          end={{ x: 0.9, y: 0.3 }}
          style={styles.background}
        >
          <View style={styles.border_style}>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.logo_view}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/images/logo.png')}
                />
                <Text style={styles.logo_text}>BUDGET TRACKER</Text>
              </View>

              <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
              {errEmail !== '' && (
                <Text style={styles.validation}>{errEmail}</Text>
              )}

              <TextInput
                value={password}
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
              ></TextInput>
              {errPassword !== '' && (
                <Text style={styles.validation}>{errPassword}</Text>
              )}

              <>
                <Pressable style={styles.button} onPress={signIn}>
                  <Text style={styles.text}>SIGN IN</Text>
                </Pressable>
                <Pressable
                  style={styles.button_sign_up}
                  onPress={() => navigation.navigate('sign_up')}
                >
                  <Text style={styles.text}>CREATE ACCOUNT</Text>
                </Pressable>
              </>
            </KeyboardAvoidingView>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  border_style: {
    marginVertical: 120,
    marginHorizontal: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
  },
  logo_text: {
    fontSize: 25,
    fontWeight: 600,
    paddingTop: 10,
    paddingBottom: 30,
    color: '#7B7B7B',
  },
  logo_view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#E4E4E4',
    marginTop: 10,
  },
  button_sign_up: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 10,
    color: '#1751ff',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  validation: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'red',
    marginBottom: 10,
  },
});
