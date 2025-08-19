import './Quiz.css'
import axios from "axios";
import Card from "./Card";
import Button from "./ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import type { Question } from "../../Interfaces/Question";

const Quiz = () => {
  const { data, isLoading, error } = useQuery<Question[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await axios.get<Question[]>(
        import.meta.env.VITE_API_URL + "/questions/random?count=1&theme=QSER"
      );
      return response.data;
    },
  });

  const questionCards = data?.map((question) => (
    <Card key={question.id} card={question} />
  ));

  return (
    <div className="container flex flex-col gap-5 justify-center items-center">
      <h1>Quiz conduite</h1>
      <hr />
      <div>
        {isLoading && <p>Loading questions...</p>}
        {error && <p className="text-red-500">Error loading questions</p>}
        {data && questionCards}
      </div>
        <Button />
        <div className="question-number">1 of {data?.length} questions</div>
    </div>
  );
};

export default Quiz;
