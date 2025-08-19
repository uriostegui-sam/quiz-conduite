export interface Question {
  id: number;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
  media_url?: string;
}
