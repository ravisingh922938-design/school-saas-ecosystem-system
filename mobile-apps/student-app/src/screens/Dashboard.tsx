import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress'; // Import Progress

const { width } = Dimensions.get('window');
const numColumns = 2; // For the subject grid

const Dashboard = () => {
  const [institutionType, setInstitutionType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutionType = async () => {
      try {
        const storedInstitutionType = await AsyncStorage.getItem('institutionType');
        if (storedInstitutionType) {
          setInstitutionType(storedInstitutionType);
        }
      } catch (error) {
        console.error('Error fetching institution type from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutionType();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading dashboard...</Text>
      </View>
    );
  }

  // Placeholder data for School type
  const subjects = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'History' },
    { id: '4', name: 'Geography' },
    { id: '5', name: 'English' },
    { id: '6', name: 'Physics' },
    { id: '7', name: 'Chemistry' },
  ];

  // Placeholder data for Recent Videos (School type)
  const recentVideos = [
    { id: 'v1', title: 'Maths: Algebra Basics', thumbnail: 'https://via.placeholder.com/150' },
    { id: 'v2', title: 'Science: Cell Structure', thumbnail: 'https://via.placeholder.com/150' },
    { id: 'v3', title: 'English: Grammar Essentials', thumbnail: 'https://via.placeholder.com/150' },
  ];

  // Placeholder data for Coaching type
  const batches = [
    { id: 'a', name: 'JEE Main 2026 Batch A' },
    { id: 'b', name: 'NEET 2025 Regular' },
    { id: 'c', name: 'UPSC Foundation' },
  ];

  const crashCourses = [
    { id: 'x', name: 'Crash Course: Calculus' },
    { id: 'y', name: 'Crash Course: Organic Chemistry' },
  ];

  const renderSubjectItem = ({ item }) => (
    <TouchableOpacity style={styles.subjectItem}>
      <Text style={styles.subjectText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBatchItem = ({ item }) => (
    <TouchableOpacity style={styles.batchItem}>
      <Text style={styles.batchText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Attendance Circular Progress Bar */}
      <View style={styles.attendanceContainer}>
        <Progress.Circle
          size={100}
          progress={0.75} // Placeholder for 75% attendance
          showsText={true}
          formatText={(progress) => `${Math.round(progress * 100)}%`}
          color="#4CAF50" // Green color for progress
          unfilledColor="#e0e0e0"
          borderWidth={0}
          thickness={10}
        />
        <Text style={styles.attendanceText}>Attendance</Text>
      </View>

      {institutionType === 'School' && (
        <View style={styles.schoolContainer}>
          <Text style={styles.sectionTitle}>Subjects</Text>
          <FlatList
            data={subjects}
            renderItem={renderSubjectItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            contentContainerStyle={styles.gridContainer}
          />

          <Text style={styles.sectionTitle}>Recent Videos</Text>
          <FlatList
            data={recentVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoListContainer}
          />
        </View>
      )}

      {institutionType === 'Coaching' && (
        <View style={styles.coachingContainer}>
          <Text style={styles.sectionTitle}>My Enrolled Batches</Text>
          <FlatList
            data={batches}
            renderItem={renderBatchItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />

          <Text style={styles.sectionTitle}>New Crash Courses</Text>
          <FlatList
            data={crashCourses}
            renderItem={renderBatchItem} // Re-using batch item style for crash courses
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      )}

      {!institutionType && (
        <View>
          <Text>Institution type not found. Please log in again.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  attendanceContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  attendanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
    color: '#555',
  },
  // School Specific Styles
  schoolContainer: {
    flex: 1,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  subjectItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / numColumns - 30, // Adjust for padding and margins
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    aspectRatio: 1, // Make items square
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
  videoListContainer: {
    paddingVertical: 10,
  },
  videoItem: {
    width: 150,
    marginRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    color: '#333',
  },
  // Coaching Specific Styles
  coachingContainer: {
    flex: 1,
  },
  list: {
    marginBottom: 20,
  },
  batchItem: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#00bcd4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  batchText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00796b',
  },
});

export default Dashboard;

