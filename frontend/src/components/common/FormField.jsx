export default function FormField({ id, label, error, ...inputProps }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className="form-control"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? id + '-error' : undefined}
        {...inputProps}
      />
      {error && (
        <p id={id + '-error'} className="text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
