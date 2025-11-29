import React, { useState } from 'react';

const CreateTest = () => {
  const [testTitle, setTestTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, text: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A' },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const testPayload = {
      title: testTitle,
      duration: duration,
      questions: questions.map(({ id, ...rest }) => rest), // Remove id for backend submission
    };
    console.log('Submitting Test Payload:', testPayload);
    // Placeholder for API call to backend
    alert('Test Created (Check console for payload)');
    // Reset form (optional)
    setTestTitle('');
    setDuration('');
    setQuestions([]);
  };

  return (
    <div className="create-test-container" style={{ padding: '20px' }}>
      <h2>Create New Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="testTitle" style={{ display: 'block', marginBottom: '5px' }}>Test Title:</label>
          <input
            type="text"
            id="testTitle"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="duration" style={{ display: 'block', marginBottom: '5px' }}>Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            min="1"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={question.id} style={{ border: '1px solid #eee', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
            <h4>Question {index + 1}</h4>
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Question Text:</label>
              <textarea
                value={question.text}
                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
            {[ 'A', 'B', 'C', 'D' ].map((optionKey) => (
              <div className="form-group" style={{ marginBottom: '10px' }} key={optionKey}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Option {optionKey}:</label>
                <input
                  type="text"
                  value={question[`option${optionKey}`]}
                  onChange={(e) => handleQuestionChange(index, `option${optionKey}`, e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Correct Answer:</label>
              <select
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}
        >
          Add Question
        </button>

        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Create Test
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
