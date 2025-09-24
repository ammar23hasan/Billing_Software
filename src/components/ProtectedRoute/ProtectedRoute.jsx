import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { auth } = useContext(AppContext);

  // لو ما في مستخدم مسجل → رجعه على صفحة تسجيل الدخول
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  // لو في roles محددة والمستخدم مش من ضمنها → رجعه على الـ dashboard
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // السماح بالوصول
  return element;
};

export default ProtectedRoute;
