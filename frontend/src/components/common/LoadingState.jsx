export default function LoadingState({ message = 'Loading…' }) {
  return <p role="status">{message}</p>;
}
