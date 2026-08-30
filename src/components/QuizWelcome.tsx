import { QUIZ_TITLE, SUBJECT_NAME } from '../constants/quiz';

interface QuizWelcomeProps {
  questionCount: number;
  durationMinutes: number;
  onStart: () => void;
}

export function QuizWelcome({
  questionCount,
  durationMinutes,
  onStart,
}: QuizWelcomeProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-12">
      <p className="mb-2 text-sm font-medium text-accent">{SUBJECT_NAME}</p>
      <h1 className="mb-6 text-3xl font-semibold text-charcoal">{QUIZ_TITLE}</h1>

      <div className="mb-8 space-y-1 text-charcoal">
        <p className="text-lg">{questionCount} Questions</p>
        <p className="text-lg">Duration: {durationMinutes} Hour{durationMinutes !== 1 ? 's' : ''}</p>
      </div>

      <p className="mb-4 text-charcoal">This is a practice quiz for self-study.</p>

      <ul className="mb-8 list-inside list-disc space-y-2 text-charcoal">
        <li>No negative marking</li>
        <li>Some questions require one answer</li>
        <li>Some questions require multiple answers</li>
        <li>
          For multiple-answer questions, you must select all correct answers and no
          incorrect answers to receive the mark.
        </li>
      </ul>

      <p className="mb-8 text-charcoal">
        Try to complete all questions before reviewing your answers.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-dark sm:w-auto"
      >
        Start Quiz
      </button>
    </div>
  );
}
