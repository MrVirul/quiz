import type { QuizQuestion } from '../types/quiz';
import { validateQuestions } from '../utils/quizHelpers';

export interface QuizSet {
  id: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

interface DataEntry {
  file: string;
  description: string;
  questions: QuizQuestion[];
}

const jsonFiles = import.meta.glob<unknown>('./questions*.json', {
  eager: true,
});

function parseQuizNumber(path: string): number {
  const match = path.match(/questions(\d+)\.json$/);
  return match ? Number(match[1]) : 0;
}

function unwrapJson(value: unknown): unknown {
  if (
    value &&
    typeof value === 'object' &&
    'default' in value &&
    typeof (value as { default: unknown }).default === 'object'
  ) {
    return (value as { default: unknown }).default;
  }
  return value;
}

function parseQuizData(value: unknown): { description: string; questions: QuizQuestion[] } {
  const data = unwrapJson(value);
  if (!data || typeof data !== 'object') {
    throw new Error('Quiz data must be an object with a description and questions array');
  }
  const record = data as Record<string, unknown>;
  if (typeof record.description !== 'string' || !record.description.trim()) {
    throw new Error('Quiz data is missing a valid description');
  }
  return {
    description: record.description,
    questions: validateQuestions(record.questions),
  };
}

function buildDataEntries(): DataEntry[] {
  return Object.entries(jsonFiles)
    .map(([path, data]) => {
      const parsed = parseQuizData(data);
      return {
        file: path,
        description: parsed.description,
        questions: parsed.questions,
      };
    })
    .sort((a, b) => parseQuizNumber(a.file) - parseQuizNumber(b.file));
}

export function getQuizSets(): QuizSet[] {
  return buildDataEntries().map((entry, index) => {
    const quizNumber = index + 1;
    return {
      id: quizNumber,
      title: `Quiz ${quizNumber}`,
      description: entry.description,
      questions: entry.questions,
    };
  });
}