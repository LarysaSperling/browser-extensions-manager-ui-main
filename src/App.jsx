import { useEffect, useRef, useState } from 'react';
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

  // useRef — "коробка" для посилання на DOM-елемент (тут — заголовок h1).
  // На відміну від стану, зміна ref НЕ викликає перемальовування.
  const titleRef = useRef(null);

  // Початкову тему вже визначив скрипт в index.html (за prefers-color-scheme).
  // Функція в useState — "ліниве" початкове значення: виконується лише при першому рендері.
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  // useEffect — для дій ПОЗА React (тут: атрибут на <html>, який React не контролює).
  // Масив [theme] означає: запускати ефект лише тоді, коли змінилась тема.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function handleToggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

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

  function handleRemove(name) {
    // filter повертає НОВИЙ масив без потрібного елемента — знову незмінне оновлення.
    setExtensions((prevExtensions) => prevExtensions.filter((ext) => ext.name !== name));

    // Кнопка, на якій був фокус, зникне разом із карткою, і фокус "впаде" на <body>
    // (користувач клавіатури опиниться на початку сторінки). Переносимо його на заголовок списку.
    titleRef.current?.focus();
  }

  return (
    <div className="container">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      <main className="main">
        <section aria-labelledby="extensions-title">
          <FilterBar activeFilter={filter} onFilterChange={setFilter} titleRef={titleRef} />

          <ExtensionList
            extensions={visibleExtensions}
            emptyMessage={EMPTY_MESSAGES[filter]}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
