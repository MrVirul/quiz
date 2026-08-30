import type { QuizQuestion } from '../types/quiz';
import {
  getQuestionScenarios,
  getQuestionTypeLabel,
  isMultipleAnswerQuestion,
} from '../utils/quizHelpers';
import { ScenarioList } from './ScenarioList';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedIndexes: number[];
  onSelect: (indexes: number[]) => void;
}

export function QuestionCard({
  question,
  selectedIndexes,
  onSelect,
}: QuestionCardProps) {
  const isMultiple = isMultipleAnswerQuestion(question);

  const handleSingleSelect = (index: number) => {
    onSelect([index]);
  };

  const handleMultipleToggle = (index: number) => {
    if (selectedIndexes.includes(index)) {
      onSelect(selectedIndexes.filter((i) => i !== index));
    } else {
      onSelect([...selectedIndexes, index]);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <p className="mb-2 text-sm font-medium text-accent">
        {getQuestionTypeLabel(question)}
      </p>
      <h2 className="mb-6 text-lg leading-relaxed text-charcoal">{question.question}</h2>

      <ScenarioList scenarios={getQuestionScenarios(question)} />

      <div className="space-y-3">
        {question.answers.map((answer, index) => {
          const isSelected = selectedIndexes.includes(index);
          const inputId = `q${question.id}-a${index}`;

          return (
            <label
              key={inputId}
              htmlFor={inputId}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${
                isSelected
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                id={inputId}
                type={isMultiple ? 'checkbox' : 'radio'}
                name={`question-${question.id}`}
                checked={isSelected}
                onChange={() =>
                  isMultiple
                    ? handleMultipleToggle(index)
                    : handleSingleSelect(index)
                }
                className="mt-1 h-4 w-4 shrink-0 accent-accent"
              />
              <span className="text-charcoal">{answer.option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
