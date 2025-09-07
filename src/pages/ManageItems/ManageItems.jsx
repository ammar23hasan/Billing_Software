import './ManageItems.css';
import ItemsForm from '../../components/ItemsForm/ItemsForm.jsx';
import ItemsList from '../../components/ItemsList/ItemsList.jsx';

const ManageItems = () => {
    return (
      <div className="Items-container text-light">
        <div className="left-column">
          <ItemsForm />
        </div>
        <div className="right-column">
          <ItemsList />
        </div>
      </div>
    )
}
export default ManageItems;