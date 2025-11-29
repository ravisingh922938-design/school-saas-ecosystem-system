import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const StudentDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        // Simulate API call to fetch student details
        const response = await new Promise(resolve => setTimeout(() => {
          const mockStudents = {
            '1': { id: '1', name: 'Alice Smith', gender: 'Female', rollNumber: '001', phoneNumber: '123-456-7890' },
            '2': { id: '2', name: 'Bob Johnson', gender: 'Male', rollNumber: '002', phoneNumber: '098-765-4321' },
          };
          if (mockStudents[id]) {
            resolve({
              ok: true,
              json: () => Promise.resolve(mockStudents[id]),
            });
          } else {
            resolve({
              ok: false,
              status: 404,
              json: () => Promise.resolve({ message: 'Student not found' }),
            });
          }
        }, 1000));

        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch student details.');
        }
      } catch (err) {
        setError('An error occurred while fetching student details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentDetails();
    } else {
      setError('Student ID not provided.');
      setLoading(false);
    }
  }, [id]);

  const handleCall = () => {
    if (student?.phoneNumber) {
      Linking.openURL(`tel:${student.phoneNumber}`);
    } else {
      Alert.alert('Error', 'Phone number not available.');
    }
  };

  const handleSendSMS = () => {
    if (student?.phoneNumber) {
      Linking.openURL(`sms:${student.phoneNumber}`);
    } else {
      Alert.alert('Error', 'Phone number not available.');
    }
  };

  const handleLiveChat = () => {
    Alert.alert('Live Chat', `Initiate live chat with ${student?.name}. (Placeholder)`)
    // TODO: Navigate to Live Chat screen with student context
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading student details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.centered}>
        <Text>No student data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{student.name}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{student.gender}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Roll Number:</Text>
        <Text style={styles.value}>{student.rollNumber}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{student.phoneNumber}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Call Student" onPress={handleCall} />
        <Button title="Send SMS" onPress={handleSendSMS} />
        <Button title="Live Chat" onPress={handleLiveChat} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  },
  value: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default StudentDetailsScreen;



