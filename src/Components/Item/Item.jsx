import React from "react";
import style from './Item.module.css';

const Item = ({product}) => {
    return(
        <div className={style.ItemContainer}>
            <img src={product.Image} />
            <div className={style.Infor}>
                <h2>{product.ProductName}</h2>
                <h4>{product.PresentID!==undefined?'Mua để nhận quà':''}</h4>
                <div className={style.price}>
                    {product.Reduce===undefined?<h3>{product.Price} đ</h3> : <><h3>{(product.Price*(1-product.Reduce)).toFixed(0)}đ</h3><h3 className={style.original}>{product.Price}</h3></> }
                </div>
                <button >Thêm vào giỏ</button>
            </div>
        </div>
    );
}

export default Item;