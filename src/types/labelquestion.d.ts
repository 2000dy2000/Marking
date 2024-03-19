export interface Question {
  id: number;
  userid: number;
  question: string;
  answer: boolean;
  feedback: string;
  selectedOptions: string;
  time: string;
}
