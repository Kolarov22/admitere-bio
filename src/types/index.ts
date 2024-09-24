
export interface Course {
    id: number,
    title: string, 
    description: string,
    price: number,
    image?: string,
    createdAt?: string,
    users: [
      {
        userId: string,
        courseId: number
      }
    ]
}

export interface Quiz {
  id: number;
  courseId: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  quizId: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  explanation: string;
}