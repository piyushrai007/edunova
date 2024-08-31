import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Radio, RadioGroup, FormControlLabel, Button, Link } from '@mui/material';

function Classroom({ classroom, selectedOptions, setSelectedOptions, checkAnswer, messages }) {
  const parseMcqs = (mcqsString) => {
    const mcqBlocks = mcqsString.trim().split('\n\n');
    return mcqBlocks.map(mcqBlock => {
      const lines = mcqBlock.split('\n');
      const questionText = lines[0].replace('Question: ', '');
      const options = lines.slice(1, -1).map(line => line.replace('Answers: ', '').split('\n')).flat();
      const correctAnswer = lines[lines.length - 1].replace('Correct Answer: ', '');
      return {
        text: questionText,
        options: options.map(option => option.replace('Answers: ', '').trim()),
        correctAnswer: correctAnswer
      };
    });
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

        <div>
          <Typography variant="h6" component="div" sx={{ color: 'green', fontWeight: 'bold' }}>
            Resources
          </Typography>
          <List>
            {classroom.resources && classroom.resources.map(resource => (
              <ListItem key={resource.id}>
                <Link href={resource.file} download sx={{ color: 'blue', textDecoration: 'none' }}>
                  {resource.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>

        <div>
          <Typography variant="h6" component="div" sx={{ color: 'orange', fontWeight: 'bold' }}>
            Lectures
          </Typography>
          {classroom.lectures && classroom.lectures.map(lecture => (
            <div key={lecture.id} style={{ marginBottom: '20px' }}>
              <Typography variant="body1" component="div" sx={{ color: 'black', marginTop: '10px' }}>
                {lecture.name}
              </Typography>
              <Typography variant="body2" component="div" sx={{ color: 'gray', marginTop: '10px' }}>
                {lecture.response.summary}
              </Typography>

              {Array.isArray(lecture.response.questions) ? (
                lecture.response.questions.map((question, index) => (
                  <div key={index} style={{ marginTop: '20px' }}>
                    <Typography variant="body1" sx={{ color: 'black' }}>
                      {question.text}
                    </Typography>
                    <RadioGroup
                      value={selectedOptions[index]}
                      onChange={(e) => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: e.target.value }))}
                      sx={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}
                    >
                      {['A', 'B', 'C', 'D'].map(option => (
                        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                      ))}
                    </RadioGroup>
                    <Button
                      variant="contained"
                      sx={{ marginTop: '10px', background: 'linear-gradient(to right, #f50057, #3f51b5)' }}
                      onClick={() => checkAnswer(question, index)}
                    >
                      Check Answer
                    </Button>
                    <Typography variant="body2" sx={{ color: 'gray', marginTop: '10px' }}>
                      {messages[index]}
                    </Typography>
                  </div>
                ))
              ) : (
                Array.isArray(parseMcqs(lecture.response.mcqs)) && parseMcqs(lecture.response.mcqs).map((mcq, index) => (
                  <div key={index} style={{ marginTop: '20px' }}>
                    <Typography variant="body1" sx={{ color: 'black' }}>
                      {mcq.text}
                    </Typography>
                    <RadioGroup
                      value={selectedOptions[index]}
                      onChange={(e) => setSelectedOptions(prevOptions => ({ ...prevOptions, [index]: e.target.value }))}
                      sx={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}
                    >
                      {['A', 'B', 'C', 'D'].map(option => (
                        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                      ))}
                    </RadioGroup>
                    <Button
                      variant="contained"
                      sx={{ marginTop: '10px', background: 'linear-gradient(to right, #f50057, #3f51b5)' }}
                      onClick={() => checkAnswer(mcq, index)}
                    >
                      Check Answer
                    </Button>
                    <Typography variant="body2" sx={{ color: 'gray', marginTop: '10px' }}>
                      {messages[index]}
                    </Typography>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Classroom;
