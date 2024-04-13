import SetRem from './Contexts/SetRem.jsx';
import MainPage from './Pages/MainPage';
import CategoryPage from './Pages/CategoryPage.jsx';

function App() {
  return (
    <div>
      <SetRem/>
      <CategoryPage CategoryID={'C1'}/>
    </div>
  );
}

export default App;
