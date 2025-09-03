import { useState } from "react";
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

    const flipTheCard = (id: number) => {
      if (answeredQuestions.includes(id)) return;

      setActiveQuestion(id);
    };
  return (
     <div>
        <h2>Conjunto {props.cardData.cardNumber}</h2>
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
        <button onClick={() => props.setCardIndex(props.cardIndex + 1)}>
          Siguiente conjunto
        </button>
      </div>
  );
};

export default CardContainer;
