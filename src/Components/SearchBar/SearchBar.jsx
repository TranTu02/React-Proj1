import React, { useState } from 'react';
import { useNavigate,BrowserRouter ,Routes,Route, Link } from 'react-router-dom';
import styles from './SearchBar.module.css';
import SearchIcon from '../Assets/search.png';
import SearchPage from '../../Pages/SearchPage.jsx';
import * as DATA from "../Assets/data.js";

function SearchBar() {
  const navigate = useNavigate();
  // định dạng tiền tệ  
  let formatter = new Intl.NumberFormat('en-US');
  const [searchTerm, setSearchTerm] = useState('');
  const data = DATA.listProducts.filter(item => {      // Kiểm tra xem ProductName của mỗi đối tượng có chứa từ khóa không
    return item.ProductName.toLowerCase().includes(searchTerm.toLowerCase());
});
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    if(searchTerm.trim()==="" || undefined) 
      {
        navigate("/SearchPage/undefined");
      }
      else{
        navigate("/SearchPage/"+ searchTerm);
      }
  };
  const handleDetail = (itemID) => {
    navigate("/Detail/"+itemID);
    setSearchTerm(null);
  }
  return (
    
    <form onSubmit={handleSubmit} className={styles.SearchBar}>
      <button type="submit"><img src={SearchIcon}/></button>
      <input
        type="text"
        placeholder='Nhập từ khóa tìm kiếm'
        value={searchTerm}
        onChange={handleChange}
      />{
        searchTerm !== '' &&
          <div className={styles.Related}>
            {data.slice(0,5).map( (item,index) => <div className={styles.Product} key={index} onClick={()=>handleDetail(item.ProductID)}>
              <span><p><b>{item.ProductName}</b></p>
              <br/>
                <p>{formatter.format(item.Price)} ₫</p>
              </span>
              <img src={item.Image}/>
            </div>)}
            {data.length > 5 && <span className={styles.BtnMore} onClick={handleSubmit}><p>Xem thêm</p></span>}
          </div>
      }
      <Routes>
        <Route path='/SearchPage' element={<SearchPage searchTerm={searchTerm}/>}/>
      </Routes>
    </form>
  );
  
}

export default SearchBar;
