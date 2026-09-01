import { QUIZ_TITLE, SUBJECT_NAME } from '../constants/quiz';
import { formatTime } from '../utils/quizHelpers';

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  description: string;
  timeRemaining: number;
  answeredCount: number;
}

export function QuizHeader({
  currentIndex,
  totalQuestions,
  description,
  timeRemaining,
  answeredCount,
}: QuizHeaderProps) {
  return (
    <header className="mb-6 space-y-3 border-b border-gray-200 pb-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">{SUBJECT_NAME}</p>
          <h1 className="text-xl font-semibold text-charcoal">{QUIZ_TITLE}</h1>
        </div>
        <p className="text-sm font-medium text-charcoal sm:text-right">
          Time Remaining:{' '}
          <span className={timeRemaining <= 300 ? 'text-accent' : ''}>
            {formatTime(timeRemaining)}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-charcoal">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
        <p className="text-sm text-charcoal/70">Answered: {answeredCount} / {totalQuestions}</p>
      </div>

      <p className="text-sm font-medium text-accent">{description}</p>
    </header>
  );
}
