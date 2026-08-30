export interface QuizAnswer {
  option: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  id: number;
  lecture: string;
  question: string;
  answers: QuizAnswer[];
  explanation?: string;
}

/** Maps question id to selected answer indexes */
export type UserAnswers = Record<number, number[]>;

export type QuizPhase = 'welcome' | 'quiz' | 'results' | 'review';

export interface QuestionResult {
  question: QuizQuestion;
  userSelectedIndexes: number[];
  correctIndexes: number[];
  isCorrect: boolean;
  isAnswered: boolean;
}

export interface QuizScore {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  percentage: number;
  questionResults: QuestionResult[];
  lecturePerformance: LecturePerformance[];
}

export interface LecturePerformance {
  lecture: string;
  correct: number;
  total: number;
}
