import { useState } from "react";
import "./CardWithQuestions.css";
import QuestionComponent from "./QuestionComponent";
import type { Card } from "../../Interfaces/Card";
import type { Question } from "../../Interfaces/Question";
import Check from "../../assets/icon/circle-check.svg";
import Xmark from "../../assets/icon/circle-xmark.svg";

const CardWithQuestions = (props: {
  index: number;
  setIndex: (index: number) => void;
  score: number;
  setScore: (score: number) => void;
  playing?: boolean;
  setPlaying?: (playing: boolean) => void;
  cardData: Card;
  flipTheCard: (id: number) => void;
  activeQuestion: number | null;
  setActiveQuestion: (activeQuestion: number | null) => void;
  answeredQuestions: number[];
  setAnsweredQuestions: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [isCard, setIsCard] = useState<boolean>(true);
  const [isCorrect, setIsCorrect] = useState<boolean | null | undefined>(null)
  const [questionResults, setQuestionResults] = useState<Record<number, 'correct'|'incorrect'|null>>({});
  const [userResponse, setUserResponse] = useState<Record<number, string | null>>({});

  const activeQuestion = props.cardData.questions.find(
    (question) => question.id === props.activeQuestion
  );

  return (
    <div
      key={props.cardData.cardNumber}
      className={`flex items-center justify-center gap-6`}
    >
      {props.cardData.questions.map((question: Question) => {
        const isAnswered = props.answeredQuestions.includes(question.id);
        const cardColor = (isCorrect: string | null) => {
          if(isCorrect === 'correct') {
            return 'bg-green-100'
          } else if (isCorrect === 'incorrect') {
            return 'bg-red-100'
          } else {
            return 'bg-neutral-100'
          }
        };

        return (
          <div
            key={question.id}
            className={`card ${isAnswered ? "answered" : ""} ${cardColor(questionResults[question.id])}`}
            onClick={() => props.flipTheCard(question.id)}
          >
            <div className={`front`}>
              <div className="category">{question.category}</div>
              <div>{isAnswered ? <img src={questionResults[question.id] === 'correct' ? Check : Xmark} className="w-5 h-5" /> : ""}</div>
            </div>
          </div>
        );
      })}

      {props.activeQuestion && (
        <div className="modal fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-3xl shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => props.setActiveQuestion(null)}
            >
              ✕
            </button>
            {activeQuestion && (
              <QuestionComponent
                card={activeQuestion}
                index={props.index}
                setIndex={props.setIndex}
                score={props.score}
                setScore={props.setScore}
                isCard={isCard}
                onAnswer={() => {
                  props.setAnsweredQuestions((prev: number[]) => [
                    ...prev,
                    activeQuestion.id,
                  ]); // mark answered
                  props.setActiveQuestion(null); // close
                  setQuestionResults((prev) => ({
                    ...prev,
                    [activeQuestion.id]: isCorrect ? 'correct' : 'incorrect'
                  }))                  
                }}
                questionResults={questionResults}
                setQuestionResults={setQuestionResults}
                isCorrect={isCorrect}
                setIsCorrect={setIsCorrect}
                userResponse={userResponse}
                setUserResponse={setUserResponse}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardWithQuestions;
