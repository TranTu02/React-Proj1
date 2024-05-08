import Pay from '../Components/Pay/Pay.jsx';
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx'; 
import SetRem from '../Contexts/SetRem.jsx';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

function PaymentPage(){
    return(
        <div>
            <SetRem/>
            <Header/>
            <NavBar/>     
            <Pay/>
            <Footer/>
        </div>
    );
}

export default PaymentPage;