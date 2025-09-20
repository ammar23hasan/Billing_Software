import React, { createContext, useState, useEffect } from "react";
import { fetchCategories } from "../services/categoryService";
import { fetchItems } from "../services/itemService";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [cartItems, setCartItems] = useState([]);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.name === item.name 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // دالة لزيادة كمية العنصر في العربة
  const increaseQuantity = (itemName) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // دالة لنقص كمية العنصر في العربة (لا تنقص عن 1)
  const decreaseQuantity = (itemName) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.name === itemName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // دالة لحذف عنصر من العربة
  const removeItem = (itemName) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.name !== itemName)
    );
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role) {
          setAuthData(token, role);
        }

        const response = await fetchCategories();
        const itemResponse = await fetchItems();
        const formattedCategories = response.data.map(cat => ({
          ...cat,
          bgColor: cat.bg_color,
          imgUrl: cat.img_url,
        }));
        setCategories(formattedCategories);
        setItemsData(itemResponse.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    loadCategories();
  }, []);
const clearCart=()=>{
  setCartItems([]);
}
  return (
    <AppContext.Provider
      value={{
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        setCartItems,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
