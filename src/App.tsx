import React from 'react';
import Title from './components/Title';
import { useState, useEffect } from 'react';
import { QuizData } from '../interfaces'

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
      <Title></Title>
    </div>
  );
}

export default App;
