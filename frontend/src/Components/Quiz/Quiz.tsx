import "./Quiz.css";
import axios from "axios";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import type { Question } from "../../Interfaces/Question";
import { useEffect, useState } from "react";
import ResultQuestionsComponent from "../Result/ResultQuestionsComponent";
import Start from "./StartComponent";
import type { Form } from "../../Interfaces/Form";

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

  const urlCategory =
    formData.category === "" ? "" : `&theme=${formData.category}`;

  const { data, isLoading, error } = useQuery<Question[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      setPlaying(true);
      const response = await axios.get<Question[]>(
        import.meta.env.VITE_API_URL +
          `/${formData.type}/random?count=${formData.questions}${urlCategory}`
      );
      return response.data;
    },
    enabled: start,
  });

  const cards = data && data.length > 0 && index <= data.length && (
    <Card
      key={data[index - 1].id}
      card={data[index - 1]}
      index={index}
      setIndex={setIndex}
      score={score}
      setScore={setScore}
    />
  );

    useEffect(() => {
      setIndex(1)
      setScore(0)
      setFormData(startData)
      setStart(false)
      setPlaying(false)
    }, [reStart]);

  return (
    <div className="container flex flex-col gap-5 justify-center items-center">
      <h1>Quiz conduite</h1>
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
        {playing && isLoading && <p>Loading questions...</p>}
        {playing && error && (
          <p className="text-red-500">Error loading questions</p>
        )}
        {playing && cards
          ? cards
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
            )}
      </div>
      {playing && data && index <= data.length && (
        <div className="question-number">
          {index} of {data?.length} questions
        </div>
      )}
    </div>
  );
};

export default Quiz;
