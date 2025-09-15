import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../services/itemService";
import toast from "react-hot-toast";
import "./ItemsList.css";

const ItemsList = () => {
  const { itemsData, setItemsData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItem = itemsData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const removeItem = async (itemId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status === 204) {
        const updatedItems = itemsData.filter((item) => item.itemId !== itemId);
        setItemsData(updatedItems);
        toast.success("Item deleted");
      } else {
        toast.error("Unable to delete item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete item");
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

      <div className="row g-3 pe-2">
        {filteredItem.map((item, index) => (
          <div className="card p-3 bg-dark" key={index}>
            <div className="d-flex align-items-center">
              <div style={{marginRight:'15px'}}>
                <img
                  src={item.img_url} // تأكد من الحقل في ItemResponse
                  alt={item.name}
                    style={{ width: "60px", height: "60px" }}

                  className="item-image"
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-1 text-white">{item.name}</h6>
                <p className="mb-0 text-white">Category: {item.categoryName}</p>
                <span className="mb-0 badge rounded-pill text-bg-warning">
                  &#8377;{item.price}
                </span>
              </div>
              <button
                className="btn btn-danger btn-sm ms-3"
                onClick={() => removeItem(item.itemId)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
