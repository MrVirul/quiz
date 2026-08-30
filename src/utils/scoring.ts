import type {
  LecturePerformance,
  QuestionResult,
  QuizQuestion,
  QuizScore,
  UserAnswers,
} from '../types/quiz';
import { getCorrectAnswerIndexes } from './quizHelpers';

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, i) => val === sortedB[i]);
}

export function isAnswerCorrect(
  question: QuizQuestion,
  selectedIndexes: number[]
): boolean {
  const correctIndexes = getCorrectAnswerIndexes(question.answers);
  return arraysEqual(selectedIndexes, correctIndexes);
}

export function calculateScore(
  questions: QuizQuestion[],
  userAnswers: UserAnswers
): QuizScore {
  const questionResults: QuestionResult[] = questions.map((question) => {
    const userSelectedIndexes = userAnswers[question.id] ?? [];
    const correctIndexes = getCorrectAnswerIndexes(question.answers);
    const isAnswered = userSelectedIndexes.length > 0;
    const isCorrect = isAnswered && isAnswerCorrect(question, userSelectedIndexes);

    return {
      question,
      userSelectedIndexes,
      correctIndexes,
      isCorrect,
      isAnswered,
    };
  });

  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const unansweredCount = questionResults.filter((r) => !r.isAnswered).length;
  const incorrectCount = questionResults.length - correctCount - unansweredCount;
  const totalQuestions = questions.length;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const lectureMap = new Map<string, { correct: number; total: number }>();

  for (const result of questionResults) {
    const lecture = result.question.lecture;
    const existing = lectureMap.get(lecture) ?? { correct: 0, total: 0 };
    existing.total += 1;
    if (result.isCorrect) existing.correct += 1;
    lectureMap.set(lecture, existing);
  }

  const lecturePerformance: LecturePerformance[] = Array.from(
    lectureMap.entries()
  ).map(([lecture, stats]) => ({
    lecture,
    correct: stats.correct,
    total: stats.total,
  }));

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    percentage,
    questionResults,
    lecturePerformance,
  };
}
