import React,{useState} from "react";
import style from "./Search.module.css";
import Item from "../Item/Item.jsx";
import * as DATA from "../Assets/data.js";

function Search({k}){
    const data = DATA.listProducts;
    const filteredList = data.filter(item => {
        // Kiểm tra xem ProductName của mỗi đối tượng có chứa từ khóa không
        return item.ProductName.toLowerCase().includes(k.toLowerCase());
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage > filteredList.length ? (currentPage - 1) * itemsPerPage + filteredList.length % 5 : currentPage * itemsPerPage;
    const currentItems = filteredList.slice(0, indexOfLastItem);
    const handleMore = () =>{
        setCurrentPage(prev => prev + 1);
    }
    const showMoreButton = indexOfLastItem < filteredList.length ;  

    
    return(
        <div className={style.SearchContainer}>
            <div className={style.Heading}>
                <h2>Tìm kiếm</h2>
                <p>Có <b>{filteredList.length} sản phẩm</b> cho tìm kiếm </p>
                <div className={style.Line} />
            </div>
            <p className={style.SubText}>Kết quả tìm kiếm cho <b>"{k}".</b></p>
            <div className={style.ProductsContainer}>
                {
                    currentItems.map( (item, index) => <Item product={item} key={index}/>)
                }
            </div>
            {showMoreButton&&(
                    <div className={style.BtnMore} onClick={handleMore}><a>Xem thêm sản phẩm</a></div>
                    )
            }     
        </div>
    );
}

export default Search;