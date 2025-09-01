import type { Question } from "./Question";

export interface Card {
  cardNumber: number;
  questions: Question[];
}
