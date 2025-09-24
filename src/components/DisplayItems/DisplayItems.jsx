import { useContext, useState } from 'react';
import './DisplayItems.css';
import { AppContext } from '../../context/AppContext';
import Item from '../Item/Item';
import SearchBox from '../SearchBox/SearchBox';

const DisplayItems = ({ selectedCategory }) => {
  const { itemsData } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const filteredItems = itemsData
    .filter(item => {
      if (!selectedCategory || selectedCategory === "") return true; // عرض كل العناصر إذا لم يتم اختيار فئة
      return item.categoryid === selectedCategory; // قارن مباشرة بالـ ID
    })
    .filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div className="p-3">
      <div className="d-flex justify-content-end align-items-center mb-4">
        <div style={{ width: "100%" }}>
          <SearchBox onSearch={setSearchText} />
        </div>
      </div>

      <div className="row g-3">
        {filteredItems.map((item, index) => (
          <div key={item.itemId || index} className="col-md-4 col-sm-6">
            <Item
              itemName={item.name}
              itemPrice={item.price}
              itemImage={item.img_url}
              itemId={item.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
