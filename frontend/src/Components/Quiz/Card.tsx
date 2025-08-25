import { useState } from "react";
import type { Question } from "../../Interfaces/Question";
import AnswerComponent from "./AnswerComponent";
import Title from "./TitleComponent";
import Button from "./ButtonComponent";

const Card = (props: {
  card: Question;
  index: number;
  setIndex: (index: number) => void;
  score: number;
  setScore: (score: number) => void;
  playing?: boolean;
  setPlaying?: (playing: boolean) => void;
}) => {
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
            setScore={props.setScore}
            score={props.score}
          />
        ))}
      </ul>
      <Button
        index={props.index}
        setIndex={props.setIndex}
        chosenAnswer={chosenAnswer}
        inQuiz={true}
        playing={props.playing}
        setPlaying={props.setPlaying}
      />
    </div>
  );
};

export default Card;
