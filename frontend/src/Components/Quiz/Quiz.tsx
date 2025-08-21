import "./Quiz.css";
import axios from "axios";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import type { Question } from "../../Interfaces/Question";
import { useState } from "react";
import ResultQuestionsComponent from "../Result/ResultQuestionsComponent";

const Quiz = () => {
  const { data, isLoading, error } = useQuery<Question[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await axios.get<Question[]>(
        import.meta.env.VITE_API_URL + "/questions/random?count=3&theme=QSER"
      );
      return response.data;
    },
  });

  let [index, setIndex] = useState(1);
  let [score, setScore] = useState(0);

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

  return (
    <div className="container flex flex-col gap-5 justify-center items-center">
      <h1>Quiz conduite</h1>
      <hr />
      <div>
        {isLoading && <p>Loading questions...</p>}
        {error && <p className="text-red-500">Error loading questions</p>}
        {cards ? (
          cards
        ) : (
          <ResultQuestionsComponent
            score={score}
            totalQuestions={data ? data?.length : 0}
          />
        )}
      </div>
      {data && index <= data.length && (
        <div className="question-number">
          {index} of {data?.length} questions
        </div>
      )}
    </div>
  );
};

export default Quiz;
