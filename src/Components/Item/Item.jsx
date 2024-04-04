import React from "react";
import style from './Item.module.css';

const Item = ({imgSrc,productName,price,discont,present}) => {
    return(
        <div className={style.ItemContainer}>
            <img src={imgSrc} />
            <div className={style.Infor}>
                <h2>{productName}</h2>
                <h4>{present!==''?'Mua để nhận quà':''}</h4>
                <div className={style.price}>
                    {discont===0?<h3>{price} đ</h3> :<><h3>{price*(1-discont)}đ</h3><h3 className={style.original}>{price}</h3></> }
                </div>
                <button >Thêm vào giỏ</button>
            </div>
        </div>
    );
}

export default Item;