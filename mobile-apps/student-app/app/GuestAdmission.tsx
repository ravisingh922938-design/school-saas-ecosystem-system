import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const GuestAdmission = () => {
  const applicationFee = 500;
  const surcharge = 30;
  const totalAmount = applicationFee + surcharge;

  const handleSubmitApplication = () => {
    // Here you would integrate with a payment gateway and submit the application.
    // For now, we'll just show an alert.
    Alert.alert(
      'Payment & Submission',
      `Initiating payment for ₹${totalAmount} and submitting your application.`,
      [
        { text: 'OK', onPress: () => console.log('Payment process initiated') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest Admission Application</Text>

      <View style={styles.feeContainer}>
        <Text style={styles.feeText}>
          Application Fee: ₹{applicationFee} + Surcharge: ₹{surcharge}
        </Text>
      </View>

      <Button
        title={`Pay ₹${totalAmount} & Submit Application`}
        onPress={handleSubmitApplication}
      />
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
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  feeContainer: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#b2ebf2',
  },
  feeText: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GuestAdmission;



