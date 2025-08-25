import Button from "../Quiz/ButtonComponent";

const ResultQuestionsComponent = (props: {
  score: number;
  totalQuestions: number;
  category: string;
  categoryOptions: Record<string, string>;
  start?: boolean;
  setStart?: (start: boolean) => void;
  reStart?: boolean;
  setReStart?: (reStart: boolean) => void;
  index?: number;
  setIndex?: (index: number) => void;
}) => {
  return (
    <div className="container flex flex-col gap-10 justify-center items-center">
      <h2 className="text-4xl">
        Categorie :{" "}
        <span className="font-semibold">
          {props.categoryOptions[props.category]}
        </span>
      </h2>
      <h3 className="text-3xl">
        You scored {props.score}/{props.totalQuestions} correct answers
      </h3>
      <Button
        inQuiz={false}
        start={props.start}
        setStart={props.setStart}
        reStart={props.reStart}
        setReStart={props.setReStart}
        index={props.index}
        setIndex={props.setIndex}        
      />
    </div>
  );
};

export default ResultQuestionsComponent;
