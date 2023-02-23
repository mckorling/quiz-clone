import React, { useEffect, useState } from "react";
import { forwardRef } from "react";
import { Answer } from "../../interfaces";

const AnswerBlock = ({ answerOptions, chosenAnswerItems} : {
    answerOptions: Answer[] | undefined,
    chosenAnswerItems: String[]
}, ref: any) => {
    const [result, setResult] = useState<Answer | null>()
    useEffect(() => {
        answerOptions?.forEach((answer: Answer) => {
            if (
                chosenAnswerItems.includes(answer.combination[0]) &&
                chosenAnswerItems.includes(answer.combination[1]) &&
                chosenAnswerItems.includes(answer.combination[2])
            ) {
                setResult(answer)
            }
        })
    }, [chosenAnswerItems])

    return (
        <div className="answer-block" ref={ref}>
            <h2>{result?.text}</h2>
            <img src={result?.image} alt={result?.alt} />
        </div>
    );
}

export default forwardRef(AnswerBlock)