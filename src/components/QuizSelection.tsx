import { QUIZ_TITLE, SUBJECT_NAME } from '../constants/quiz';
import type { QuizSet } from '../data';

interface QuizSelectionProps {
  quizSets: QuizSet[];
  onSelect: (quizId: number) => void;
}

export function QuizSelection({ quizSets, onSelect }: QuizSelectionProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="mb-2 text-sm font-medium text-accent">{QUIZ_TITLE}</p>
      <h1 className="mb-2 text-3xl font-semibold text-charcoal">{SUBJECT_NAME}</h1>
      <p className="mb-8 text-charcoal">
        Choose a quiz to begin your practice session.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {quizSets.map((quiz) => (
          <button
            key={quiz.id}
            type="button"
            onClick={() => onSelect(quiz.id)}
            className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 text-left transition-colors hover:border-accent hover:shadow-sm"
          >
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-lg font-semibold text-accent">
              {quiz.id}
            </span>
            <h2 className="mb-1 text-lg font-semibold text-charcoal">
              {quiz.title}
            </h2>
            <p className="mb-4 text-sm text-charcoal/70">{quiz.description}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-sm text-charcoal/70">
                {quiz.questions.length} Questions
              </span>
              <span className="text-sm font-medium text-accent">Start</span>
            </div>
          </button>
        ))}
      </div>

      <ul className="mt-10 list-inside list-disc space-y-2 text-charcoal">
        <li>No negative marking</li>
        <li>Some questions require one answer</li>
        <li>Some questions require multiple answers</li>
      </ul>
    </div>
  );
}
