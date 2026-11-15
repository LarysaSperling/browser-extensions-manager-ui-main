import './EmptyState.css';

// role="status" — "жива область": скрінрідер зачитає текст, коли він з'явиться,
// і людина без зору дізнається, що список став порожнім.
// action — необов'язковий елемент під текстом (наприклад, кнопка Reset).
function EmptyState({ message, action }) {
  return (
    <div className="empty-state">
      <p role="status">{message}</p>
      {/* && — умовний рендер: якщо action немає (null), нічого не малюємо */}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
