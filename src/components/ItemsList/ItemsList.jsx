import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
// تعديل مسار الخدمة ليتطابق مع اسم الملف
import { deleteItem } from "../../services/itemService";
import toast from "react-hot-toast";
import "./ItemsList.css";
import { assets } from "../../assets/assets";

const ItemsList = () => {
  const { itemsData = [], setItemsData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItem = itemsData.filter((item) => {
    return (item.name || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  const removeItem = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response?.status === 204 || response?.status === 200) {
        const updatedItems = itemsData.filter((item) => (item.item_id || item.itemId) !== itemId);
        setItemsData(updatedItems);
        toast.success("Item deleted");
      } else {
        toast.error("Unable to delete item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting item");
    }
  };

  return (
    <div className="category-list-container modern-list" style={{ overflowY: "auto", height: "100%", overflowX: "hidden" }}>
      {/* Search bar */}
      <div className="row pe-2 mb-3">
        <div className="input-group">
          <input
            type="text"
            name="keyword"
            id="keyword"
            className="form-control modern-search"
            placeholder="Search items..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning modern-search-icon">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {filteredItem.length === 0 ? (
          <div className="empty-state text-center text-muted p-4">No items found.</div>
        ) : (
          filteredItem.map((item) => (
            <div className="card item-card p-3 bg-dark mb-2" key={item.item_id || item.itemId}>
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={item.img_url || item.imageUrl || assets.profile}
                    alt={item.name || "item image"}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    className="item-image"
                    onError={(e) => (e.currentTarget.src = assets.profile)}
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white small">Category: {item.categoryName || item.category || "-"}</p>
                  <span className="mb-0 badge rounded-pill text-bg-warning mt-1">&#36;{item.price ?? 0}</span>
                </div>
                <button className="btn btn-danger btn-sm ms-3" onClick={() => removeItem(item.item_id || item.itemId)} aria-label={`Delete ${item.name}`}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemsList;
