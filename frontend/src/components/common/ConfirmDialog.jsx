export default function ConfirmDialog({ open, title, children, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <dialog open aria-label={title}>
      <h2>{title}</h2>
      {children}
      <div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </dialog>
  );
}
