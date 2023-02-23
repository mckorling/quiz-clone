import Title from './components/Title';
import { useState, useEffect, createRef } from 'react';
import { Content, QuizData } from '../interfaces'
import QuestionsBlock from './components/QuestionsBlock';
import AnswerBlock from './components/AnswerBlock';

const App = () => {

  const [quiz, setQuiz] = useState<QuizData | null>()
  const [chosenAnswerItems, setChosenAnswerItems] = useState<String[]>([])
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[] | undefined>([])
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  type ReduceType = {
    id?: {}
  }
  const refs = unansweredQuestionIds?.reduce<ReduceType | any>((acc, id) => {
    acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>()
    return acc
  }, {})
  const answerRef = createRef<HTMLDivElement | null>()

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

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({id} : Content) => id)
    setUnansweredQuestionIds(unansweredIds)
  }, [quiz])

  // scrolls to next question that needs to be answered
  useEffect(() => {
    if (chosenAnswerItems.length > 0 && unansweredQuestionIds) {
      if (showAnswer && answerRef.current) {
        answerRef.current.scrollIntoView({behavior: "smooth"})
      }
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true)
        // const answerBlock = document.getElementById("answer-block")
        // answerBlock?.scrollIntoView({behavior: "smooth"})
      } else {
        const highestId = Math.min(...unansweredQuestionIds)
        refs[highestId].current.scrollIntoView({behavior: "smooth"})
      }
      // not best practice
      // const highestElement = document.getElementById(String(highestId))
      // highestElement?.scrollIntoView({behavior: "smooth"})
    }
    
  }, [unansweredQuestionIds, chosenAnswerItems.length, showAnswer, answerRef.current, refs])

  return (
    <div className='app'>
      <Title title={quiz?.title} subtitle={quiz?.subtitle}></Title>
      {refs && quiz?.content.map((content: Content) => (
        <QuestionsBlock
          key={content.id}
          quizItem={content}
          setChosenAnswerItems={setChosenAnswerItems}
          chosenAnswerItems={chosenAnswerItems}
          setUnansweredQuestionIds={setUnansweredQuestionIds}  
          unansweredQuestionIds={unansweredQuestionIds}
          ref={refs[content.id]}
        />
      ))}
      {showAnswer && <AnswerBlock 
        answerOptions={quiz?.answers} 
        chosenAnswerItems={chosenAnswerItems}
        ref={answerRef}
      />}
    </div>
  );
}

export default App;
