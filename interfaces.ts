interface QuizData {
    title: string;
    subtitle: string;
    quizId: string;
    content: Content[];
    answers: Answers[];
}

interface Answer {
    text: string;
    image: string;
    combination: string[];
    alt: string;
}

interface Content {
    id: number;
    text: string;
    questions: Question[];
}

interface Question {
    text: string;
    credit: string;
    image: string;
    alt: string;
}

export type { QuizData, Answer, Content, Question }