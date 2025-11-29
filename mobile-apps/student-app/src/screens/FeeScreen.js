import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'razorpay/react-native-razorpay'; // Import RazorpayCheckout

const FeeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [feeAmount, setFeeAmount] = useState(1000); // Example fee amount
  const [description, setDescription] = useState('Monthly Tuition Fee');

  const handlePayNow = async () => {
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        Alert.alert('Error', 'You must be logged in to make a payment.');
        setLoading(false);
        return;
      }

      // Step 1: Call Backend createOrder API
      const orderResponse = await fetch(`${config.API_BASE_URL}/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          amount: feeAmount * 100, // Amount in smallest currency unit (e.g., paise for INR)
          currency: 'INR',
          receipt: 'receipt#1', // Unique receipt ID
          notes: { description },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        Alert.alert('Error', orderData.message || 'Failed to create order.');
        setLoading(false);
        return;
      }

      const { orderId, keyId, studentName, studentEmail, studentMobile } = orderData; // Assuming backend returns orderId, Razorpay keyId, and student details

      // Step 2: Open Razorpay UI
      RazorpayCheckout.open({
        description: description,
        currency: 'INR',
        key: keyId,
        amount: feeAmount * 100, // Amount in smallest currency unit
        name: 'School SaaS Ecosystem',
        order_id: orderId,
        prefill: {
          contact: studentMobile || '',
          email: studentEmail || '',
          name: studentName || '',
        },
        theme: {
          color: '#007bff' // Example theme color
        },
      }).then(async (data) => {
        // Step 3: On success, call Backend verifyPayment
        const verifyResponse = await fetch(`${config.API_BASE_URL}/payments/verify-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            orderId: orderId,
            paymentId: data.razorpay_payment_id,
            signature: data.razorpay_signature,
          }),
        });

        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok) {
          Alert.alert('Success', 'Payment verified successfully!');
        } else {
          Alert.alert('Error', verifyData.message || 'Payment verification failed.');
        }
        setLoading(false);
      }).catch((error) => {
        Alert.alert('Payment Failed', error.description || 'Payment failed. Please try again.');
        setLoading(false);
      });

    } catch (error) {
      console.error('Payment Error:', error);
      Alert.alert('Error', 'An error occurred during payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fee Payment</Text>
      <View style={styles.feeCard}>
        <Text style={styles.feeLabel}>Amount:</Text>
        <Text style={styles.feeValue}>₹{feeAmount}</Text>
      </View>
      <View style={styles.feeCard}>
        <Text style={styles.feeLabel}>Description:</Text>
        <Text style={styles.feeValue}>{description}</Text>
      </View>
      <Button
        title={loading ? "Processing..." : "Pay Now"}
        onPress={handlePayNow}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={styles.spinner} size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  feeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  feeLabel: {
    fontSize: 18,
    color: '#555',
  },
  feeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  spinner: {
    marginTop: 20,
  },
});

export default FeeScreen;
