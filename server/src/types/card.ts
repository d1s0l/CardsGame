export interface Card {
  id: string;
  userId: string;
  title: string;
  question: string;
  answer: string;
  topic: string;
  tags: string[];
}

export interface CreateCardRequest {
  title: string;
  question: string;
  answer: string;
  topic: string;
  tags: string[];
}