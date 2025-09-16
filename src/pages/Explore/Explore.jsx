import React, { useContext, useEffect, useState } from "react";
import './Explore.css';
import { AppContext } from '../../context/AppContext';
import { fetchCategories } from "../../services/categoryService";
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import DisplayItems from '../../components/DisplayItems/DisplayItems';
import DisplayCategory from '../../components/DisplayCategory/DisplayCategory';
import CartItems from '../../components/CartItems/CartItems';
import CartSummary from '../../components/CartSummary/CartSummary';

const Explore = () => { 
  const { categories, setCategories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState(null); // ✅ صححت الاسم
  const [customerName,setCustomerName]=useState("");
  const[mobileNumber,setMobileNumber] =useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    loadCategories();
  }, [setCategories]);

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: 'auto' }}>
          <DisplayCategory 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </div>

        <hr className="horizontal-line" />
        <div className="second-row" style={{ overflowY: 'auto' }}>
              <DisplayItems selectedCategory={selectedCategory} />
        </div>
      </div>

      <div className="right-column d-flex flex-column">
        <div className="customer-form-container" style={{ height: '15%' }}>
          <CustomerForm 
          customerName={customerName}
          mobileNumber={mobileNumber}
          setCustomerName={setCustomerName}
          setMobileNumber={setMobileNumber}
          />
        </div>
        <hr className="my-3 text-light" />
        <div className="cart-items-container" style={{ height: '40%', overflowY: 'auto' }}>
          <CartItems />
        </div>
        <div className="cart-summary-container" style={{ height: '30%' }}>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Explore;
