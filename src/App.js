import SetRem from './Contexts/SetRem.jsx';
import Header from './Components/Header/Header.jsx';
import NavBar from './Components/Navbar/NavBar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import MainPage from './Pages/MainPage';
import CategoryPage from './Pages/CategoryPage.jsx';
import DetailPage from './Pages/DetailPage.jsx';
import SearchPage from './Pages/SearchPage.jsx';
import CartPage from './Pages/CartPage.jsx';

function App() {
  // // Bắt sự kiện cuộn của trang
  // window.addEventListener('scroll', () => {
  //   // Kiểm tra vị trí cuộn hiện tại của trang
  //   const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  //   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
  //   // Nếu đang cuộn đến đầu trang
  //   if (scrollPosition === 0) {
  //       // Khóa cuộn xuống
  //       window.scrollTo(0, 0);
  //   }
  //   // Nếu đang cuộn đến cuối trang
  //   else if (scrollPosition === maxScroll) {
  //       // Khóa cuộn lên
  //       window.scrollTo(0, maxScroll);
  //   }
  // });

  return (
    <div>
      <SetRem/>
      <Header/>
      <NavBar/>
      {/* <MainPage /> */}
      {/* <CategoryPage /> */}
      {/* <SearchPage/> */}
      {/* <DetailPage ProductID={1}/> */}
      <CartPage/>
      <Footer/>
    </div>
  );
}

export default App;
