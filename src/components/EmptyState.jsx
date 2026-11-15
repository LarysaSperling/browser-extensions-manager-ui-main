import './EmptyState.css';

// role="status" — "жива область": скрінрідер зачитає текст, коли він з'явиться,
// і людина без зору дізнається, що список став порожнім.
function EmptyState({ message }) {
  return (
    <p className="empty-state" role="status">
      {message}
    </p>
  );
}

export default EmptyState;
