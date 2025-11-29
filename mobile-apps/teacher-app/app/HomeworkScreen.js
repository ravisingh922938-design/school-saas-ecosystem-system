import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const HomeworkScreen = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(''); // Consider a date picker for production
  const [imageUri, setImageUri] = useState(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera permissions to take a photo.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant gallery permissions to select an image.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImageToBackend = async (uri) => {
    const formData = new FormData();
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('image', { uri, name: filename, type });

    try {
      const response = await fetch('https://example.com/api/upload/image', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl; // Assuming backend returns { imageUrl: '...' }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!subject || !topic || !description || !deadline) {
      Alert.alert('Missing fields', 'Please fill in all homework details.');
      return;
    }

    let uploadedImageUrl = null;
    if (imageUri) {
      try {
        uploadedImageUrl = await uploadImageToBackend(imageUri);
        Alert.alert('Image Uploaded', 'Image successfully uploaded.');
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload Failed', 'Failed to upload image.');
        return;
      }
    }

    const homeworkData = {
      subject,
      topic,
      description,
      deadline,
      imageUrl: uploadedImageUrl,
    };

    console.log('Saving homework entry:', homeworkData);
    try {
      const response = await fetch('https://example.com/api/homework', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(homeworkData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Homework assignment saved successfully!');
        // Clear form
        setSubject('');
        setTopic('');
        setDescription('');
        setDeadline('');
        setImageUri(null);
      } else {
        Alert.alert('Error', 'Failed to save homework assignment.');
      }
    } catch (error) {
      console.error('Error saving homework:', error);
      Alert.alert('Error', 'An error occurred while saving homework.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Homework Assignment</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />

      <TextInput
        style={styles.input}
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Deadline (YYYY-MM-DD)" // Consider a date picker for production
        value={deadline}
        onChangeText={setDeadline}
      />

      <View style={styles.photoButtonContainer}>
        <Button title="📸 Take Photo" onPress={takePhoto} />
        <Button title="Select from Gallery" onPress={pickImageFromGallery} />
      </View>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Button title="Submit Homework" onPress={handleSubmit} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  photoButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default HomeworkScreen;

