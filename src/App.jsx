import { useState } from 'react';
import Header from './components/Header.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExtensionCard from './components/ExtensionCard.jsx';
import extensionsData from './data/data.json';

function App() {
  // Стан: React "пам'ятає" масив між рендерами.
  // Початкове значення — дані з JSON; далі змінюємо його ТІЛЬКИ через setExtensions.
  const [extensions, setExtensions] = useState(extensionsData);

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
          <FilterBar activeFilter="all" />

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
                  onToggle={() => handleToggle(extension.name)}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
