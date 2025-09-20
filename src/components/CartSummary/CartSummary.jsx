import { useContext, useState } from 'react';
import './CartSummary.css';
import { AppContext } from '../../context/AppContext';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';
import { createOrder, deleteOrder } from '../../services/OrderService';
import toast from 'react-hot-toast';
import { createStripeOrder, verifyPayment } from '../../services/PaymentService';
import { AppConstants } from "../../util/constants";
import snakeCaseKeys from 'snakecase-keys'; // npm install snakecase-keys

const CartSummary = ({ customerName, mobileNumber, setMobileNumber, setCustomerName }) => {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalAmount * 0.01;
  const grand_total = totalAmount + tax;

  const loadStripeScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (order_id) => {
    try {
      await deleteOrder(order_id);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  // =======================
  // 🔹 completePayment محدثة
  // =======================
  const completePayment = async (paymentMode) => {
    paymentMode = (paymentMode || '').toLowerCase();

    if (!customerName || !mobileNumber) {
      toast.error('Please enter customer details');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subtotal: totalAmount,
      tax,
      grand_total,
      paymentMethod: paymentMode.toUpperCase(),
    };

    const orderDataSnakeCase = snakeCaseKeys(orderData, { deep: true });

    setIsProcessing(true);

    try {
      const response = await createOrder(orderDataSnakeCase);

      if (response.status !== 201) throw new Error('Failed to create order');

      setOrderDetails(response.data);

      if (paymentMode === 'cash') {
        toast.success('Cash received');
        return;
      }

      // ========================
      // الدفع عبر Stripe داخل الصفحة
      // ========================
      const stripeLoaded = await loadStripeScript();
      if (!stripeLoaded || !window.Stripe) {
        toast.error('Unable to load Stripe');
        await deleteOrderOnFailure(response.data.order_id);
        return;
      }

      // طلب إنشاء Stripe Order على السيرفر
      const stripeResponse = await createStripeOrder({
        amount: grand_total,
        currency: 'INR',
        order_id: response.data.order_id,
      });

      console.log("Stripe Response:", stripeResponse.data);

      // استخدم client_secret الصحيح
      const clientSecret = stripeResponse.data.client_secret;
      if (!clientSecret) {
        throw new Error('Stripe clientSecret missing');
      }

      const stripe = window.Stripe(AppConstants.STRIPE.API.KEY);

      // إنشاء عنصر الدفع باستخدام clientSecret
      const elements = stripe.elements({ clientSecret });
      const paymentElement = elements.create('payment', { layout: 'tabs' });
      paymentElement.mount('#stripe-payment-element');

      const handlePayment = async () => {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: { return_url: window.location.href },
        });

        if (error) {
          console.error(error);
          toast.error(`Payment failed: ${error.message}`);
          await deleteOrderOnFailure(response.data.order_id);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          toast.success('Payment successful');
          setOrderDetails({ ...response.data, paymentDetails: paymentIntent });
        }
      };

      const payButton = document.getElementById('stripe-pay-button');
      if (payButton) payButton.onclick = handlePayment;

    } catch (error) {
      console.error('Complete Payment Error:', error);
      toast.error(`Payment processing failed: ${error.message || error}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      stripeOrderId: response.stripe_order_id,
      stripePaymentId: response.stripe_payment_id,
      stripeSignature: response.stripe_signature,
      order_id: savedOrder.order_id,
    };

    try {
      const paymentResponse = await verifyPayment(paymentData);
      if (paymentResponse.status === 200) {
        toast.success('Payment successful');
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            stripeOrderId: response.stripe_order_id,
            stripePaymentId: response.stripe_payment_id,
            stripeSignature: response.stripe_signature,
          },
        });
      } else toast.error('Payment processing failed');
    } catch (error) {
      console.error(error);
      toast.error('Payment failed');
    }
  };

  const clearAll = () => {
    setCustomerName('');
    setMobileNumber('');
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => window.print();

  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text light">Item:</span>
          <span className="text-light">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text light">Tax (1%):</span>
          <span className="text-light">${tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span className="text light">Total:</span>
          <span className="text-light">${grand_total.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => completePayment('cash')}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Cash'}
        </button>
        <button
          className="btn btn-primary flex-grow-1"
          onClick={() => completePayment('upi')}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'UPI'}
        </button>
      </div>

      <div className="d-flex gap-3 mt-3">
        <button
          className="btn btn-warning flex-grow-1"
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}
        >
          Place Order
        </button>
      </div>

      {/* 🔹 Payment Section */}
      <div className="payment-card mt-4 p-3">
        <h6 className="text-light mb-3">💳 Card Payment</h6>
        <div id="stripe-payment-element" className="payment-element"></div>
        <button 
          id="stripe-pay-button" 
          className="btn btn-primary w-100 mt-3"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {showPopup && (
        <ReceiptPopup 
          orderDetails={{
            ...orderDetails,
            stripeOrderId: orderDetails.paymentDetails?.stripeOrderId,
            stripePaymentId: orderDetails.paymentDetails?.stripePaymentId,
          }} 
          onClose={() => setShowPopup(false)}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
};

export default CartSummary;
