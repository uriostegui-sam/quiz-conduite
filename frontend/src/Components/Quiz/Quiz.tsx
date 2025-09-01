import "./Quiz.css";
import axios from "axios";
import QuestionComponent from "./QuestionComponent";
import { useQuery } from "@tanstack/react-query";
import type { Question } from "../../Interfaces/Question";
import { useEffect, useState } from "react";
import ResultQuestionsComponent from "../Result/ResultQuestionsComponent";
import Start from "./StartComponent";
import type { Form } from "../../Interfaces/Form";
import Card from "./Card";
import type { Card as CardInterface } from "../../Interfaces/Card";

const Quiz = () => {
  const startData: Form = {
    questions: 5,
    category: "",
    type: "cards",
  };

  const categoryOptions = {
    "": "Toutes les catégories",
    QSER: "Sécurité routière",
    VI: "Vérification intérieure",
    VE: "Vérification extérieure",
    "1er S": "1er secours",
  };

  let [index, setIndex] = useState(1);
  let [score, setScore] = useState(0);
  const [formData, setFormData] = useState<Form>(startData);
  const [start, setStart] = useState(false);
  const [reStart, setReStart] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const urlCategory =
    formData.category === "" ? "" : `&theme=${formData.category}`;

  const { data, isLoading, error } = useQuery<CardInterface[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      setPlaying(true);
      const response = await axios.get<CardInterface[]>(
        import.meta.env.VITE_API_URL +
          `/${formData.type}/random?count=${formData.questions}${urlCategory}`
      );
      return response.data;
    },
    enabled: start,
  });

  const currentCardSet = data?.[cardIndex];

  const cardsNumbered = () => {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);;
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

    const flipTheCard = (id: number) => {
      if (answeredQuestions.includes(id)) return;
      
      setActiveQuestion(id)
    };

    if (!currentCardSet) return null;
    return (
      <div>
        <h2>Conjunto {currentCardSet.cardNumber}</h2>
        <Card
          key={currentCardSet.cardNumber}
          cardData={currentCardSet}
          index={index}
          setIndex={setIndex}
          score={score}
          setScore={setScore}
          flipTheCard={flipTheCard}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          answeredQuestions={answeredQuestions}
          setAnsweredQuestions={setAnsweredQuestions}
        />
        <button onClick={() => setCardIndex(cardIndex + 1)}>
          Siguiente conjunto
        </button>
      </div>
    );
  };

  // const cardsNumbered = () => {
  //   return data?.map((card) => (
  //     <div key={card.id}>
  //       {
  //         card?.questions.map((question, j) => {
  //           console.log(card)
  //           console.log(question)
  //           // <QuestionComponent
  //           //   key={question.id}
  //           //   card={question}
  //           //   index={index}
  //           //   setIndex={setIndex}
  //           //   score={score}
  //           //   setScore={setScore}
  //           // />;
  //         })
  //         // console.log(card.questions[0]);
  //       }
  //     </div>
  //   ));
  // };

  const cards = () =>
    data &&
    data.length > 0 &&
    index <= data.length && (
      <QuestionComponent
        key={data[index - 1].id}
        card={data[index - 1]}
        index={index}
        setIndex={setIndex}
        score={score}
        setScore={setScore}
      />
    );

  const isCardOrQuestion = formData.category !== "" ? cards() : cardsNumbered();

  
  useEffect(() => {
    setIndex(1);
    setScore(0);
    setFormData(startData);
    setStart(false);
    setPlaying(false);
    setReStart(false);
  }, [reStart]);

  return (
    <div className="container flex flex-col gap-5 justify-center items-center">
      <h1>Quiz au volant</h1>
      <hr />
      <div>
        {!start && !playing && (
          <Start
            formData={formData}
            setFormData={setFormData}
            start={start}
            setStart={setStart}
            categoryOptions={categoryOptions}
          />
        )}
        {playing && isLoading && <p>Chargement des questions...</p>}
        {playing && error && (
          <p className="text-red-500">
            Erreur lors du chargement des questions
          </p>
        )}
        <div>{isCardOrQuestion}</div>
        {/* {playing && isCardOrQuestion
          ? isCardOrQuestion
          : start && (
              <ResultQuestionsComponent
                score={score}
                totalQuestions={data ? data?.length : 0}
                category={formData.category}
                categoryOptions={categoryOptions}
                start={start}
                setStart={setStart}
                reStart={reStart}
                setReStart={setReStart}
              />
            )} */}
      </div>
      {playing && data && index <= data.length && (
        <div className="question-number">
          {index} sur {data?.length} questions
        </div>
      )}
    </div>
  );
};

export default Quiz;
