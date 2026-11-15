import ExtensionCard from './ExtensionCard.jsx';
import EmptyState from './EmptyState.jsx';
import './ExtensionList.css';

// Відповідає лише за ВІДОБРАЖЕННЯ: отримує вже відфільтрований масив
// і вирішує, що показати — сітку карток чи порожній стан.
function ExtensionList({ extensions, emptyMessage, onToggle }) {
  // Ранній return: якщо показувати нічого, далі код не виконується
  if (extensions.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <ul className="extensions-list" role="list">
      {extensions.map((extension) => (
        // key — унікальний "паспорт" елемента списку для React.
        // id в даних немає, але назви унікальні, тому беремо name.
        <li key={extension.name}>
          <ExtensionCard
            logo={extension.logo}
            name={extension.name}
            description={extension.description}
            isActive={extension.isActive}
            onToggle={() => onToggle(extension.name)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ExtensionList;
