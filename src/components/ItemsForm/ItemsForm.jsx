import { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { addItem } from "../../services/itemService";

const ItemsForm = () => {
  const { categories, setItemsData, itemsData ,setCategories} = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      toast.error("Select image");
      setLoading(false);
      return;
    }

    if (!data.categoryId) {
      toast.error("Please select a category");
      setLoading(false);
      return;
    }

    const preparedData = { ...data };
    const formData = new FormData();
    formData.append("item", JSON.stringify(preparedData));
    formData.append("file", image);

    try {
      const response = await addItem(formData);
      console.log("Server Response:", response.data);

      if (response.status === 201) {
        // تحديد الرابط الصحيح للصورة
        const newItem = {
          ...response.data,
          imageUrl:
            response.data.imageUrl ||
            (response.data.fileName
              ? `${process.env.REACT_APP_API_BASE}/uploads/${response.data.fileName}`
              : null),
        };

        setItemsData([...itemsData, newItem]);
        setCategories((prevCategories)=>
        prevCategories.map((category)=> category.categoryid===data.categoryid?{...category,items:category.items+1}:category)  );
        toast.success("Item added");

        setData({
          name: "",
          description: "",
          price: "",
          categoryId: "",
        });
        setImage(null);
      } else {
        toast.error("Unable to add item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="items-form-container"
      style={{ color: "black", height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-8 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                {/* صورة */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* الاسم */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Item Name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>

                {/* الفئة */}
                <div className="mb-3">
                  <label htmlFor="categoryId" className="form-label">Category</label>
                  <select
                    name="categoryId"
                    id="categoryId"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                    required
                  >
                    <option value="">--SELECT CATEGORY--</option>
                    {categories?.length > 0 ? (
                      categories.map((category, index) => (
                        <option
                          key={index}
                          value={category.categoryId || category.categoryid}
                        required
                        >
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </select>
                </div>

                {/* السعر */}
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="200.00"
                    onChange={onChangeHandler}
                    value={data.price}
                    required
                  />
                </div>

                {/* الوصف */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    rows="5"
                    name="description"
                    className="form-control"
                    id="description"
                    placeholder="Write content here.."
                    onChange={onChangeHandler}
                    value={data.description}
                    required
                  />
                </div>

                {/* زر الحفظ */}
                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsForm;
