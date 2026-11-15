import Header from './components/Header.jsx';
import FilterBar from './components/FilterBar.jsx';
import ExtensionCard from './components/ExtensionCard.jsx';
import extensionsData from './data/data.json';

function App() {
  return (
    <div className="container">
      <Header />

      <main className="main">
        <section aria-labelledby="extensions-title">
          <FilterBar activeFilter="all" />

          <ul className="extensions-list" role="list">
            {extensionsData.map((extension) => (
              // key — унікальний "паспорт" елемента списку для React.
              // id в даних немає, але назви унікальні, тому беремо name.
              <li key={extension.name}>
                <ExtensionCard
                  logo={extension.logo}
                  name={extension.name}
                  description={extension.description}
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
