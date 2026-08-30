import { QUIZ_TITLE, SUBJECT_NAME } from '../constants/quiz';
import type { QuizScore } from '../types/quiz';

interface QuizResultsProps {
  score: QuizScore;
  onReview: () => void;
  onRetake: () => void;
}

export function QuizResults({ score, onReview, onRetake }: QuizResultsProps) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <p className="mb-2 text-sm font-medium text-accent">{SUBJECT_NAME}</p>
      <h1 className="mb-2 text-3xl font-semibold text-charcoal">{QUIZ_TITLE}</h1>
      <p className="mb-8 text-lg text-charcoal">Quiz Completed</p>

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <p className="mb-2 text-2xl font-semibold text-charcoal">
          Score: {score.correctCount} / {score.totalQuestions}
        </p>
        <p className="text-lg text-charcoal">Percentage: {score.percentage}%</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-semibold text-charcoal">{score.correctCount}</p>
          <p className="text-sm text-charcoal/70">Correct Answers</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-semibold text-charcoal">{score.incorrectCount}</p>
          <p className="text-sm text-charcoal/70">Incorrect Answers</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-semibold text-charcoal">{score.unansweredCount}</p>
          <p className="text-sm text-charcoal/70">Unanswered Questions</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-charcoal">Lecture Performance</h2>
        <ul className="space-y-2">
          {score.lecturePerformance.map((lecture) => (
            <li key={lecture.lecture} className="flex justify-between text-charcoal">
              <span>{lecture.lecture}</span>
              <span className="font-medium">
                {lecture.correct} / {lecture.total}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onReview}
          className="rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Review Answers
        </button>
        <button
          type="button"
          onClick={onRetake}
          className="rounded-lg border border-gray-200 px-6 py-3 font-medium text-charcoal transition-colors hover:border-gray-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
