interface SubmitConfirmationProps {
  unansweredCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SubmitConfirmation({
  unansweredCount,
  onCancel,
  onConfirm,
}: SubmitConfirmationProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-dialog-title"
    >
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 id="submit-dialog-title" className="mb-4 text-lg font-semibold text-charcoal">
          Submit Quiz?
        </h2>
        <p className="mb-6 text-charcoal">
          {unansweredCount > 0 ? (
            <>
              You still have {unansweredCount} unanswered question
              {unansweredCount !== 1 ? 's' : ''}.
              <br />
              <br />
              Are you sure you want to submit the quiz?
            </>
          ) : (
            'Are you sure you want to submit the quiz?'
          )}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 font-medium text-charcoal transition-colors hover:border-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-accent px-4 py-2 font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
