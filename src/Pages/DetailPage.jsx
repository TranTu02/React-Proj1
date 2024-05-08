import SetRem from '../Contexts/SetRem.jsx';
import {useParams } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Detail from '../Components/Detail/Detail.jsx';
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx'; 
import * as DATA from '../Components/Assets/data.js';


function DetailPage() {
  const ProductID = parseInt(useParams().ProductID);
  return (
    <div>
      <SetRem/>
      <Header/>
      <NavBar/>      
      <Detail ProductID={ProductID}/>
      <Footer/>
    </div>
  );
}

export default DetailPage;
