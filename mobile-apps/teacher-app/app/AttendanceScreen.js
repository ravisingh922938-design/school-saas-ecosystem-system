import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AttendanceScreen = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Mock API call
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: '1', name: 'Alice Smith', gender: 'Female' },
              { id: '2', name: 'Bob Johnson', gender: 'Male' },
              { id: '3', name: 'Charlie Brown', gender: 'Male' },
              { id: '4', name: 'Diana Prince', gender: 'Female' },
              { id: '5', name: 'Eve Adams', gender: 'Female' },
            ]),
          });
        }, 1000)); // Simulate network delay

        if (response.ok) {
          const data = await response.json();
          // Default all students to present
          setStudents(data.map(student => ({ ...student, present: true })));
        } else {
          setError('Failed to fetch students.');
        }
      } catch (err) {
        setError('An error occurred while fetching students.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const toggleAttendance = (id) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const handleSubmit = async () => {
    const absentStudentIds = students.filter(student => !student.present).map(student => student.id);
    console.log('Absent Student IDs:', absentStudentIds);

    try {
      const response = await fetch('https://example.com/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ absentStudentIds }), // Send only absentStudentIds
      });

      if (response.ok) {
        Alert.alert('Success', 'Attendance Submitted Successfully! SMS will be sent to absent students.');
      } else {
        Alert.alert('Error', 'Failed to submit attendance.');
      }
    } catch (err) {
      console.error('Error submitting attendance:', err);
      Alert.alert('Error', 'An error occurred while submitting attendance.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentName}>{item.name}</Text>
      <TouchableOpacity onPress={() => toggleAttendance(item.id)} style={styles.iconContainer}>
        <Ionicons
          name={item.present ? "checkmark-circle" : "close-circle"}
          size={30}
          color={item.present ? "green" : "red"}
        />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading students...</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Attendance</Text>
      <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.centered}>No students found.</Text>}
      />
      <Button title="Mark Attendance" onPress={handleSubmit} />
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
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentName: {
    fontSize: 18,
  },
  iconContainer: {
    padding: 5,
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

export default AttendanceScreen;
