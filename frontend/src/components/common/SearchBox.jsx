export default function SearchBox({ value, onChange, label = 'Search' }) {
  return (
    <label className="form-label">
      {label}
      <input
        className="form-control"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
