import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';
import { addCategory } from '../../services/categoryService'; // <-- ضيف مكانه الصحيح

const CategoryForm = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [data, setData] = React.useState({
    name: "",
    description: "",
    bgColor: "#ffffff"
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      toast.error("Select image for category");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addCategory(formData);
      if (response.status === 201) {
        setCategories([...categories, response.data]);
        toast.success("Category created successfully");
        setData({
          name: "",
          description: "",
          bgColor: "#2c2c2c"
        });
        setImage(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-8 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
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

              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Enter category name"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>

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
                />
              </div>

              <div className="mb-3">
                <label htmlFor="bgColor" className="form-label">Background color</label>
                <br />
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  onChange={onChangeHandler}
                  value={data.bgColor}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning w-100"
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
