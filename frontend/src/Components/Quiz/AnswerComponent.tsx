const AnswerComponent = (props: {
  answer: string;
  incorrectAnswers: Array<string>;
  correctAnswer: string;
  setChosenAnswer: (answer: string) => void;
  chosenAnswer: string | null;
  score: number;
  setScore: (score: number) => void;
}) => {
  const selectAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
    if (props.chosenAnswer) return;
    const input = e.target as HTMLElement;
    const selected = input.textContent || "";
    props.setChosenAnswer(selected);

    if(selected === props.correctAnswer){
      props.setScore(props.score + 1);
    }
  };

  const checkAnswer = () => {
    if (props.answer === props.chosenAnswer) {
      if (props.chosenAnswer === props.correctAnswer) {
        return "bg-green-100 border-green-100";
      } else {
        return "bg-red-100 border-red-100";
      }
    }

    if (props.chosenAnswer !== null) {
      if (props.correctAnswer === props.answer)
        return "bg-green-100 border-cyan-700";
    }
    return "bg-white border-cyan-700 hover:bg-[#00759516] hover:border-[#00759516]";
  };

  return (
    <li
      onClick={selectAnswer}
      className={`border-1 rounded-md flex items justify-center py-2 px-3 ${checkAnswer()}`}
    >
      {props.answer}
    </li>
  );
};

export default AnswerComponent;
