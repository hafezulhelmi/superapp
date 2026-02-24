import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';
import type { UserProfile } from '../types/auth.types';
import colors from '../theme/colors';

/**
 * Mock User Database
 * In production, this would be handled by a backend API
 */
const MOCK_USERS: UserProfile[] = [
  {
    id: 'usr_001',
    name: 'Super Admin',
    email: 'superadmin@app.com',
    role: 'superadmin',
  },
  {
    id: 'usr_002',
    name: 'Admin User',
    email: 'admin@app.com',
    role: 'admin',
  },
  {
    id: 'usr_003',
    name: 'Regular User',
    email: 'user@app.com',
    role: 'user',
  },
];

/**
 * Login Screen Component
 * Handles user authentication and dispatches login action to Redux
 */
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('superadmin@app.com');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  // Cross-platform alert helper
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      showAlert('Error', 'Please enter both email and password');
      return;
    }

    // Mock authentication - Check if user exists
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      // Successful login - Dispatch to Redux store
      dispatch(login(user));
    } else {
      showAlert('Login Failed', 'Invalid credentials. Try one of the demo accounts.');
    }
  };

  const quickLogin = (userEmail: string) => {
    const user = MOCK_USERS.find((u) => u.email === userEmail);
    if (user) {
      dispatch(login(user));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>SA</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>SuperApp</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="superadmin@app.com"
              placeholderTextColor={colors.primary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••••••"
              placeholderTextColor="#A5B4FC"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Demo Accounts */}
          <Text style={styles.demoTitle}>DEMO ACCOUNTS</Text>
          <View style={styles.demoContainer}>
            <TouchableOpacity onPress={() => quickLogin('superadmin@app.com')}>
              <Text style={styles.demoButton}>superadmin</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => quickLogin('admin@app.com')}>
              <Text style={styles.demoButton}>admin</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => quickLogin('user@app.com')}>
              <Text style={styles.demoButton}>user</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EEF2FF',
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoTitle: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 16,
    letterSpacing: 1,
  },
  demoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  demoButton: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
