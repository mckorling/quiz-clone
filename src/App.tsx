import React from 'react';
import Title from './components/Title';
import { useState, useEffect } from 'react';
import { Content, QuizData } from '../interfaces'
import QuestionsBlock from './components/QuestionsBlock';

const App = () => {

  const [quiz, setQuiz] = useState<QuizData | null>()

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/quiz-item")
      const json = await response.json()
      setQuiz(json)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  console.log(quiz)

  return (
    <div>
      <Title title={quiz?.title} subtitle={quiz?.subtitle}></Title>
      {quiz?.content.map((content: Content, id: Content["id"]) => (
        <QuestionsBlock
          key={id}
          quizItem={content}  
        />
      ))}
    </div>
  );
}

export default App;
