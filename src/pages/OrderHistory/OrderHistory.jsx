import { useEffect, useState } from 'react';
import './OrderHistory.css';
import { latestOrders } from '../../services/OrderService';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatItems = (items = []) => {
    return items.map((item) => `${item.name} x ${item.quantity}`).join(", ");
  };

  if (loading) {
    return <div className="text-center py-4 text-light">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-history-container">
        <h2 className="mb-2 text-light">All Orders</h2>
        <p className="text-muted">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="orders-history-container">
      <h2 className="mb-2">All Orders</h2>
      <div className="table-responsive">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.order_id || index}>
                <td>{order.order_id}</td>
                <td>
                  {order.customer_name}
                  <br />
                  <small className="text-muted">{order.phone_number}</small>
                </td>
                <td>{formatItems(order.items)}</td>
                <td>${order.grand_total}</td>
                <td>{order.payment_method}</td>
                <td>
                  <span
                    className={`status-badge ${
                      order.payment_details?.status === "COMPLETED"
                        ? "completed"
                        : "pending"
                    }`}
                  >
                    {order.payment_details?.status || "PENDING"}
                  </span>
                </td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
