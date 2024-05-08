import React,{useState,useContext} from "react";
import style from "./Cart.module.css";
import * as DATA from "../Assets/data.js";
import { ShopContext } from "../../Contexts/CartContext.jsx";
import { useNavigate } from "react-router-dom";

function Cart(){
    const navigate = useNavigate();
    const { allProduct, cartItems,addToCart, removeFromCart,deleteCart ,getTotalCartAmount,getTotalCartItems } = useContext(ShopContext);
    var listProduct = DATA.listProducts;    
    console.log(listProduct);
    let formatter = new Intl.NumberFormat('en-US');
    const shipCost = getTotalCartAmount(0) >= 300000 ? 0 : 10000;
    const cartInfor = DATA.ListCartInfor(cartItems);
    const handleUp = (productID) =>{
        addToCart(productID,1);
    }    
    const handleDown = (productID) =>{
        removeFromCart(productID,1)
    }
    const handleDel = (productID) => {
        removeFromCart(productID);
    }

    const hanldeDelCart = () =>{
        deleteCart();
    }

    const routeMainPage = () =>{
        navigate("/");
    }

    const routePayment = () =>{
        navigate("/Cart/Payment");
    }    

    return(
        <div className={style.CartContainer}>
            <div className={style.ContentCartDetail}>
                <h2 className={style.Heading}>Giỏ hàng của bạn</h2>
                <p className={style.TitleNumberCart}>Bạn đang có <b>{getTotalCartItems()}</b> sản phẩm trong giỏ hàng</p>
                {true&&
                    <div className={style.Table}>
                        {allProduct.map( (item,key) =>
                            {
                                if(cartItems[item.ProductID] > 0) {
                                    return(
                                    <div className={style.Item} key={key}>
                                        <img src="#" className={style.Illustration} />
                                        <div className={style.NameBox}>
                                            <h2>{item.ProductName}</h2>
                                            <p>Đơn vị tính : {item.CalculationUnit}</p>
                                            {item.present !== undefined && 
                                                <span><img src="#" width={40} height={40}/><p>Mua {item.Require} sản phẩm {item.ProductName} để nhận {item.present.Quantity} sản phẩm {listProduct.find(obj => obj.ProductID === item.present.ProductID).ProductName} miễn phí.</p></span>
                                            }                        </div>
                                        <div className={style.PriceBox}>
                                            <span>
                                                {
                                                    item.Reduce === undefined ?
                                                        <p className={style.Price}>{formatter.format(item.Price)} ₫</p>
                                                    :
                                                        <>
                                                            <p className={style.Price}>{formatter.format(item.Price)} ₫</p>
                                                            <p className={style.Price}>{formatter.format(Math.floor(item.Price * (1 - item.Reduce)))} ₫</p>

                                                        </>                                                        
        
                                                }
                                            </span>
                                            <div className={style.Quantity}>
                                                <button type="button" onClick={()=>handleDown(item.ProductID)} >-</button>
                                                <input type="text" value={cartItems[item.ProductID]}></input>
                                                <button type="button"  onClick={()=>handleUp(item.ProductID)}>+</button>
                                            </div>
                                        </div>
                                        <div className={style.DelBox} onClick={()=>handleDel(item.ProductID)}><p>Xóa</p></div>
                                    </div>
                                    );
                                }else {
                                    return null; // Nếu số lượng mặt hàng trong giỏ hàng là 0, không hiển thị gì
                                }
                                    
                            }
                            )
                        }
                    </div>
                }
                {getTotalCartItems() > 0 ?
                    <div className={style.DelCart} onClick={() => hanldeDelCart()} >
                        <p>Xoá toàn bộ</p>
                    </div>
                    :
                    <div className={style.DelCart} onClick={routeMainPage}>
                        <p>Quay lại trang chủ</p>
                    </div>
                }
            </div>
            <div className={style.OrderSummaryBox}>
                <h2 className={style.Title}>Thông tin đơn hàng</h2>
                <div className={style.Infor}>
                    <p>Tổng tiền giỏ hàng</p>
                    <p>{formatter.format(cartInfor.totalCart)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Tiết kiệm được</p>
                    <p>{formatter.format(cartInfor.totalPresent)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Phí vận chuyển</p>
                    <p>{formatter.format(shipCost)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Khuyến mại</p>
                    <p>{formatter.format(cartInfor.totalReduce)} ₫</p>
                </div>
                <div className={style.Infor}>
                    <p>Thành Tiền</p>
                    <p>{formatter.format(getTotalCartAmount(shipCost))} ₫</p>
                </div>
                <p>(Giá đã bao gồm VAT)</p>
                <p>Mua thêm để miễn phí giao hàng từ <b>{formatter.format(300000)} ₫</b></p>
                <div className={getTotalCartAmount(0) === 0 ? style.BtnNonActive : style.Btn} onClick={getTotalCartAmount(0) !== 0 ? routePayment : undefined}>
                    <p>THANH TOÁN</p>
                    <p>{formatter.format(getTotalCartAmount(shipCost))} ₫</p>                    
                </div>
            </div>
        </div>
    );
}

export default Cart;