import React,{createContext,useState,useEffect} from "react";
import * as DATA from "../Components/Assets/data.js";


export const ShopContext = createContext(null);

const allProduct = DATA.ListProductsDetail();

const getDefaultCart = () => {
    return allProduct.reduce((cart, product) => {
        cart[product.ProductID] = 0;
        return cart;
    }, {});
};

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());

    // useEffect (() => {
    //     const storeCart = JSON.parse(localStorage.getItem("cartItems"));
    //     if(storeCart){
    //         setCartItems(storeCart);
    //     }
    // },[]);
    
    const addToCart = (itemId,quantity) => {   
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }));
    }

    const removeFromCart = (itemId,quantity) => {  
        
        if(quantity === undefined || cartItems[itemId] <= quantity){
            setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
        }else{            
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - quantity }));
        }
    }

    const deleteCart = () =>{
        setCartItems(getDefaultCart());
    }

    const getTotalCartAmount = (shipCost) => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProduct.find((product) => product.ProductID === Number(item))
                totalAmount += itemInfo.Price * cartItems[item];
            }
        }
        if(shipCost === undefined) shipCost = 0;
        return totalAmount + shipCost;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item]
            }
        }
        return totalItems;
    }


    const contextValue = { allProduct, cartItems, addToCart, removeFromCart, deleteCart, getTotalCartAmount, getTotalCartItems }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;