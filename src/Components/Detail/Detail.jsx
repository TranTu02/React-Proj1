import React,{useState,useEffect, useContext} from "react";  
import style from './Detail.module.css';
import CategoryHome from "../CategoryHome/CategoryHome.jsx";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Contexts/CartContext.jsx";
import * as DATA from '../Assets/data.js';

function Detail({ProductID}){
    const navigate = useNavigate();
    // định dạng tiền tệ
    let formatter = new Intl.NumberFormat('en-US');
    // đổi product id khi xem loại khác
    const [prdID,setPrdID] = useState(undefined);
    // Tạo dữ liệu cho sản phẩm 
    const [data,setData] = useState(DATA.listProducts.find(obj => obj.ProductID === ProductID) );    
    useEffect(() => {
        const newData = DATA.listProducts.find(obj => obj.ProductID === ProductID);
        setData(newData);
    }, [ProductID]); 

    const brand = DATA.listBrand().find(obj => obj.BrandID === DATA.listBrandProduct.find(br => br.ProductID === ProductID).BrandID).BrandName;
    // Kiểm tra giảm giá 
    const isReduce = DATA.ListHotSale().find(obj => obj.ProductID === ProductID);
    const discount = isReduce ? DATA.listDiscountProduct.find(disc => disc.DiscountID === DATA.ListHotSale().find(obj => obj.ProductID === ProductID).DiscountID).Reduce : undefined;
    // Kiểm tra quà tặng 
    const isPresent = DATA.listPresentProduct.find(obj => obj.ProductID === ProductID);
    const present = isPresent ? DATA.listProducts.find(prd => prd.ProductID === DATA.listPresentEvents.find(obj => obj.PresentID ===isPresent.PresentID).ProductID ) : undefined;
    const quantityPresent = isPresent ? DATA.listPresentEvents.find(obj => obj.PresentID === isPresent.PresentID).Quantity : undefined;
    const listPhoto = DATA.listPhoto.filter(obj => obj.ProductID === ProductID);
    const [mainImg,setMainImg] = useState(listPhoto[1]);
    // Mô tả và đánh giá
    let lines = data.Description.split('\n');
    let cmts = DATA.listComment.filter(obj => obj.ProductID === ProductID);
    // Kiểm tra các sản phẩm tương tự (cùng group)
    const isGroup = DATA.listGroupProducts.find(obj => obj.ProductID === ProductID) ? DATA.listGroupProducts.find(obj => obj.ProductID === ProductID).GroupID : false;
    const group = isGroup ? DATA.listGroupProducts.filter( gr => gr.GroupID === isGroup) : undefined;
    const listType = isGroup ? DATA.listProducts.filter(type => {
        return group.find(obj => obj.ProductID === type.ProductID);
    }): null;
    // Chuyển đổi xem mô tả hoặc đánh giá
    const [active,setActive] = useState('desc');

    const [display,setDisplay] = useState(null);
    useEffect( () =>{
         lines = data.Description.split('\n');
        if(prdID !== undefined){
             cmts = DATA.listComment.filter(obj => obj.ProductID === prdID);
        }else{
             cmts = DATA.listComment.filter(obj => obj.ProductID === ProductID);
        }
        setDisplay(    active === 'desc' ?
            <div className={style.DescriptionBox}>
                {lines.map((text,index) => <p key={index}>{text}</p>)}
            </div>
            :
            <div className={style.CmtBox}>
                {cmts.map((cmt,index) => <div className={style.Cmt}  key={index}><span ><b>{cmt.Title}</b> - {cmt.Time.toLocaleString()} <br/> <p>{cmt.Comment}</p></span></div>)}
            </div>
        )
        },[data,active]
    ) ;
    //Cart context
    const {allProduct,cartItems,addToCart,getTotalCartAmount} = useContext(ShopContext);
    const product =allProduct.find(obj => obj.ProductID === data.ProductID);

    // handle
    const handleMainImg =(index) => {
        setMainImg(index);
    }

    const handleType = (productID)=>{
        setPrdID(productID);
        setData(DATA.listProducts.find(obj => obj.ProductID == productID));
    }

    const handleDesc = () => {
        if(active !== 'desc') setActive('desc');
    }    
    const handleCmt = () => {
        if(active === 'desc') setActive('cmt');
    }
    const [quantity,setQuantity] = useState(1);
    const handleUp = () =>{
        setQuantity(prev => prev + 1);
    }    
    const handleDown = () =>{
        if (quantity > 1)        setQuantity(prev => prev - 1);
    }

    const routeCart = () => {
        addToCart(data.ProductID,quantity);
        navigate('/CartPage');
    }

    return(
        
        <div className={style.DetailPage}>                        
    
            <div className={style.DetailContainer}>
                <div className={style.ProductDetailContainer}>
                    <div className={style.Illustration}>
                        <img src={mainImg} className={style.MainPhoto}/>
                        <div className={style.PhotoList}>
                            {
                                listPhoto ? listPhoto.map( (photo,index) => <img className={mainImg === photo.ImgSrc ? style.Display : ''} onClick={() => handleMainImg(photo.ImgSrc)} src={photo.ImgSrc} key={index}/>)
                                : <img className={style.Display}  src={data.Image} />
                            }
                        </div>
                    </div>
                    <div className={style.Content}>
                        <div className={style.HeadingBox}>
                            <h1>{data.ProductName}</h1>
                            <span className={style.Infor}>Mã sản phẩm: <a>{data.ProductID}</a></span>
                            <span className={style.Infor}>Tình trạng: <a>{data.Stock > 0 ? 'Còn ' + data.Stock + ' sản phẩm' : 'Hết hàng'}</a></span>
                            <span className={style.Infor}>Thương hiệu: <a>{brand}</a></span>
                        </div>
                        <div className={style.DetailLayout}>

                        <div className={style.DetailBox}>           
                            <div className={style.PriceBox}>
                                <span className={style.Title}>Giá:</span>
                                <span className={style.Price}>{formatter.format(discount === undefined ? data.Price : (data.Price * (1 - discount)).toFixed(0) )} ₫</span>
                                {discount !== undefined ?
                                    <>
                                        <span className={style.Original}>{formatter.format(data.Price)} ₫</span>
                                        <span className={style.Recent}>-{discount * 100}%</span>
                                    </>
                                    :
                                    <></>
                                }
                            </div>

                            <div className={style.Overview}>
                                <span>
                                    {data.Overview}
                                </span>
                            </div>

                            <form className={style.Variant}>
                                <span className={style.Title} >Loại: </span>
                                <div className={style.Type}>
                                    {isGroup ? listType.map( (type,index) => 
                                        <>
                                            <input type="radio" id={type.ProductID} name="options" value={type.ProductID} key={index}/>
                                            <label htmlFor={type.ProductID} onClick={()=>handleType(type.ProductID)} >{type.CalculationUnit}</label>
                                        </>
                                        ):
                                        <>
                                            <input type="radio" id={data.ProductID} name="options" value={data.ProductID} checked={true}/>
                                            <label htmlFor={data.ProductID} onClick={()=>handleType(data.ProductID)} >{data.CalculationUnit}</label>
                                        </>
                                    }
                                </div>
                            </form>

                            <div className={style.Quantity}>
                                <span className={style.Title}>
                                    Số lượng:
                                </span>
                                <button type="button" onClick={handleDown} >-</button>
                                <input type="text" value={quantity}></input>
                                <button type="button"  onClick={handleUp}>+</button>
                            </div>          
                            {/* Kiểm tra có quà không */
                                isPresent &&
                                <div className={style.Present}>
                                    <img src={present.Image} />
                                    <p>Mua để nhận thêm {quantityPresent} x {present.CalculationUnit} {present.ProductName}</p>
                                </div>
                            }
                            <div className={style.Action}>
                                <div className={style.AddCart} onClick={()=>{
                                    addToCart(data.ProductID,quantity);
                                }}>
                                    <span>
                                        THÊM VÀO GIỎ
                                    </span>
                                </div>
                                <div className={style.Buy} onClick={routeCart}>
                                    <span>
                                        MUA NGAY
                                    </span>
                                </div>
                            </div>          
                        </div>              
                        {/* Fix */}
                        <div className={style.DelivelyBox}>
                                <span className={style.Title}>
                                    Chính sách bán hàng
                                </span>
                                <div className={style.DelivelyItem}>
                                    <img src="#"/>
                                    <p>Cam kết 100% chính hãng</p>
                                </div>
                                <div className={style.DelivelyItem}>
                                    <img src="#"/>
                                    <p>Hỗ trợ 24/7</p>
                                </div>
                                <span className={style.Title}>
                                    Thông tin thêm
                                </span>
                                <div className={style.DelivelyItem}>
                                    <img src="#"/>
                                    <p>Mở hộp kiểm tra nhận hàng</p>
                                </div>                        
                                <div className={style.DelivelyItem}>
                                    <img src="#"/>
                                    <p>Đổi trả trong 7 ngày</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.DescriptionContainer}>
                    <div className={style.NavTabs}>
                        <p className={active=== 'desc' ?style.Active : style.Tab} onClick={handleDesc}>MÔ TẢ SẢN PHẨM</p>
                        <p className={active=== 'cmt' ?style.Active : style.Tab} onClick={handleCmt}>NHẬN XÉT</p>
                    </div>
                    {
                        display
                    }
                </div>
            </div>
            <CategoryHome CategoryID = {'C1'} CategoryName = 'SẢN PHẨM LIÊN QUAN'/>
        </div>
    );
}

export default Detail;