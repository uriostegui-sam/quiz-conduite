import { useState } from "react";
import type { Question } from "../../Interfaces/Question";
import AnswerComponent from "./AnswerComponent";
import Title from "./TitleComponent";
import Button from "./ButtonComponent";

const QuestionComponent = (props: {
  card: Question;
  index: number;
  setIndex: (index: number) => void;
  score: number;
  setScore: (score: number) => void;
  playing?: boolean;
  setPlaying?: (playing: boolean) => void;
  isCard?: boolean;
  onAnswer?: () => void;
  isCorrect?: boolean | null | undefined;
  setIsCorrect?: (isCorrect: boolean | null | undefined) => void;
  questionResults?: Record<number, 'correct'|'incorrect'|null>;
  setQuestionResults?: (questionResults: Record<number, 'correct'|'incorrect'|null>) => void;
}) => {
  const { all_answers, incorrect_answers, correct_answer } = props.card;
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-6 ">
      <Title title={props.card?.question} />
      <ul className="flex flex-col gap-3">
        {all_answers.map((answer: string, i: number) => (
          <AnswerComponent
            key={i}
            answer={answer}
            incorrectAnswers={incorrect_answers}
            correctAnswer={correct_answer}
            setChosenAnswer={setChosenAnswer}
            chosenAnswer={chosenAnswer}
            setScore={props.setScore}
            score={props.score}
            isCorrect={props.isCorrect}
            setIsCorrect={props.setIsCorrect}
            questionResults={props.questionResults}
            setQuestionResults={props.setQuestionResults}
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
          isCard={props.isCard}
          onClickAfter={() => {
            if (props.onAnswer) props.onAnswer(); // close + mark answered
          }}
        />
    </div>
  );
};

export default QuestionComponent;
