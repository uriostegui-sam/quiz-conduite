import Answer from "./AnswerComponent";
import Button from "./ButtonComponent";
import Title from "./TitleComponent";

const Quiz = () => {
  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <h1>Quiz conduite</h1>
      <hr />
      <div className="1 flex flex-col items-center justify-center gap-5">
        <Title />
        <ul className="flex flex-col gap-3">
          <Answer />
          <Answer />
          <Answer />
          <Answer />
        </ul>
        <Button />
        <div className="question-number">1 of 5 questions</div>
      </div>
    </div>
  );
};

export default Quiz;
