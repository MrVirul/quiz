interface ProgressBarProps {
  answered: number;
  total: number;
}

export function ProgressBar({ answered, total }: ProgressBarProps) {
  const percentage = total > 0 ? (answered / total) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
