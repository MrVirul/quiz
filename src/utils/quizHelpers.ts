import type { QuizAnswer, QuizQuestion } from '../types/quiz';

export function getCorrectAnswerIndexes(answers: QuizAnswer[]): number[] {
  return answers
    .map((answer, index) => (answer.is_correct ? index : -1))
    .filter((index) => index !== -1);
}

export function isMultipleAnswerQuestion(question: QuizQuestion): boolean {
  return getCorrectAnswerIndexes(question.answers).length > 1;
}

export function getQuestionTypeLabel(question: QuizQuestion): string {
  return isMultipleAnswerQuestion(question)
    ? '[Select ALL that apply]'
    : '[Select ONE]';
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function isQuestionAnswered(
  userAnswers: Record<number, number[]>,
  questionId: number
): boolean {
  const selected = userAnswers[questionId];
  return Array.isArray(selected) && selected.length > 0;
}

export function getAnswerLabels(
  answers: QuizAnswer[],
  indexes: number[]
): string {
  if (indexes.length === 0) return 'Not Answered';
  return indexes.map((i) => answers[i]?.option ?? '').join(', ');
}

export function validateQuestions(questions: unknown): QuizQuestion[] {
  if (!Array.isArray(questions)) {
    throw new Error('Questions data must be an array');
  }

  return questions.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Question at index ${index} is invalid`);
    }

    const q = item as Record<string, unknown>;

    if (typeof q.id !== 'number') {
      throw new Error(`Question at index ${index} is missing a valid id`);
    }
    if (typeof q.lecture !== 'string' || !q.lecture.trim()) {
      throw new Error(`Question ${q.id} is missing a valid lecture`);
    }
    if (typeof q.question !== 'string' || !q.question.trim()) {
      throw new Error(`Question ${q.id} is missing question text`);
    }
    if (!Array.isArray(q.answers) || q.answers.length === 0) {
      throw new Error(`Question ${q.id} must have at least one answer`);
    }

    const answers: QuizAnswer[] = q.answers.map((a, aIndex) => {
      if (!a || typeof a !== 'object') {
        throw new Error(`Question ${q.id} answer at index ${aIndex} is invalid`);
      }
      const answer = a as Record<string, unknown>;
      if (typeof answer.option !== 'string') {
        throw new Error(`Question ${q.id} answer at index ${aIndex} is missing option text`);
      }
      if (typeof answer.is_correct !== 'boolean') {
        throw new Error(
          `Question ${q.id} answer at index ${aIndex} must use "is_correct" boolean property`
        );
      }
      return {
        option: answer.option,
        is_correct: answer.is_correct,
      };
    });

    const correctCount = answers.filter((a) => a.is_correct).length;
    if (correctCount === 0) {
      throw new Error(`Question ${q.id} must have at least one correct answer`);
    }

    return {
      id: q.id,
      lecture: q.lecture,
      question: q.question,
      answers,
      explanation: typeof q.explanation === 'string' ? q.explanation : undefined,
    };
  });
}

export const QUIZ_DURATION_SECONDS = 60 * 60;
