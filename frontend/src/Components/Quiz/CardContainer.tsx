import { useEffect, useState } from "react";
import type { Card as CardInterface } from "../../Interfaces/Card";
import Card from "./CardWithQuestions";

const CardContainer = (props: {
  cardData: CardInterface;
  cardIndex: number;
  setIndex: (index: number) => void;
  score: number;
  setScore: (score: number) => void;
  setCardIndex: (index: number) => void;
}) => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  useEffect(() => {
    setAnsweredQuestions([]);
  }, [props.cardIndex]);

  const flipTheCard = (id: number) => {
    setActiveQuestion(id);
  };
  return (
    <div className="text-center">
      <h2 className="text-4xl">Ensemble {props.cardData.cardNumber}</h2>
      <div className="py-15">
        <div
          key={props.cardData.cardNumber}
          className={`flex items-center justify-between`}
        >
          <Card
            key={props.cardData.cardNumber}
            cardData={props.cardData}
            index={props.cardIndex}
            setIndex={props.setIndex}
            score={props.score}
            setScore={props.setScore}
            flipTheCard={flipTheCard}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            answeredQuestions={answeredQuestions}
            setAnsweredQuestions={setAnsweredQuestions}
          />
        </div>
      </div>
      <button
        onClick={() => props.setCardIndex(props.cardIndex + 1)}
        disabled={answeredQuestions.length !== 3}
        className={`relative h-12 overflow-hidden rounded px-5 py-2.5 text-white transition-all duration-300 bg-cyan-700 hover:bg-cyan-700 hover:ring-2 hover:ring-cyan-700 hover:ring-offset-2 disabled:bg-gray-200 disabled:border-gray-200`}
      >
        Ensemble de cartes suivant
      </button>
    </div>
  );
};

export default CardContainer;
