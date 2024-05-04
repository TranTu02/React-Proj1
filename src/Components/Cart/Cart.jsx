import React,{useState} from "react";
import style from "./Cart.module.css";
import * as DATA from "../Assets/data.js";


function Cart(){
    var listProduct = DATA.ListProductsDetail();    
    let formatter = new Intl.NumberFormat('en-US');
    const [quantity,setQuantity] = useState(1);
    const handleUp = () =>{
        setQuantity(prev => prev + 1);
    }    
    const handleDown = () =>{
        if (quantity > 1)        setQuantity(prev => prev - 1);
    }

    return(
        <div className={style.CartContainer}>
            <div className={style.ContentCartDetail}>
                <h2 className={style.Heading}>Giỏ hàng của bạn</h2>
                <p className={style.TitleNumberCart}>Bạn đang có <b>1 sản phẩm</b> trong giỏ hàng</p>
                {true&&
                    <div className={style.Table}>
                        <div className={style.Item}>
                            <img src="#" className={style.Illustration} />
                            <div className={style.NameBox}>
                                <h2>Nước tương hảo hạng Maggi chai 200ml</h2>
                                <p>Đơn vị tính : </p>
                                {true && 
                                    <span><img src="#" width={40} height={40}/><p>Mua 2 Chai được tặng 1 chai Nước tương hảo hạng Maggi chai 200ml</p></span>
                                }                        </div>
                            <div className={style.PriceBox}>
                                <span>
                                    <p className={style.Price}>{formatter.format(100000)} ₫</p>
                                    <p className={style.Price}>{formatter.format(100000)} ₫</p>
                                </span>
                                <div className={style.Quantity}>
                                    <button type="button" onClick={handleDown} >-</button>
                                    <input type="text" value={quantity}></input>
                                    <button type="button"  onClick={handleUp}>+</button>
                                </div>
                            </div>
                            <div className={style.DelBox}><p>Xóa</p></div>
                        </div>
                        <div className={style.Item}>
                            <img src="#" className={style.Illustration} />
                            <div className={style.NameBox}>
                                <h2>Nước tương hảo hạng Maggi chai 200ml</h2>
                                <p>Đơn vị tính : </p>
                                {false && 
                                    <span><img src="#" width={40} height={40}/><p>Mua 2 Chai được tặng 1 chai Nước tương hảo hạng Maggi chai 200ml</p></span>
                                }
                                </div>
                            <div className={style.PriceBox}>
                                <span>
                                    <p className={style.Price}>{formatter.format(100000)} ₫</p>
                                    <p className={style.Price}>{formatter.format(100000)} ₫</p>
                                </span>
                                <div className={style.Quantity}>
                                    <button type="button" onClick={handleDown} >-</button>
                                    <input type="text" value={quantity}></input>
                                    <button type="button"  onClick={handleUp}>+</button>
                                </div>
                            </div>
                            <div className={style.DelBox}><p>Xóa</p></div>
                        </div>
                    </div>
                }
                {true?
                    <div className={style.DelCart}>
                        <p>Xoá toàn bộ</p>
                    </div>
                    :
                    <div className={style.DelCart}>
                        <p>Quay lại trang chủ</p>
                    </div>
                }
            </div>
            <div className={style.OrderSummaryBox}>
                <h2 className={style.Title}>Thông tin đơn hàng</h2>
                <div className={style.Infor}>
                    <p>Tổng tiền giỏ hàng</p>
                    <p>{formatter.format(100000)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Tiết kiệm được</p>
                    <p>{formatter.format(100000)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Phí vận chuyển</p>
                    <p>{formatter.format(100000)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Khuyến mại</p>
                    <p>{formatter.format(100000)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Thành Tiền</p>
                    <p>{formatter.format(100000)} ₫</p>
                </div>
                <p>(Giá đã bao gồm VAT)</p>
                <p>Mua thêm để miễn phí giao hàng từ <b>{formatter.format(300000)} ₫</b></p>
                <div className={style.Btn}>
                    <p>THANH TOÁN</p>
                    <p>{formatter.format(100000)} ₫</p>                    
                </div>
            </div>
        </div>
    );
}

export default Cart;