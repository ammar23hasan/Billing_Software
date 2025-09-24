// 🟢 أولاً: كل الـ import في الأعلى
import './DisplayCategory.css';
import Category from '../Category/Category'; // ✅ المسار حسب مكان ملف Category.jsx
import { assets } from '../../assets/assets';

const DisplayCategory = ({ selectedCategory, setSelectedCategory, categories }) => {
  // ✅ نحسب مجموع كل الـ items مرّة وحدة
  const totalItems = categories.reduce((acc, cat) => acc + (cat.items || 0), 0);

  return (
    <div className="row g-3" style={{ width: '100%', margin: 0 }}>
      {/* 🟢 خيار All Items */}
      <div className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
        <Category
          categoryName="All Items"
          imgUrl={assets.device}
          numberOfItems={totalItems}
          bgColor="#6c757d"
          isSelected={selectedCategory === ""}
          onClick={() => setSelectedCategory("")}
        />
      </div>

      {/* 🟢 باقي الكاتيجوريز */}
      {categories.map((category) => (
        <div key={category.categoryid} className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
          <Category
            categoryName={category.name}
            imgUrl={category.img_url}
            numberOfItems={category.items}
            bgColor={category.bg_color}
            isSelected={selectedCategory === category.categoryid}
            onClick={() => setSelectedCategory(category.categoryid)}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayCategory;
