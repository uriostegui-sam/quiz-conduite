import ArrowRight from "../../assets/icon/arrow-right.svg";
import Repeat from "../../assets/icon/repeat.svg";

const Button = (props: {
  index?: number;
  setIndex?: (index: number) => void;
  chosenAnswer?: string | null;
  inQuiz: boolean;
}) => {
  const next = () => {
    if (props.chosenAnswer !== null) {
      if(props.setIndex && props.index) props.setIndex(props.index + 1);
    }
  };

  const restart = () => {
    return;
  };

  const isNotClicked = props.chosenAnswer === null;
  return (
    <button
      onClick={props.inQuiz ? next : restart}
      className={`relative h-12 overflow-hidden rounded px-5 py-2.5 text-white transition-all duration-300 bg-cyan-700 hover:bg-cyan-700 hover:ring-2 hover:ring-cyan-700 hover:ring-offset-2 disabled:bg-gray-200 disabled:border-gray-200`}
      disabled={props.inQuiz ? isNotClicked : false}
    >
      {props.inQuiz ? (
        <span className="relative flex items-center gap-3">
          <p>Next question</p>
          <img src={ArrowRight} className="w-5 h-5" />
        </span>
      ) : (
        <span className="relative flex items-center gap-3">
          <p>Restart game</p>
          <img src={Repeat} className="w-5 h-5" />
        </span>
      )}
    </button>
  );
};

export default Button;
