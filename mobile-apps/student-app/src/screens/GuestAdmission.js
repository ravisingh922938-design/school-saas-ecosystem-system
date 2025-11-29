import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import config from '../config';

const GuestAdmission = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male'); // Default to Male
  const [mobile, setMobile] = useState('');
  const [classApplyingFor, setClassApplyingFor] = useState('Class 1'); // Default to Class 1

  const applicationFee = 500;
  const platformSurcharge = 20;
  const totalAmount = applicationFee + platformSurcharge;

  const handlePayAndSubmit = async () => {
    if (!name || !mobile || !classApplyingFor) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    Alert.alert('Payment', 'Redirecting to Payment Gateway...');

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/admission/guest-apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          gender,
          mobile,
          classApplyingFor,
          applicationFee,
          platformSurcharge,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Lead saved successfully:', data);
        Alert.alert('Success', 'Application submitted and lead saved.');
        // Further navigation or state reset could happen here
      } else {
        console.error('Failed to save lead:', data);
        Alert.alert('Error', data.message || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Could not connect to the server. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest Admission Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Class Applying For:</Text>
        <Picker
          selectedValue={classApplyingFor}
          style={styles.picker}
          onValueChange={(itemValue) => setClassApplyingFor(itemValue)}
        >
          {[...Array(12)].map((_, i) => (
            <Picker.Item key={i} label={`Class ${i + 1}`} value={`Class ${i + 1}`} />
          ))}
          <Picker.Item label="Nursery" value="Nursery" />
          <Picker.Item label="LKG" value="LKG" />
          <Picker.Item label="UKG" value="UKG" />
        </Picker>
      </View>

      <Text style={styles.feeText}>Application Fee: ₹{applicationFee}</Text>
      <Text style={styles.feeText}>Platform Surcharge: ₹{platformSurcharge}</Text>

      <Button
        title={`Pay ₹${totalAmount} & Submit`}
        onPress={handlePayAndSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 50,
    overflow: 'hidden', // Clip content if it overflows
  },
  pickerLabel: {
    fontSize: 16,
    color: '#555',
    paddingLeft: 15,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  feeText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default GuestAdmission;
