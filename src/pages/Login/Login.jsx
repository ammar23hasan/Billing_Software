import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import './Login.css';
import { AppContext } from '../../context/AppContext';
import { login } from '../../services/AuthService'; // تأكد من مسار import الصحيح

const Login = () => {
  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;  
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(data);

      if (response.status === 200) {
        const token = response.data.token;
        const role = response.data.role;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        setAuthData(token, role); // ✅ استخدم التوكن والدور الصحيح
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Email or password invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
      <div className="card shadow-lg w-100" style={{ maxWidth: '480px' }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title">Sign in</h1>
            <p className="card-text text-muted">Sign in below to access your account</p>
          </div>
          <div className="mt-4">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">Email address</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="yourname@example.com"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="***********"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.password}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>
                  {loading ? "Loading..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
