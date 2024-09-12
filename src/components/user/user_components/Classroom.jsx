import React, { useState, useMemo } from 'react';
import { Card, CardContent, Typography, List, ListItem, Radio, RadioGroup, FormControlLabel, Button, Link } from '@mui/material';
import Main from './quiz/main';
// import main from './quiz/main';
function Classroom({ classroom }) {

  const [selectedOptions, setSelectedOptions] = useState({});
  const [messages, setMessages] = useState({});

  // Function to parse MCQs from the provided string format
  const parseMcqs = (mcqsString) => {
    try {
      const mcqBlocks = mcqsString.trim().split('\n\n'); // Split MCQs based on double line breaks
      const parsedMcqs = [];
  
      for (let i = 0; i < mcqBlocks.length; i += 2) {
        const questionBlock = mcqBlocks[i];
        const answerBlock = mcqBlocks[i + 1];
  
        const lines = questionBlock.trim().split('\n'); // Split each block into lines
        const questionText = lines[0].split('. ')[1]; // Extract the question text
        const options = [];
        let correctAnswer = '';
  
        // Loop through the remaining lines to find options
        lines.slice(1).forEach((line) => {
          const optionMatch = line.match(/^([A-D])\.\s*(.+)/); // Match options (A, B, C, D)
          if (optionMatch) {
            options.push({ key: optionMatch[1], text: optionMatch[2].trim() });
          }
        });
  
        // Extract the correct answer from the answer block
        const answerMatch = answerBlock.match(/^Answer:\s*([A-D])/);
        console.log(answerMatch)
        if (answerMatch) {
          correctAnswer = answerMatch[1];
        }
  
        // Find the correct answer text from the options
        const correctOption = options.find(option => option.key === correctAnswer);
        const answerText = correctOption ? correctOption.text : '';
        
        parsedMcqs.push({ questionText, options, correctAnswer, answerText });
      }
  
      return parsedMcqs;
    } catch (error) {
      console.error("Error parsing MCQs:", error);
      return [];
    }
  };

  // Memoize parsed MCQs to avoid unnecessary recalculations
  const parsedMcqs = useMemo(() => {
    if (classroom.lectures.length > 0) {
      console.log(parseMcqs(classroom.lectures[0].response.mcqs))
      return parseMcqs(classroom.lectures[0].response.mcqs);
    }
    return [];
  }, [classroom.lectures]);

  // Handle answer checking
  const checkAnswer = (question, index) => {
    const correctAnswer = question.correctAnswer;
    const answertext = question.answerText ? `(${question.answerText})` : '';
    setMessages(prevMessages => ({
      ...prevMessages,
      [index]: selectedOptions[index] === correctAnswer
        ? 'Congrats you got it!!!!'
        : `You selected ${selectedOptions[index]}. Correct answer is: ${correctAnswer}${answertext}`
    }));
  };

  return (
    <Card key={classroom.id} sx={{ marginBottom: 3 }}>
      
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: 'purple', fontWeight: 'bold' }}>
          {classroom.name}
        </Typography>
        <Typography sx={{ mb: 2, color: 'gray' }}>
          Code: {classroom.code}
        </Typography>

        {/* Display Resources */}
        <div>
          <Typography variant="h6" component="div" sx={{ color: 'green', fontWeight: 'bold' }}>
            Resources
          </Typography>
          <List>
            {classroom.resources && classroom.resources.map((resource) => (
              <ListItem key={resource.id}>
                <Link href={resource.file} download sx={{ color: 'blue', textDecoration: 'none' }}>
                  {resource.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>

        {/* Display Lectures */}
        <div>
          <Typography variant="h6" component="div" sx={{ color: 'orange', fontWeight: 'bold' }}>
            Lectures
          </Typography>
          {classroom.lectures && classroom.lectures.map((lecture) => (
            <div key={lecture.id} style={{ marginBottom: '20px' }}>
              <Typography variant="body1" component="div" sx={{ color: 'black', marginTop: '10px' }}>
                {lecture.name}
              </Typography>
              <Typography variant="body2" component="div" sx={{ color: 'gray', marginTop: '10px' }}>
                {lecture.response.summary}
              </Typography>
            </div>
          ))}
        </div>

        {/* Display MCQs */}
        <div>
          {parsedMcqs.map((mcq, index) => (
            <div key={index} style={{ marginTop: '20px' }}>
              <Typography variant="body1" sx={{ color: 'red' }}>
                {mcq.questionText}
              </Typography>
              <RadioGroup
                value={selectedOptions[index] || ""}
                onChange={(e) => setSelectedOptions((prevOptions) => ({ ...prevOptions, [index]: e.target.value }))}
                sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}
              >
                {mcq.options.map((option) => (
                  <FormControlLabel 
                    key={option.key} 
                    value={option.key} 
                    control={<Radio />} 
                    label={`${option.key}. ${option.text}`} 
                  />
                ))}
              </RadioGroup>
              <Button
                variant="contained"
                sx={{ marginTop: '10px', background: 'linear-gradient(to right, #f50057, #3f51b5)' }}
                onClick={() => checkAnswer(mcq, index)}
              >
                Check Answer
              </Button>
              {messages[index] && (
                <Typography variant="body2" sx={{ color: messages[index].includes('Congrats') ? 'green' : 'red', marginTop: '10px' }}>
                  {messages[index]}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      
    </Card>
  );
}

export default Classroom;
