import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import * as EmailValidator from 'email-validator';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState('');
  const [full_name, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [con_password, setConPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errFull_name, setErrFullName] = useState('');
  const [errMobile, setErrMobile] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errCon_password, setErrConPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const validateInputs = () => {
    if (full_name !== '') {
      setErrFullName('');
      if (mobile !== '') {
        const mobileNumberPattern = /^\d{10}$/;
        if (mobileNumberPattern.test(mobile)) {
          setErrMobile('');
          if (EmailValidator.validate(email)) {
            setErrEmail('');
            if (password !== '' && password.length >= 8) {
              setErrPassword('');
              if (con_password === password) {
                setErrPassword('');
                setErrConPassword('');
                return true;
              } else {
                setErrPassword("Passwords don't match");
                setErrConPassword("Passwords don't match");
                return false;
              }
            } else {
              setErrPassword('Password must be at least 8 characters long.');
              return false;
            }
          } else {
            setErrEmail('Enter valid email.');
            return false;
          }
        } else {
          setErrMobile('Enter 10 digit mobile number');
          return false;
        }
      } else {
        setErrMobile('Enter your mobile number.');
        return false;
      }
    } else {
      setErrFullName('Enter your full name');
      return false;
    }
  };

  const signUp = async () => {
    if (validateInputs()) {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user_id = response.user.uid;

        await setDoc(doc(FIRESTORE_DB, 'users', user_id), {
          user_id,
          full_name,
          mobile,
        }).then(() => {
          alert('Sign in successful!');
          navigation.navigate('Inside');
        });
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
        <View>
          <TextInput
            value={full_name}
            style={styles.input}
            placeholder="Name in full"
            autoCapitalize="none"
            onChangeText={(text) => setFullName(text)}
          ></TextInput>
          {errFull_name !== '' && (
            <Text style={styles.validation}>{errFull_name}</Text>
          )}

          <TextInput
            value={mobile}
            style={styles.input}
            placeholder="Mobile number"
            autoCapitalize="none"
            onChangeText={(text) => setMobile(text)}
          ></TextInput>
          {errMobile !== '' && (
            <Text style={styles.validation}>{errMobile}</Text>
          )}

          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          {errEmail !== '' && <Text style={styles.validation}>{errEmail}</Text>}

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

          <TextInput
            value={con_password}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password confirmation"
            autoCapitalize="none"
            onChangeText={(text) => setConPassword(text)}
          ></TextInput>
          {errCon_password !== '' && (
            <Text style={styles.validation}>{errCon_password}</Text>
          )}

          <Pressable style={styles.button} onPress={signUp}>
            <Text style={styles.text}>CREATE ACCOUNT</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginVertical: 100,
    marginHorizontal: 20,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
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
