import React,{createContext,useState} from "react";
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

    const [cartItems, setCartItems] = useState(getDefaultCart())

    const addToCart = (itemId,quantity) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }));
    }

    const removeFromCart = (itemId,quantity) => {  
        if(quantity === undefined){
                setCartItems((prev) => {
                const updatedCart = { ...prev };
                delete updatedCart[itemId];
                return updatedCart;
            });
        }else{            
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
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


    const contextValue = { allProduct, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;