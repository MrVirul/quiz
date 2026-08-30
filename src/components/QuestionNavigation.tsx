import { isQuestionAnswered } from '../utils/quizHelpers';
import type { UserAnswers } from '../types/quiz';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentIndex: number;
  questionIds: number[];
  userAnswers: UserAnswers;
  onNavigate: (index: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentIndex,
  questionIds,
  userAnswers,
  onNavigate,
}: QuestionNavigationProps) {
  return (
    <nav
      className="rounded-lg border border-gray-200 bg-white p-4 lg:sticky lg:top-4"
      aria-label="Question navigation"
    >
      <p className="mb-3 text-sm font-medium text-charcoal">Questions</p>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionId = questionIds[index];
          const isCurrent = index === currentIndex;
          const isAnswered = isQuestionAnswered(userAnswers, questionId);

          let buttonClass =
            'flex h-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ';

          if (isCurrent) {
            buttonClass += 'border-accent bg-accent text-white';
          } else if (isAnswered) {
            buttonClass += 'border-accent/40 bg-accent/10 text-charcoal';
          } else {
            buttonClass += 'border-gray-200 bg-white text-charcoal hover:border-gray-300';
          }

          return (
            <button
              key={questionId}
              type="button"
              onClick={() => onNavigate(index)}
              className={buttonClass}
              aria-label={`Go to question ${index + 1}${isAnswered ? ', answered' : ', unanswered'}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
