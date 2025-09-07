import React, { createContext, useState, useEffect } from "react";
import { fetchCategories } from "../services/categoryService";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
useEffect(() => {
  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
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


  const categoriesValue = { categories, setCategories };

  return (
    <AppContext.Provider value={categoriesValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
