import React, { createContext, useState, useEffect } from "react";
import { fetchCategories } from "../services/categoryService";
import { fetchItems } from "../services/itemService"; // تأكد من استيرادها

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });

  useEffect(() => {
    
    const loadCategories = async () => {
      try {
        if(localStorage.getItem("token")&&localStorage.getItem("role")){
          setAuthData(
            localStorage.getItem("token"),
            localStorage.getItem("role")
          );
        }
        const response = await fetchCategories();
        const itemResponse = await fetchItems(); // استخدم fetchItems بشكل صحيح هنا
        setCategories(response.data);
        setItemsData(itemResponse.data);

        const formatted = response.data.map(cat => ({
          ...cat,
          bgColor: cat.bg_color,
          imgUrl: cat.img_url,
        }));
        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    loadCategories();
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const categoriesValue = { categories, setCategories, auth, setAuthData, itemsData, setItemsData };

  return (
    <AppContext.Provider value={categoriesValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
