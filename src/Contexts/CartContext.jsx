import React, { createContext, useState, useEffect } from "react";
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
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : getDefaultCart();
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const [phoneNumber, setPhoneNumber] = useState(() => {
    const savedCart = localStorage.getItem("PhoneNumber");
    return savedCart ? JSON.parse(savedCart) : "";
  });

  useEffect(() => {
    localStorage.setItem("PhoneNumber", JSON.stringify(phoneNumber));
  }, [phoneNumber]);

  const setCurrentAccount = (account) => {
    setPhoneNumber(account);
    console.log(account);
    localStorage.setItem("PhoneNumber", JSON.stringify(account));
  };

  const addToCart = (itemId, quantity) => {
    if (cartItems[itemId] === undefined) {
      setCartItems((prev) => ({ ...prev, [itemId]: quantity }));
    } else setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }));
  };

  const removeFromCart = (itemId, quantity) => {
    if (quantity === undefined || cartItems[itemId] <= quantity) {
      setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - quantity }));
    }
  };

  const deleteCart = () => {
    setCartItems(getDefaultCart());
  };

  const getTotalCartAmount = (shipCost) => {
    const cart = DATA.ListCartInfor(cartItems);
    let totalAmount = cart.totalCart - cart.totalReduce;

    if (shipCost === undefined) shipCost = 0;
    return totalAmount + shipCost;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }

    return totalItems;
  };

  const [currentLocation, setCurrentLocation] = useState(DATA.listLocations[1]);
  const setLocation = (locationID) => {
    setCurrentLocation(DATA.listLocations.find((obj) => obj.LocationID === locationID));
  };
  // Lấy dữ liệu từ LocalStorage
  const localStorageData = localStorage.getItem("cartItems");

  // Kiểm tra xem dữ liệu có tồn tại không
  if (localStorageData) {
    // Dữ liệu đã lưu trữ được trả về dưới dạng chuỗi, bạn có thể chuyển đổi nó thành đối tượng JavaScript nếu cần
    const parsedData = JSON.parse(localStorageData);
  } else {
    console.log("Dữ liệu không tồn tại trong LocalStorage");
  }

  const contextValue = {
    allProduct,
    cartItems,
    addToCart,
    removeFromCart,
    deleteCart,
    getTotalCartAmount,
    getTotalCartItems,
    currentLocation,
    setLocation,
    phoneNumber,
    setCurrentAccount,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
