import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnswerReview } from './components/AnswerReview';
import { Footer } from './components/Footer';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { QuestionNavigation } from './components/QuestionNavigation';
import { QuizHeader } from './components/QuizHeader';
import { QuizResults } from './components/QuizResults';
import { QuizSelection } from './components/QuizSelection';
import { SubmitConfirmation } from './components/SubmitConfirmation';
import { getQuizSets } from './data';
import type { QuizPhase, QuizScore, UserAnswers } from './types/quiz';
import { calculateScore } from './utils/scoring';
import {
  isQuestionAnswered,
  QUIZ_DURATION_SECONDS,
} from './utils/quizHelpers';

function App() {
  const quizSets = useMemo(() => getQuizSets(), []);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const quiz = useMemo(
    () => quizSets.find((set) => set.id === selectedQuizId) ?? null,
    [quizSets, selectedQuizId]
  );

  const questions = quiz?.questions ?? [];
  const questionIds = useMemo(() => questions.map((q) => q.id), [questions]);

  const [phase, setPhase] = useState<QuizPhase>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DURATION_SECONDS);
  const [score, setScore] = useState<QuizScore | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const answeredCount = useMemo(
    () => questionIds.filter((id) => isQuestionAnswered(userAnswers, id)).length,
    [questionIds, userAnswers]
  );

  const unansweredCount = questions.length - answeredCount;

  const submitQuiz = useCallback(() => {
    const result = calculateScore(questions, userAnswers);
    setScore(result);
    setPhase('results');
    setShowSubmitDialog(false);
  }, [questions, userAnswers]);
  useEffect(() => {
    if (phase !== 'quiz') return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 'quiz' && timeRemaining === 0) {
      submitQuiz();
    }
  }, [phase, timeRemaining, submitQuiz]);

  const handleStart = (quizId: number) => {
    setSelectedQuizId(quizId);
    setPhase('quiz');
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeRemaining(QUIZ_DURATION_SECONDS);
    setScore(null);
  };

  const handleRetake = () => {
    setSelectedQuizId(null);
    setPhase('welcome');
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeRemaining(QUIZ_DURATION_SECONDS);
    setScore(null);
    setShowSubmitDialog(false);
  };

  const handleAnswerSelect = (indexes: number[]) => {
    const questionId = questions[currentIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: indexes,
    }));
  };

  const handleSubmitClick = () => {
    if (unansweredCount > 0) {
      setShowSubmitDialog(true);
    } else {
      submitQuiz();
    }
  };

  const currentQuestion = questions[currentIndex];
  const currentSelected = currentQuestion
    ? userAnswers[currentQuestion.id] ?? []
    : [];

  let content: ReactNode;

  if (phase === 'welcome' || !quiz) {
    content = (
      <QuizSelection quizSets={quizSets} onSelect={handleStart} />
    );
  } else if (phase === 'results' && score) {
    content = (
      <QuizResults score={score} onReview={() => setPhase('review')} onRetake={handleRetake} />
    );
  } else if (phase === 'review' && score) {
    content = (
      <AnswerReview
        score={score}
        onBack={() => setPhase('results')}
        onRetake={handleRetake}
      />
    );
  } else {
    content = (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <QuizHeader
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          description={quiz.description}
          timeRemaining={timeRemaining}
          answeredCount={answeredCount}
        />

        <ProgressBar answered={answeredCount} total={questions.length} />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="mb-6">
              <QuestionCard
                question={currentQuestion}
                selectedIndexes={currentSelected}
                onSelect={handleAnswerSelect}
              />
            </div>

            <div className="mb-6 flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="rounded-lg border border-gray-200 px-5 py-2 font-medium text-charcoal transition-colors hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))
                }
                disabled={currentIndex === questions.length - 1}
                className="rounded-lg border border-gray-200 px-5 py-2 font-medium text-charcoal transition-colors hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmitClick}
              className="w-full rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-dark sm:w-auto"
            >
              Submit Quiz
            </button>
          </div>

          <aside className="w-full shrink-0 lg:w-52">
            <QuestionNavigation
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              questionIds={questionIds}
              userAnswers={userAnswers}
              onNavigate={setCurrentIndex}
            />
          </aside>
        </div>

        {showSubmitDialog && (
          <SubmitConfirmation
            unansweredCount={unansweredCount}
            onCancel={() => setShowSubmitDialog(false)}
            onConfirm={submitQuiz}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
}

export default App;
