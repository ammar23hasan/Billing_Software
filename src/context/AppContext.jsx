import React, { createContext, useState, useEffect } from "react";
import { fetchCategories } from "../services/categoryService";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [auth,setAuth]=useState({token:null,role:null});
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


const setAuthData=(token,role)=>{
setAuth({token,role});
}

  const categoriesValue = { categories, setCategories,auth,setAuthData };

  return (
    <AppContext.Provider value={categoriesValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
