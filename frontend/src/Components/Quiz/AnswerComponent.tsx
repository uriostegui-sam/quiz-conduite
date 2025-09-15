const AnswerComponent = (props: {
  answer: string;
  id: number;
  incorrectAnswers: Array<string>;
  correctAnswer: string;
  setChosenAnswer?: (answer: string) => void;
  chosenAnswer?: string | null;
  score: number;
  setScore: (score: number) => void;
  isCorrect?: boolean | null | undefined;
  setIsCorrect?: (isCorrect: boolean | null | undefined) => void;
  questionResults?: Record<number, 'correct'|'incorrect'|null> | undefined;
  setQuestionResults?: (questionResults: Record<number, 'correct'|'incorrect'|null>) => void;
  userResponse?: Record<number, string | null> | undefined;
  setUserResponse?: React.Dispatch<React.SetStateAction<Record<number, string | null>>>;
}) => {

  const baseUrl = import.meta.env.VITE_IMGS_QUESTIONS_URL;
  
  const selectAnswer = (e: React.MouseEvent<HTMLLIElement>) => {
    if (props.chosenAnswer) return;

    const input = e.target as HTMLImageElement | HTMLElement;
    const srcImage = input.getAttribute('src')?.slice(baseUrl.length + 1);
    const selected = !input.firstElementChild ? input.textContent : srcImage;

    props.setChosenAnswer?.(selected as string);

    props.setUserResponse?.((prev) => ({
      ...prev,
      [props.id]: selected as string,
    }));

    if(props.correctAnswer === props.correctAnswer){
      props.setScore(props.score + 1);
      props.setIsCorrect?.(true);
    } else {
      props.setIsCorrect?.(false);
    }
  };

  const checkAnswer = () => {
    const chosen = props.userResponse?.[props.id]

    if(chosen){
      if(props.answer === props.correctAnswer){
        return "bg-green-100 border-green-100";
      }
      if(props.answer === chosen && chosen !== props.correctAnswer){
        return "bg-red-100 border-red-100";
      }
      return "bg-white border-cyan-700 hover:bg-[#00759516] hover:border-[#00759516]";
    }
    
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

  const checkIfImg = (isHref: string): React.ReactNode => {
    const imageFileFormats = ['avif', 'png', 'jpg', 'webp'];
    const extension = isHref.split('.').pop()?.toLowerCase();;

    if (extension && imageFileFormats.includes(extension)) {
      return <img src={baseUrl + '/' + isHref} className="w-40" alt={`images de ${props.correctAnswer}`} />
    } else {
      return isHref
    };
  }

  return (
    <li
      onClick={!props.userResponse?.[props.id] ? selectAnswer : () => null}
      className={`border-1 rounded-md flex items justify-center py-2 px-3 text-sm md:text-base ${checkAnswer()}`}
    >
      {checkIfImg(props.answer)}
    </li>
  );
};

export default AnswerComponent;
