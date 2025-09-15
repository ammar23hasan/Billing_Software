import React, { useContext, useEffect } from "react";
import './Explore.css';
import { AppContext } from '../../context/AppContext';
import { fetchCategories } from "../../services/categoryService";
import CategoryList from '../../components/CategoryList/CategoryList';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import DisplayItems from '../../components/DisplayItems/DisplayItems';
import CartItems from '../../components/CartItems/CartItems';
import CartSummary from '../../components/CartSummary/CartSummary';

const Explore = () => {
  const { categories, setCategories } = useContext(AppContext);

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
          <CategoryList />
        </div>
        <hr className="horizontal-row" />
        <div className="second-row" style={{ overflowY: 'auto' }}>
          {categories.length > 0 ? (
            categories.map((item) => (
              <div key={item.categoryId} className="item">
                {item.name}
                <DisplayItems categoryId={item.categoryId} />
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>

      <div className="right-column d-flex flex-column">
        <div className="customer-form-container" style={{ height: '15%' }}>
          <CustomerForm />
        </div>
        <hr className="my-3 text-light" />
        <div className="cart-items-container" style={{ height: '55%', overflowY: 'auto' }}>
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
