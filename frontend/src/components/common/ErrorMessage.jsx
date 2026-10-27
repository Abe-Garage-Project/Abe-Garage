export default function ErrorMessage({ message }) {
  return message ? (
    <p className="alert alert-danger" role="alert">
      {message}
    </p>
  ) : null;
}
