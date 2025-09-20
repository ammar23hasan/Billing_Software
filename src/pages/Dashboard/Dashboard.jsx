import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchDashboardData } from "../../services/Dashboard";
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData();
        setData(response); // response.data عادة في Axios يكون داخل data
      } catch (error) {
        console.error(error);
        toast.error("Unable to view the data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="dashboard-error">Failed to load the dashboard data...</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p>${data.today_sales != null ? data.today_sales.toFixed(2) : "0.00"}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.today_order_count ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <i className="bi bi-clock-history"></i>
            Recent Orders
          </h3>

          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_orders?.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id?.substring(0, 8) ?? "-"}</td>
                    <td>{order.customer_name ?? "-"}</td>
                    <td>{order.grand_total != null ? order.grand_total.toFixed(2) : "0.00"}</td>
                    <td>
                      <span className={`payment-method ${order.payment_method?.toLowerCase() ?? ""}`}>
                        {order.payment_method ?? "-"}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${order.payment_details?.status?.toLowerCase() ?? ""}`}>
                        {order.payment_details?.status ?? "-"}
                      </span>
                    </td>
                    <td>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
