import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Category from '../Components/Category/Category.jsx';
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx';
import * as DATA from '../Components/Assets/data.js';

function CategoryPage({CategoryID}) {
  const CategoryName = CategoryID !== undefined ? DATA.listCategories.find(obj => obj.CategoryID === CategoryID).CategoryName : "Tất cả sản phẩm";
  return (
    <div>
      <BreadCrumb CategoryName={CategoryName}/>
      <Category CategoryID={CategoryID}/>
    </div>
  );
}

export default CategoryPage;
