import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'; // Import router
import config from '../src/config'; // Import config

const LoginScreen = () => {
  const [instituteCode, setInstituteCode] = useState('');
  const [instituteData, setInstituteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 for institute code, 2 for student login
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleVerifyInstituteCode = async () => {
    if (!instituteCode) {
      Alert.alert('Error', 'Please enter an Institute Code.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${config.API_BASE_URL}/auth/verify-code?code=${instituteCode}`);
      const data = await response.json();

      if (data.isValid) {
        setInstituteData({
          logo: data.schoolLogoUrl,
          themeColor: data.schoolThemeColor,
        });
        await AsyncStorage.setItem('institutionType', data.institutionType);
        setStep(2);
      } else {
        Alert.alert('Error', 'Invalid Institute Code.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Could not connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!studentId || !password) {
      Alert.alert('Error', 'Please enter both Student ID and Password.');
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual student login API endpoint and logic
      const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instituteCode, studentId, password }),
      });
      const data = await response.json();

      if (data.success) {
        await AsyncStorage.setItem('userToken', data.token); // Store a user token
        router.replace('/(tabs)'); // Navigate to the dashboard
      } else {
        Alert.alert('Error', data.message || 'Invalid Student ID or Password.');
      }
    } catch (error) {
      console.error('Login API Error:', error);
      Alert.alert('Error', 'Could not connect to the server for login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}>Enter Institute Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Institute Code"
            value={instituteCode}
            onChangeText={setInstituteCode}
            autoCapitalize="none"
          />
          <Button
            title={loading ? "Verifying..." : "Verify"}
            onPress={handleVerifyInstituteCode}
            disabled={loading}
          />
          {loading && <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />}
        </View>
      )}

      {step === 2 && instituteData && (
        <View style={[styles.stepContainer, { backgroundColor: instituteData.themeColor || '#ffffff' }]}>
          {instituteData.logo && (
            <Image source={{ uri: instituteData.logo }} style={styles.logo} resizeMode="contain" />
          )}
          <Text style={styles.title}>Student Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title={loading ? "Logging In..." : "Login"}
            onPress={handleLogin}
            disabled={loading}
          />
           {loading && <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  stepContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  spinner: {
    marginTop: 20,
  },
});

export default LoginScreen;

