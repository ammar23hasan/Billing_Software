import axios from "axios";

export const createStripeOrder = async (data) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/payments/create-order",
    data, // ← هون الbody الحقيقي (amount, currency)
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const verifyPayment = async (paymentData) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/payment/verify",
    paymentData, // ← body
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
};
