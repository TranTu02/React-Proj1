import SetRem from '../Contexts/SetRem.jsx';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Category from '../Components/Category/Category.jsx';
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx';
import * as DATA from '../Components/Assets/data.js';

function CategoryPage({CategoryID}) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const CategoryName = CategoryID !== undefined ? DATA.listCategories.find(obj => obj.CategoryID === CategoryID).CategoryName : "Tất cả sản phẩm";
  return (
    <div>
      <SetRem/>
      <Header/>
      <NavBar/>
      <BreadCrumb CategoryName={CategoryName}/>
      <Category CategoryID={CategoryID}/>
      <Footer/>
    </div>
  );
}

export default CategoryPage;
