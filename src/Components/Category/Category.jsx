import React,{useState} from "react";
import style from './Category.module.css';
import down from '../Assets/down-arrow.png';
import sort from '../Assets/sort.png';
import * as DATA from '../Assets/data.js';
import Item from "../Item/Item.jsx";

function Category({CategoryID}){    
    const data = CategoryID === undefined ? DATA.listProducts : DATA.listProducts.filter(obj => obj.CategoryID === CategoryID);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage > data.length ? (currentPage - 1) * itemsPerPage + data.length % 5 : currentPage * itemsPerPage;
    const currentItems = data.slice(0, indexOfLastItem);
    const handleMore = () =>{
        setCurrentPage(prev => prev + 1);
    }
    const showMoreButton = indexOfLastItem < data.length;
    
    const [showCategoryList, setShowCategoryList] = useState(true);

    const handleCategoryList = () => {
        setShowCategoryList(!showCategoryList);
    };

    const [showBrandList, setShowBrandList] = useState(true);

    const handleBrandList = () => {
        setShowBrandList(!showBrandList);
    };
    const [showFilterList, setShowFilterList] = useState(false);

    const handleFilterList = () => {
        setShowFilterList(!showFilterList);
    };

    
    return (
        <div className={style.CategoryContainer}>
            <div className={style.FilterContainer}>
                <div className={style.Category}>
                    <div className={style.CategoryTitle} onClick={handleCategoryList}>
                        <h3>Danh mục sản phẩm</h3>
                        <img src={down} width={25} className={showCategoryList? style.rotate:''}/>
                    </div>
                    {
                        showCategoryList && (
                            <ul>
                                <li>Tất cả sản phẩm</li>
                                {DATA.listCategories.map( (item,index)=>
                                <li>{item.CategoryName}</li>   
                            )}
                            </ul>)
                    }
                </div>
                <div className={style.Brand}>
                    <div className={style.BrandTitle} onClick={handleBrandList}>
                        <h3>Thương hiệu</h3>
                        <img src={down} width={25} className={showBrandList? style.rotate:''}/>
                    </div>                    
                    {
                        showBrandList && (
                            <ul>
                                {DATA.listBrand().map( (item,index)=>
                                <li>{item.BrandName}</li>   
                            )}
                            </ul>)
                    }
                </div>
            </div>
            <div className={style.ProductContainer}>
                <img className={style.Banner} src={DATA.listCategories.find(obj => obj.CategoryID===CategoryID).CategoryIllustration} />
                <div className={style.Title}>
                    <div className={style.HeadingBox}>
                        <h2>{CategoryID === undefined ? 'TẤT CẢ SẢN PHẨM' : DATA.listCategories.find(obj => obj.CategoryID === CategoryID).CategoryName}</h2>
                        <span className={style.Count}>
                            <b>{data.length}</b> Sản phẩm
                        </span>
                    </div>
                    <div className={style.FilterBox}>
                        <div className={style.FilterTitle} onClick={handleFilterList} >
                            <img src={sort} height={25} />
                            <p>Sắp xếp</p>
                            <img src={down} height={16} className={showFilterList? style.rotate:''}/>
                        </div>
                        { showFilterList &&
                            <ul>
                                <li>Từ A-Z</li>
                                <li>Từ Z-A</li>
                                <li>Từ cao-thấp</li>
                                <li>Từ thấp-cao</li>
                                <li>Từ mới-cũ</li>
                                <li>Từ cũ-mới</li>
                            </ul>
                        }
                    </div>
                </div>
                <div className={style.Products} >
                    {
                        currentItems.map( (item,index)=>
                            <Item product={item} key = {index}/>
                    )
                    }
                </div>
                {showMoreButton&&(
                    <div className={style.BtnMore} onClick={handleMore}><a>Xem thêm sản phẩm</a></div>
                    )
                }             
                
            </div>
        </div>
    );
}

export default Category;