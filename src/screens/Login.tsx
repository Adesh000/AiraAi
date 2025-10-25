import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { COLORS } from '../utils';
import { InputField } from '../components';
import { storage } from '../storage';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const togglePasswordVisibility = useCallback(
    () => setHidePassword(prev => !prev),
    [],
  );

  const validateInputs = useCallback(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    if (password.trim().length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters long.',
      );
      return false;
    }
    return true;
  }, [email, password]);

  const handleSubmit = useCallback(() => {
    if (!validateInputs()) return;
    console.log('✅ Email:', email);
    console.log('✅ Password:', password);
    if (email.trim() === 'test@aira.ai' && password.trim() === 'password') {
      storage.set('access_token', true);
      Alert.alert('Login Successful', `Welcome back, ${email}!`);
    }
  }, [email, password, validateInputs]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.mainContainer}
    >
      <Text style={styles.title}>Login</Text>
      <InputField
        placeholder="Enter Your Email..."
        value={email}
        onChangeText={setEmail}
      />

      <InputField
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={hidePassword}
        showToggle
        toggleSecureEntry={togglePasswordVisibility}
      />

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  textStyle: {
    color: COLORS.textPrimary,
    fontSize: 28,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputStyle: {
    backgroundColor: COLORS.background,
    color: COLORS.textSecondary,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    elevation: 10,
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
});
