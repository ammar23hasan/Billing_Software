import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addUser } from '../../services/UserService';  // تأكد من المسار الصحيح

const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await addUser(data);  // استخدم الدالة المستوردة
    setUsers((prevUsers) => [...prevUsers, response.data]);
    toast.success("User Added");
    setData({
      name: "",
      email: "",
      password: "",
      role: "ROLE_USER"
    });
  } catch (e) {
    console.error(e);
    toast.error("Error adding user");
  } finally {
    setLoading(false);
  }
};

const UsersForm = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER"
  });

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // استبدل `AudioScheduledSourceNode` بالدالة الصحيحة مثل `addUser`
      const response = await addUser(data);  // مثلا `addUser` تكون الدالة
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success("User Added");
      setData({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER"
      });
    } catch (e) {
      console.error(e);
      toast.error("Error adding user");
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
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Jhon Doe"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="yourname@example.com"
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="*********"
                  onChange={onChangeHandler}
                  value={data.password}
                />
              </div>
              <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                {loading ? "Loading..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersForm;
