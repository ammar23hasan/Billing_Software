// 🟢 أولاً: كل الـ import في الأعلى
import './DisplayCategory.css';
import Category from '../Category/Category'; // ✅ المسار حسب مكان ملف Category.jsx

const DisplayCategory = ({ selectedCategory,setSelectedCategory,categories }) => {
    return (
        <div className="row g-3" style={{ width: '100%', margin: 0 }}>
            {categories.map(category => (
                <div key={category.categoryid} className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
                    <Category
                        categoryName={category.name}
                        imgUrl={category.img_url}
                        numberOfItems={category.items}
                        bgColor={category.bg_color}
                        isSelected={selectedCategory===category.categoryid}
                        onClick={()=>setSelectedCategory(category.categoryid)}
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayCategory;
