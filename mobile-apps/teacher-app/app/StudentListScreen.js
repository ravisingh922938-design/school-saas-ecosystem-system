import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const StudentListScreen = () => {
  const router = useRouter();
  const { classId } = useLocalSearchParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!classId) {
        setError('Class ID not provided.');
        setLoading(false);
        return;
      }

      try {
        // Simulate API call to fetch students for a specific class
        const response = await new Promise(resolve => setTimeout(() => {
          const mockStudentsByClass = {
            'class101': [
              { id: '1', name: 'Alice Smith', rollNumber: '001', gender: 'Female' },
              { id: '2', name: 'Bob Johnson', rollNumber: '002', gender: 'Male' },
            ],
            'class102': [
              { id: '3', name: 'Charlie Brown', rollNumber: '003', gender: 'Male' },
              { id: '4', name: 'Diana Prince', rollNumber: '004', gender: 'Female' },
            ],
          };

          if (mockStudentsByClass[classId]) {
            resolve({
              ok: true,
              json: () => Promise.resolve(mockStudentsByClass[classId]),
            });
          } else {
            resolve({
              ok: false,
              status: 404,
              json: () => Promise.resolve({ message: 'Students not found for this class.' }),
            });
          }
        }, 1000));

        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch students.');
        }
      } catch (err) {
        setError('An error occurred while fetching students.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [classId]);

  const handleViewDetails = (studentId) => {
    router.push({ pathname: 'StudentDetailsScreen', params: { id: studentId } });
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <View>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentDetails}>Roll No: {item.rollNumber} | Gender: {item.gender}</Text>
      </View>
      <TouchableOpacity onPress={() => handleViewDetails(item.id)} style={styles.viewDetailsButton}>
        <Text style={styles.buttonText}>View Details</Text>
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
      <Text style={styles.title}>Students in {classId}</Text>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.centered}>No students found for this class.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  viewDetailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default StudentListScreen;

