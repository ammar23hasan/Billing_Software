import './ManageUsers.css';
import UsersList from '../../components/UsersList/UsersList.jsx';
import UsersForm from '../../components/UsersForm/UsersForm.jsx';
import { fetchUsers } from "../../services/UserService.js"; // تأكد من الاسم الصحيح
import toast from "react-hot-toast";

import { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers(); // ✅ هنا كان الغلط
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []); // ✅ لازم تحط ديبندنسي أريه فاضية

  return (
    <div className="Users-container text-light">
      <div className="left-column">
        <UsersForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UsersList users={users} setUsers={setUsers} />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
