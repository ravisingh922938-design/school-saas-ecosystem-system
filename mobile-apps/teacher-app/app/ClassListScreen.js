import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ClassListScreen = () => {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Simulate API call to fetch classes
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: 'class101', name: '10th Grade Math', totalStudents: 30 },
              { id: 'class102', name: '10th Grade Science', totalStudents: 28 },
              { id: 'class111', name: '11th Grade History', totalStudents: 25 },
            ]),
          });
        }, 1000));

        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        } else {
          setError('Failed to fetch classes.');
        }
      } catch (err) {
        setError('An error occurred while fetching classes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleViewStudents = (classId) => {
    router.push({ pathname: 'StudentListScreen', params: { classId } });
  };

  const renderClassItem = ({ item }) => (
    <View style={styles.classItem}>
      <View>
        <Text style={styles.className}>{item.name}</Text>
        <Text style={styles.classDetails}>Total Students: {item.totalStudents}</Text>
      </View>
      <TouchableOpacity onPress={() => handleViewStudents(item.id)} style={styles.viewStudentsButton}>
        <Text style={styles.buttonText}>View Students</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading classes...</Text>
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
      <Text style={styles.title}>Your Classes</Text>
      <FlatList
        data={classes}
        renderItem={renderClassItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.centered}>No classes found.</Text>}
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
  classItem: {
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
  className: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  classDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  viewStudentsButton: {
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

export default ClassListScreen;

