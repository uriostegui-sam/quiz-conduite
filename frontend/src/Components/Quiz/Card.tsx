import { useState } from "react";
import type { Question } from "../../Interfaces/Question";
import AnswerComponent from "./AnswerComponent";
import Title from "./TitleComponent";

const Card = (props: { card: Question }) => {
  const { all_answers, incorrect_answers, correct_answer } = props.card;
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Title title={props.card.question} />
      <ul className="flex flex-col gap-3">
        {all_answers.map((answer, i) => (
          <AnswerComponent
            key={i}
            answer={answer}
            incorrectAnswers={incorrect_answers}
            correctAnswer={correct_answer}
            setChosenAnswer={setChosenAnswer}
            chosenAnswer={chosenAnswer}
          />
        ))}
      </ul>
    </div>
  );
};

export default Card;
