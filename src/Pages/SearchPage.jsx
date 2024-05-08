import Search from "../Components/Search/Search";   
import SetRem from '../Contexts/SetRem.jsx';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

function SearchPage(){
    const key  = useParams().searchTerm;
    return(
        <div>
        <SetRem/>
        <Header/>
        <NavBar/>     
        <Search k={key}/>
        <Footer/>
        </div>
    );
}

export default SearchPage;