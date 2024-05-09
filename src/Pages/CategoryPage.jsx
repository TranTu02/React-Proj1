import SetRem from '../Contexts/SetRem.jsx';
import {useParams, Routes,Route } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Category from '../Components/Category/Category.jsx';
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx';
import * as DATA from '../Components/Assets/data.js';

function CategoryPage() {
  const   {CategoryID,BrandID,TypeID,Others} = useParams();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <div>
      <SetRem/>
      <Header/>
      <NavBar/>
      <Category CategoryID={CategoryID} BrandID={BrandID} TypeID={TypeID} Others={Others}/>
      <Footer/>
    </div>
  );
}

export default CategoryPage;
