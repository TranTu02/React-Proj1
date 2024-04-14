import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Detail from '../Components/Detail/Detail.jsx';
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx'; 
import * as DATA from '../Components/Assets/data.js';


function DetailPage({ProductID}) {
  const CategoryName = DATA.listCategories.find(obj => obj.CategoryID === DATA.listProducts.find(prd => prd.ProductID === ProductID).CategoryID).CategoryName;
  const ProductName = DATA.listProducts.find(obj => obj.ProductID === ProductID).ProductName;
  return (
    <div>
      <BreadCrumb CategoryName={CategoryName} ProductName={ProductName} />
      <Detail ProductID={ProductID}/>
    </div>
  );
}

export default DetailPage;
