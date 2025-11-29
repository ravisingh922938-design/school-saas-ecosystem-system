import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const OnlineTestScreen = () => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchActiveTests();
  }, []);

  useEffect(() => {
    if (activeTest && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeTest) {
      handleSubmitTest(true); // Auto-submit when time runs out
    }
    return () => clearInterval(timerRef.current);
  }, [activeTest, timeLeft]);

  const fetchActiveTests = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        Alert.alert('Error', 'You must be logged in to fetch tests.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${config.API_BASE_URL}/tests/active`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setTests(data.tests);
        if (data.tests.length > 0) {
          // For simplicity, automatically start the first test found
          startTest(data.tests[0]);
        }
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch active tests.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Could not connect to the server to fetch tests.');
    } finally {
      setLoading(false);
    }
  };

  const startTest = (test) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(test.duration * 60); // duration in minutes
  };

  const handleAnswerSelection = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (activeTest && currentQuestionIndex < activeTest.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmitTest(false); // Manual submit
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmitTest = async (isAutoSubmit) => {
    clearInterval(timerRef.current);
    setLoading(true);

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        Alert.alert('Error', 'You must be logged in to submit a test.');
        setLoading(false);
        return;
      }

      const submissionResponse = await fetch(`${config.API_BASE_URL}/tests/${activeTest.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          answers,
          isAutoSubmit,
        }),
      });

      const submissionData = await submissionResponse.json();

      if (submissionResponse.ok) {
        Alert.alert('Test Submitted', submissionData.message || 'Your test has been submitted successfully.');
        setActiveTest(null); // End the test
        setLoading(false);
      } else {
        Alert.alert('Error', submissionData.message || 'Failed to submit test.');
      }
    } catch (error) {
      console.error('Submission API Error:', error);
      Alert.alert('Error', 'Could not connect to the server to submit test.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading tests...</Text>
      </View>
    );
  }

  if (!activeTest) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Available Tests</Text>
        {tests.length === 0 ? (
          <Text>No active tests available.</Text>
        ) : (
          <FlatList
            data={tests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.testItem} onPress={() => startTest(item)}>
                <Text style={styles.testTitle}>{item.name}</Text>
                <Text style={styles.testDetails}>Duration: {item.duration} mins</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }

  const currentQuestion = activeTest.questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Time Left: {formatTime(timeLeft)}</Text>
      </View>

      <Text style={styles.testName}>{activeTest.name}</Text>
      <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1} of {activeTest.questions.length}</Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.optionItem, answers[currentQuestion.id] === item.id && styles.selectedOption]}
            onPress={() => handleAnswerSelection(currentQuestion.id, item.id)}
          >
            <Text style={styles.optionText}>{item.option}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.navigationButtons}>
        <Button
          title="Previous"
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        />
        <Button
          title={currentQuestionIndex === activeTest.questions.length - 1 ? "Submit Test" : "Next"}
          onPress={handleNextQuestion}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  testItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  testDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  timerContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffeb3b',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  testName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 24,
  },
  optionItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#007bff',
    backgroundColor: '#e6f2ff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default OnlineTestScreen;






