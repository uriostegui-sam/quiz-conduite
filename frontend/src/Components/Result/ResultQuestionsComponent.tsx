import Button from "../Quiz/ButtonComponent";

const ResultQuestionsComponent = (props: {
  score: number;
  totalQuestions: number;
}) => {

  return (
    <div className="container flex flex-col gap-10 justify-center items-center">
      <h2 className="text-4xl">
        {/* {props.category} */}
        titre
      </h2>
      <h3 className="text-3xl">
        You scored {props.score}/{props.totalQuestions} correct answers
      </h3>
      <Button inQuiz={false} />
    </div>
  );
};

export default ResultQuestionsComponent;
