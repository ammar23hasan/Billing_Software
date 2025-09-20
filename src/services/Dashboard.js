import axios from "axios";

export const fetchDashboardData = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/v1.0/dashboard",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data; // ✅ بيرجع البيانات فقط
};
