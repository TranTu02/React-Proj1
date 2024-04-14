import SetRem from './Contexts/SetRem.jsx';
import Header from './Components/Header/Header.jsx';
import NavBar from './Components/Navbar/NavBar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import MainPage from './Pages/MainPage';
import CategoryPage from './Pages/CategoryPage.jsx';
import DetailPage from './Pages/DetailPage.jsx';
function App() {
  return (
    <div>
      <SetRem/>
      <Header/>
      <NavBar/>
      {/* <DetailPage ProductID={31}/> */}
      <CategoryPage />
      <Footer/>
    </div>
  );
}

export default App;
