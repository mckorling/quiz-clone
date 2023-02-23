import { Content, Question } from "../../interfaces";
import QuestionBlock from "./QuestionBlock";
import { forwardRef, LegacyRef } from "react";

const QuestionsBlock = ({ quizItem, setChosenAnswerItems, setUnansweredQuestionIds, unansweredQuestionIds, chosenAnswerItems } : {
    quizItem: Content,
    setChosenAnswerItems: Function,
    setUnansweredQuestionIds: Function,
    unansweredQuestionIds: number[] | undefined,
    chosenAnswerItems: String[]
}, ref: LegacyRef<HTMLHeadingElement> | undefined) => {
    
    return (
        <div>
            <h2 className="title-block" ref={ref}>{quizItem.text}</h2>
            <div className="questions-container">
                {quizItem?.questions.map((question: Question, _index: number) => (
                    <QuestionBlock 
                        key={_index} 
                        question={question}
                        setChosenAnswerItems={setChosenAnswerItems}
                        chosenAnswerItems={chosenAnswerItems}
                        setUnansweredQuestionIds={setUnansweredQuestionIds}
                        unansweredQuestionIds={unansweredQuestionIds}
                        quizItemId={quizItem.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default forwardRef(QuestionsBlock)