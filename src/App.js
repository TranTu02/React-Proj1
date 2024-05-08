import SetRem from './Contexts/SetRem.jsx';
import {BrowserRouter,useParams , Routes,Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import NavBar from './Components/Navbar/NavBar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import MainPage from './Pages/MainPage';
import CategoryPage from './Pages/CategoryPage.jsx';
import DetailPage from './Pages/DetailPage.jsx';
import SearchPage from './Pages/SearchPage.jsx';
import CartPage from './Pages/CartPage.jsx';
import PaymentPage from './Pages/PaymentPage.jsx';
import LoginSignUp from './Pages/Login-SignUp.jsx';

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
    <BrowserRouter>
      <div>            
          <Routes>        
            <Route path='/' element={<MainPage />} />
            <Route path="/SearchPage/:searchTerm" element={<SearchPage />} />   
            <Route path='/CartPage' element={<CartPage/>} />   
            <Route path='/Category' element={<CategoryPage/>} />
            <Route path='/Login' element={<LoginSignUp />}>
              <Route path='/Login/:path' element={<LoginSignUp/>}/>
            </Route>
            <Route path='/Detail/:ProductID' element={<DetailPage/>}/>
            <Route path='/Cart/Payment' element={<PaymentPage/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
