import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./CategoryList.css";
import toast from "react-hot-toast";
import { deleteCategory } from "../../services/categoryService";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = React.useState("");

  // البحث
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // حذف كاتيجوري
  const deleteCategoryId = async (categoryid) => {
    try {
      const response = await deleteCategory(categoryid);
      if (response.status === 204) {
        const updatedCategories = categories.filter(
          (category) => category.categoryid !== categoryid
        );
        setCategories(updatedCategories);
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the category");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ overflowY: "auto", height: "100vh", overflowX: "hidden" }}
    >
      {/* Search bar */}
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            className="form-control"
            placeholder="Search by keyword"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="row g-3 pe-2">
        {filteredCategories && filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div key={index} className="col-12">
        <div className="card p-3"
     style={{ backgroundColor: category.bg_color }}>
  <div className="d-flex align-items-center">
    <div style={{ marginRight: "15px" }}>
      <img
        src={category.img_url}
        alt={category.name}
        className="category-image"
      />
    </div>
    <div className="flex-grow-1">
      <h5 className="mb-1 text-white">{category.name}</h5>
      <p className="mb-0 text-white">5 Items</p>
    </div>
    <button
      className="btn btn-danger btn-sm"
      onClick={() => deleteCategoryId(category.categoryid)}
    >
      Delete
    </button>
  </div>
</div>

            </div>
          ))
        ) : (
          <p className="text-white">No categories available</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
