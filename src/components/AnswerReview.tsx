import { QUIZ_TITLE, SUBJECT_NAME } from '../constants/quiz';
import type { QuizScore } from '../types/quiz';
import { getAnswerLabels, getQuestionScenarios } from '../utils/quizHelpers';
import { ScenarioList } from './ScenarioList';

interface AnswerReviewProps {
  score: QuizScore;
  onBack: () => void;
  onRetake: () => void;
}

export function AnswerReview({ score, onBack, onRetake }: AnswerReviewProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">{SUBJECT_NAME}</p>
          <h1 className="text-2xl font-semibold text-charcoal">{QUIZ_TITLE}</h1>
          <p className="text-charcoal">Answer Review</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-gray-300"
          >
            Back to Results
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-gray-300"
          >
            Try Again
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {score.questionResults.map((result, index) => {
          const { question, userSelectedIndexes, correctIndexes, isCorrect, isAnswered } =
            result;

          const statusLabel = !isAnswered
            ? 'Unanswered'
            : isCorrect
              ? 'Correct'
              : 'Incorrect';

          const userAnswerLabels = getAnswerLabels(
            question.answers,
            userSelectedIndexes
          );
          const correctAnswerLabels = getAnswerLabels(
            question.answers,
            correctIndexes
          );

          return (
            <article
              key={question.id}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-semibold text-charcoal">
                  Question {index + 1}
                </h2>
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-medium ${
                    !isAnswered
                      ? 'border-gray-300 text-charcoal/70'
                      : isCorrect
                        ? 'border-accent/40 bg-accent/10 text-charcoal'
                        : 'border-charcoal/20 bg-charcoal/5 text-charcoal'
                  }`}
                >
                  [{statusLabel}]
                </span>
              </div>

              <p className="mb-1 text-sm font-medium text-accent">{question.lecture}</p>
              <p className="mb-4 text-charcoal">{question.question}</p>

              <ScenarioList scenarios={getQuestionScenarios(question)} />

              <div className="space-y-2 text-sm">
                <div className="text-charcoal">
                  <span className="font-medium">Your Answer:</span>
                  {userAnswerLabels.length === 0 ? (
                    <span className="block">Not Answered</span>
                  ) : (
                    userAnswerLabels.map((label, i) => (
                      <span key={`your-${i}`} className="block">
                        {label}
                      </span>
                    ))
                  )}
                </div>
                <div className="text-charcoal">
                  <span className="font-medium">Correct Answer:</span>
                  {correctAnswerLabels.map((label, i) => (
                    <span key={`correct-${i}`} className="block">
                      {label}
                    </span>
                  ))}
                </div>
                {question.explanation && (
                  <p className="border-t border-gray-100 pt-3 text-charcoal">
                    <span className="font-medium">Explanation:</span>
                    <br />
                    {question.explanation}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
