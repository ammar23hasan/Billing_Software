import './ManageUsers.css';
import UsersList from '../../components/UsersList/UsersList.jsx';
import UsersForm from '../../components/UsersForm/UsersForm.jsx';

const ManageUsers = () => {
    return (
      <div className="Users-container text-light">
        <div className="left-column">
          <UsersForm />
        </div>
        <div className="right-column">
          <UsersList />
        </div>
      </div>
    )
}
export default ManageUsers;