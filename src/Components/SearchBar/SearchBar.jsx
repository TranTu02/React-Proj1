import React, { useState } from 'react';
import styles from './SearchBar.module.css'
import SearchIcon from '../Assets/search.png'


function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gọi hàm onSearch và truyền giá trị searchTerm vào
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.SearchBar}>
      <button type="submit"><img src={SearchIcon}/></button>
      <input
        type="text"
        placeholder='Nhập từ khóa tìm kiếm'
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchBar;
