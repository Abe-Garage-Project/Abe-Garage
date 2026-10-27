const names = {
  1: 'Awaiting approval',
  2: 'Approved',
  3: 'In progress',
  4: 'Completed',
  5: 'Declined',
};
export default function StatusBadge({ status }) {
  return <span className="badge text-bg-secondary">{names[status] || 'Unknown'}</span>;
}
