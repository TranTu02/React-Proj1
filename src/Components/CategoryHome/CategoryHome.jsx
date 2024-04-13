import React,{useState} from "react";
import style from './CategoryHome.module.css';
import Item from "../Item/Item.jsx";
import * as DATA from '../Assets/data.js';

function CategoryHome({CategoryID}){
    const in4 = DATA.ListeProductsByCategory(CategoryID);
    const data = in4.Products.slice(0,20);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage > data.length ? (currentPage - 1) * itemsPerPage + data.length % 5 : currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1); 
        } else if (currentPage === Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(1);         
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return(
        <div className={style.ListContainer}>
            <div className={style.ListTitle}>
                <h3>{in4.Name}</h3>
            </div>
            <div className={style.ListItem}>
                <div className={style.Prev} onClick={prevPage}>&#10094;</div>
                <div className={style.Next} onClick={nextPage}>&#10095;</div>
                {currentItems.map((item, index) => (
                    <Item product={item} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default CategoryHome;