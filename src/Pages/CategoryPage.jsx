import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Category from '../Components/Category/Category.jsx';

function CategoryPage({CategoryID}) {
  return (
    <div>
      <Header/>
      <NavBar/>
      <Category CategoryID={CategoryID}/>
      <Footer/>        
    </div>
  );
}

export default CategoryPage;
