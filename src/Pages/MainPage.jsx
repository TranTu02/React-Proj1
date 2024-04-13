import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Banner from '../Components/Banner/Banner.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import HotSale from '../Components/HotSale/HotSale.jsx';
import CategoryHome from '../Components/CategoryHome/CategoryHome.jsx';
import Brand from '../Components/Brand/Brand.jsx';

function MainPage() {
  return (
    <div>
      <Header/>
      <NavBar/>
      <Banner/>
      <HotSale DiscountID={10}/>
      <CategoryHome CategoryID={'C1'}/>
      <CategoryHome CategoryID={'C3'}/>
      <CategoryHome CategoryID={'C5'}/>
      <Brand/>
      <Footer/>        
    </div>
  );
}

export default MainPage;