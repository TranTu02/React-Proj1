import SetRem from "../Contexts/SetRem.jsx";
import Header from "../Components/Header/Header.jsx";
import NavBar from "../Components/Navbar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import Banner from "../Components/Banner/Banner.jsx";
import HotSale from "../Components/HotSale/HotSale.jsx";
import CategoryHome from "../Components/CategoryHome/CategoryHome.jsx";
import Brand from "../Components/Brand/Brand.jsx";

function MainPage() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div>
      <SetRem />
      <Header />
      <NavBar />
      <Banner />
      <HotSale DiscountID={10} />
      {/* <CategoryHome CategoryID={1} />
      <CategoryHome CategoryID={2} />
      <CategoryHome CategoryID={3} /> */}
      <Brand />
      <Footer />
    </div>
  );
}

export default MainPage;
