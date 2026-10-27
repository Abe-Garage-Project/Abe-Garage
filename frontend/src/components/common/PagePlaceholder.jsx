export default function PagePlaceholder({ title, module, task }) {
  return (
    <section className="page-placeholder">
      <p className="eyebrow">Abe Garage / {module}</p>
      <h1>{title}</h1>
      <p>This page is ready for your team to implement.</p>
      <p className="text-secondary">Backend reference: {task}</p>
    </section>
  );
}
