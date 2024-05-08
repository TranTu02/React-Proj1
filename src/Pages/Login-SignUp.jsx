import LogIn from '../Components/LoginSignUp/LogIn.jsx';
import SignUp from '../Components/LoginSignUp/SignUp.jsx';
import BreadCrumb from '../Components/BreadCrumb/BreadCrumb.jsx'; 
import SetRem from '../Contexts/SetRem.jsx';
import {useParams } from 'react-router-dom';
import Header from '../Components/Header/Header.jsx';
import NavBar from '../Components/Navbar/NavBar.jsx';
import Footer from '../Components/Footer/Footer.jsx';

function LoginSignUp(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const path = useParams().path;
    console.log(path);
    return(
        <div>
            <SetRem/>
            <Header/>
            <NavBar/>     
            {
                path==="SignUp"
                ?
                <SignUp/>
                :
                <LogIn/>
            }
            <Footer/>
        </div>
    );
}

export default LoginSignUp;