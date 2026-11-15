import extensionsData from './data/data.json';

// Тимчасова перевірка кроку 1: шрифт, кольори, фон і те, що JSON імпортується.
// На наступних кроках цей вміст замінять справжні компоненти.
function App() {
  return (
    <main className="container">
      <h1>Extensions List</h1>
      <p>Завантажено розширень: {extensionsData.length}</p>
      <p style={{ fontWeight: 400 }}>Regular 400</p>
      <p style={{ fontWeight: 500 }}>Medium 500</p>
      <p style={{ fontWeight: 700 }}>Bold 700</p>
    </main>
  );
}

export default App;
