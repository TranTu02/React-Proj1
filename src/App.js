import Header from './Components/Header/Header.jsx';
import NavBar from './Components/Navbar/NavBar.jsx';
import Banner from './Components/Banner/Banner.jsx';
import Footer from './Components/Footer/Footer.jsx';
import HotSale from './Components/HotSale/HotSale.jsx'
import SetRem from './Contexts/SetRem.jsx';
function App() {
  return (
    <div>
      <SetRem/>
      <Header/>
      <NavBar/>
      <Banner/>
      <HotSale/>
      <Footer/>        
    </div>
  );
}

export default App;
