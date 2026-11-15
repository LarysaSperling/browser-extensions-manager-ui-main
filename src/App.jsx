import Header from './components/Header.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExtensionCard from './components/ExtensionCard.jsx';
import extensionsData from './data/data.json';

function App() {
  // Крок 2: показуємо лише одну картку (перше розширення), щоб налаштувати її вигляд.
  // На кроці 3 тут з'явиться .map() по всьому масиву.
  const firstExtension = extensionsData[0];

  return (
    <div className="container">
      <Header />

      <main className="main">
        <section aria-labelledby="extensions-title">
          <FilterBar activeFilter="all" />

          <div className="extensions-list">
            <ExtensionCard
              logo={firstExtension.logo}
              name={firstExtension.name}
              description={firstExtension.description}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
