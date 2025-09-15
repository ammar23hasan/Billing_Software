import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';
import { addCategory } from '../../services/categoryService'; // <-- ضيف مكانه الصحيح

const CategoryForm = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#ffffff"
  });

  // تابع التغيير في الحقول
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // تابع إرسال البيانات
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // تحقق من وجود صورة
    if (!image) {
      toast.error("Select image for category");
      setLoading(false);
      return;
    }

    // إعداد البيانات لتجهيزها للإرسال
    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);

    try {
      const response = await addCategory(formData); // تأكد من أن دالة addCategory تُمثل الوظيفة المناسبة
      if (response.status === 201) {
        // تحديث القائمة
        setCategories([...categories, response.data]);
        toast.success("Category created successfully");

        // إعادة تعيين الحقول بعد نجاح الإرسال
        setData({
          name: "",
          description: "",
          bgColor: "#ffffff"
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
              {/* حقل الصورة */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="Category"
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

              {/* حقل الاسم */}
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
                  required
                />
              </div>

              {/* حقل الوصف */}
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

              {/* حقل لون الخلفية */}
              <div className="mb-3">
                <label htmlFor="bgColor" className="form-label">Background color</label>
                <input
                  type="color"
                  name="bgColor"
                  id="bgColor"
                  onChange={onChangeHandler}
                  value={data.bgColor}
                />
              </div>

              {/* زر الإرسال */}
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
