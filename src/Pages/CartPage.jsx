import Cart from "../Components/Cart/Cart"; 
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx'; 
import SetRem from '../Contexts/SetRem.jsx';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Header from "../Components/Header/Header.jsx";
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

function CartPage(){
    return(
        <div>
            <SetRem/>
            <Header/>
            <NavBar/>
            <Cart/>
            <Footer/>
        </div>
    );
}

export default CartPage;