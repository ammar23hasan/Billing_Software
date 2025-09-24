import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Menubar from "./components/Menubar/Menubar.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ManageCategory from './pages/ManageCategory/ManageCategory.jsx';
import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
import ManageItems from './pages/ManageItems/ManageItems.jsx';
import Explore from './pages/Explore/Explore.jsx';
import Login from "./pages/Login/Login.jsx";

import { Toaster } from 'react-hot-toast';
import OrderHistory from './pages/OrderHistory/OrderHistory.jsx';
import { useContext } from 'react';
import { AppContext } from './context/AppContext.jsx';

// تأكد أن الملف موجود وتصدّر ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

const App = () => {
  const location = useLocation();
  const { auth } = useContext(AppContext);

  // مكوّن لتقييد الوصول إلى صفحة تسجيل الدخول للمستخدمين المسجلين.
  // إذا كان المستخدم مسجل (auth.token) → نوجّهه لصفحة dashboard.
  const LoadingRoute = ({ element }) => {
    if (auth?.token) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };

  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}
      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/explore" element={<Explore />} />

        {/* Admin only routes */}
        <Route
          path="/categories"
          element={<ProtectedRoute element={<ManageCategory />} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/users"
          element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ADMIN']} />}
        />
        <Route
          path="/items"
          element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ADMIN']} />}
        />

        <Route path="/login" element={<LoadingRoute element={<Login />} />} />

        {/* طلبات - هنا نستخدم ProtectedRoute لأن الوصول يحتاج تسجيل دخول */}
        <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} />} />

        {/* الجذر → عادةً يمكن تحويله لصفحة محمية أو إعادة توجيه */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
         <Route path="*" element={<NotFound/>} />

      </Routes>
    </div>
  );
};

export default App;
