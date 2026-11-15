import { useState } from 'react';
import Header from './components/Header.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExtensionList from './components/ExtensionList.jsx';
import extensionsData from './data/data.json';

// Чиста функція поза компонентом: не залежить від стану React,
// тому її легко прочитати й протестувати окремо.
function matchesFilter(extension, filter) {
  if (filter === 'active') return extension.isActive;
  if (filter === 'inactive') return !extension.isActive;
  return true; // 'all'
}

const EMPTY_MESSAGES = {
  all: 'No extensions installed.',
  active: 'No active extensions.',
  inactive: 'No inactive extensions.',
};

function App() {
  // Стан: React "пам'ятає" значення між рендерами.
  const [extensions, setExtensions] = useState(extensionsData);
  const [filter, setFilter] = useState('all');

  // Похідні дані: НЕ окремий стан, а обчислення з двох наявних станів.
  // Перераховується при кожному рендері, тому завжди актуальне:
  // вимкнули тумблер на вкладці "Active" — картка зникла одразу.
  const visibleExtensions = extensions.filter((ext) => matchesFilter(ext, filter));

  function handleToggle(name) {
    // Не змінюємо старий масив (ніякого ext.isActive = ...), а створюємо НОВИЙ:
    // React порівнює посилання — новий масив = "дані змінились, треба перемалювати".
    setExtensions((prevExtensions) =>
      prevExtensions.map((ext) =>
        ext.name === name ? { ...ext, isActive: !ext.isActive } : ext,
      ),
    );
  }

  return (
    <div className="container">
      <Header />

      <main className="main">
        <section aria-labelledby="extensions-title">
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />

          <ExtensionList
            extensions={visibleExtensions}
            emptyMessage={EMPTY_MESSAGES[filter]}
            onToggle={handleToggle}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
