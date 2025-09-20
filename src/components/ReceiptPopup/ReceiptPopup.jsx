import './ReceiptPopup.css';
import './Print.css';
const ReceiptPopup = ({ orderDetails = {}, onClose, onPrint }) => {
  // نجيب العناصر من cartItems (أو array فاضية إذا ما في)
  const items = orderDetails.cartItems || [];

  return (
    <div className="receipt-popup-overlay text-dark">
      <div className="receipt-popup">
        <div className="text-center mb-4">
          <i className="bi bi-check-circle-fill text-success fs-1"></i>
        </div>

        <h3 className="text-center mb-4">Order Receipt</h3>

        <p>
          <strong>Order ID:</strong> {orderDetails.order_id}
        </p>
        <p>
          <strong>Name:</strong> {orderDetails.customer_name}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetails.phone_number}
        </p>

        <hr className="my-3" />

        <h5 className="mb-3">Items Ordered</h5>
        <div className="cart-items-scrollable">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="d-flex justify-content-between" key={index}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>

        <hr className="my-3" />

        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Subtotal</strong>
          </span>
          <span>${orderDetails.subtotal?.toFixed(2) || '0.00'}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span>
            <strong>Tax (1%)</strong>
          </span>
          <span>${orderDetails.tax?.toFixed(2) || '0.00'}</span>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <span>
            <strong>Grand Total</strong>
          </span>
          <span>${orderDetails.grand_total?.toFixed(2) || '0.00'}</span>
        </div>

        <p>
          <strong>Payment Method:</strong> {orderDetails.paymentMethod}
        </p>

        {orderDetails.paymentMethod === 'UPI' && (
          <>
            <p>
              <strong>Stripe Order ID:</strong> {orderDetails.stripeOrderId}
            </p>
            <p>
              <strong>Stripe Payment ID:</strong> {orderDetails.stripePaymentId}
            </p>
          </>
        )}

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button className="btn btn-warning" onClick={onPrint}>
            Print Receipt
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopup;
