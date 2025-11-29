import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API call to fetch notifications
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([
              { id: '1', title: 'New Assignment Posted', body: 'Math - Algebra II due next Friday.', read: false },
              { id: '2', title: 'Meeting Reminder', body: 'Parent-Teacher conference tomorrow at 3 PM.', read: false },
              { id: '3', title: 'Student Absent', body: 'Alice Smith is absent today.', read: true },
            ]),
          });
        }, 1000));

        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          setError('Failed to fetch notifications.');
        }
      } catch (err) {
        setError('An error occurred while fetching notifications.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    Alert.alert('Success', 'All notifications marked as read.');
    // TODO: Send update to backend to mark all as read
  };

  const renderNotification = ({ item }) => (
    <View style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationBody}>{item.body}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading notifications...</Text>
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
      <Text style={styles.title}>Notifications</Text>
      <Button title="Mark All As Read" onPress={markAllAsRead} />
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.centered}>No new notifications.</Text>}
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
  notificationItem: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  unreadNotification: {
    backgroundColor: '#e0f7fa',
    borderLeftWidth: 5,
    borderLeftColor: '#00bcd4',
  },
  readNotification: {
    backgroundColor: '#f0f0f0',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationBody: {
    fontSize: 16,
    color: '#555',
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

export default NotificationScreen;

