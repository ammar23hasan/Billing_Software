import React, { useContext, useEffect } from "react";
import './Explore.css';
import { AppContext } from '../../context/AppContext';
import { fetchCategories } from "../../services/categoryService";
import CategoryList from '../../components/CategoryList/CategoryList';

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
              <div key={item.categoryid} className="item">
                {item.name}
              </div>
            ))
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>

      <div className="right-column d-flex flex-column">
        <div className="customer-form-container" style={{ height: '15%' }}>
          customer form
        </div>
        <hr className="my-3 text-light" />
        <div className="cart-items-container" style={{ height: '55%', overflowY: 'auto' }}>
          cart items
        </div>
        <div className="cart-summary-container" style={{ height: '30%' }}>
          cart summary
        </div>
      </div>
    </div>
  );
};

export default Explore;
