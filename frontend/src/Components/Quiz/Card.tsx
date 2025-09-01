import { useState } from "react";
import "./Card.css";
import QuestionComponent from "./QuestionComponent";
import type { Card } from "../../Interfaces/Card";
import type { Question } from "../../Interfaces/Question";

const Card = (props: {
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

  const activeQuestion = props.cardData.questions.find(
    (question) => question.id === props.activeQuestion
  );

  console.log(props.cardData);
  return (
    <div
      key={props.cardData.cardNumber}
      className={`flex items-center justify-center gap-6`}
    >
      {props.cardData.questions.map((question: Question) => {
        const isAnswered = props.answeredQuestions.includes(question.id);

        return (
          <div
            key={question.id}
            className={`card ${isAnswered ? "answered" : ""}`}
            onClick={() => props.flipTheCard(question.id)}
          >
            <div className="front">{question.category}</div>
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
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
