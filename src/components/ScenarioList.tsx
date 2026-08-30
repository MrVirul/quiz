interface ScenarioListProps {
  scenarios: string[];
}

export function ScenarioList({ scenarios }: ScenarioListProps) {
  if (scenarios.length === 0) return null;

  return (
    <div className="mb-6 space-y-3">
      {scenarios.map((scenario, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          <p className="mb-1 text-sm font-semibold text-charcoal">
            Scenario {index + 1}
          </p>
          <p className="text-sm leading-relaxed text-charcoal">{scenario}</p>
        </div>
      ))}
    </div>
  );
}