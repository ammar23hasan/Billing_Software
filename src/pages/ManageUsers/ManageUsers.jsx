import './ManageUsers.css';
import UsersList from '../../components/UsersList/UsersList.jsx';
import UsersForm from '../../components/UsersForm/UsersForm.jsx';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/UserService.js'; // تأكد من إضافة هذا الاستيراد بشكل صحيح
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsersData() {  // تعديل اسم الدالة من loadhUsers إلى fetchUsersData
      try {
        setLoading(true);
        const response = await fetchUsers(); // تأكد من أن الفنكشن موجود في UserService
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsersData(); // تم استدعاء الدالة
  }, []); // إضافة dependancy array ليتم استدعاء الدالة مرة واحدة بعد التحميل

  return (
    <div className="Users-container text-light">
      <div className="left-column">
        <UsersForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UsersList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
