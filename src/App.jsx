import { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExtensionList from './components/ExtensionList.jsx';
import ResetButton from './components/ResetButton.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import extensionsData from './data/data.json';

// Префікс у ключах: на localhost:5173 живуть й інші ваші проєкти,
// і просте 'theme' могло б перетнутися з чужим ключем.
const EXTENSIONS_STORAGE_KEY = 'extensions-manager:extensions';
const THEME_STORAGE_KEY = 'extensions-manager:theme'; // такий самий ключ — у скрипті index.html

// Чи обрала людина тему вручну (кнопкою)? Повертає 'light' / 'dark' або null.
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

// Чиста функція поза компонентом: не залежить від стану React,
// тому її легко прочитати й протестувати окремо.
function matchesFilter(extension, filter) {
  if (filter === 'active') return extension.isActive;
  if (filter === 'inactive') return !extension.isActive;
  return true; // 'all'
}

// Чи збігається список з початковим data.json?
// Порівнюємо лише те, що людина може змінити: склад (назви) і стани тумблерів.
// Порядок не змінюється (ми лише видаляємо), тому порівнюємо за індексом.
function isSameAsInitial(extensions) {
  return (
    extensions.length === extensionsData.length &&
    extensions.every(
      (ext, index) =>
        ext.name === extensionsData[index].name &&
        ext.isActive === extensionsData[index].isActive,
    )
  );
}

const EMPTY_MESSAGES = {
  all: 'No extensions installed.', // буває лише тоді, коли видалено все
  active: 'No active extensions.',
  inactive: 'No inactive extensions.',
};

function App() {
  // Стан: React "пам'ятає" значення між рендерами.
  // extensions — через власний хук: при першому відкритті дані з JSON,
  // далі — збережений масив (з вимкненими тумблерами й без видалених карток).
  const [extensions, setExtensions] = useLocalStorage(EXTENSIONS_STORAGE_KEY, extensionsData);
  // Фільтр навмисно НЕ зберігаємо: після перезавантаження логічно бачити всі розширення.
  const [filter, setFilter] = useState('all');

  // useRef — "коробка" для посилання на DOM-елемент (тут — заголовок h1).
  // На відміну від стану, зміна ref НЕ викликає перемальовування.
  const titleRef = useRef(null);

  // Початкову тему вже визначив скрипт в index.html (збережений вибір або системна тема).
  // Функція в useState — "ліниве" початкове значення: виконується лише при першому рендері.
  // Тут НЕ useLocalStorage: хук записав би тему одразу при першому відкритті,
  // і сайт перестав би реагувати на системну тему. Зберігаємо лише СВІДОМИЙ вибір (клік).
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  // useEffect — для дій ПОЗА React (тут: атрибут на <html>, який React не контролює).
  // Масив [theme] означає: запускати ефект лише тоді, коли змінилась тема.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Живе стеження за темою системи: людина змінила тему в Windows/macOS —
  // сайт перемикається одразу, без перезавантаження. Але ЛИШЕ якщо вона
  // не обрала тему кнопкою: свідомий вибір важливіший за системний.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleSystemThemeChange(event) {
      // Перевіряємо в момент ПОДІЇ, а не при підписці:
      // людина могла натиснути кнопку вже після того, як ефект запустився.
      if (getSavedTheme() !== null) return;
      setTheme(event.matches ? 'dark' : 'light');
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Функція очищення: React викличе її, коли компонент зникне зі сторінки.
    // Без неї слухач залишився б "висіти" в пам'яті (витік пам'яті).
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []); // [] — підписуємось один раз, при першому рендері

  function handleToggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      // Звичайний рядок, без JSON: так його простіше прочитати скрипту в index.html
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // сховище недоступне — тема однаково перемкнеться, просто не збережеться
    }
  }

  // Похідні дані: НЕ окремий стан, а обчислення з двох наявних станів.
  // Перераховується при кожному рендері, тому завжди актуальне:
  // вимкнули тумблер на вкладці "Active" — картка зникла одразу.
  const visibleExtensions = extensions.filter((ext) => matchesFilter(ext, filter));

  // Ще два похідні значення — так само обчислюються, а не зберігаються в стані.
  const isModified = !isSameAsInitial(extensions);
  const isAllRemoved = extensions.length === 0;

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

  function handleReset() {
    // Повертаємо початковий масив. useLocalStorage сам перезапише збережені дані.
    // Тему не чіпаємо — це окреме налаштування.
    setExtensions(extensionsData);
    // Фільтр теж скидаємо на "All", щоб людина одразу побачила всі 12 розширень.
    setFilter('all');
    // Кнопка Reset зникне (список знову "початковий"), тож переносимо фокус, як після Remove.
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
            // Reset у порожньому стані — лише коли видалено ВСЕ (а не коли фільтр нічого не знайшов)
            emptyAction={isAllRemoved ? <ResetButton onReset={handleReset} /> : null}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />

          {/* Reset під списком: лише якщо є зміни І список не порожній
              (коли видалено все, кнопка вже є всередині порожнього стану — без дублів) */}
          {isModified && !isAllRemoved && (
            <div className="list-actions">
              <ResetButton onReset={handleReset} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
