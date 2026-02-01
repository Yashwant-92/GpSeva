import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const amount = 499; // ₹499 registration fee

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1️⃣ Create order from backend
      const res = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      const order = await res.json();

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_xxxxxxxx", // 🔴 YOUR RAZORPAY KEY
        amount: order.amount,
        currency: "INR",
        name: "GPSEVA",
        description: "Gram Panchayat Registration Fee",
        order_id: order.orderId,

        handler: async function (response) {
          // 3️⃣ Save payment details to backend
          await fetch("http://localhost:8080/api/payment/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              amount: amount,
            }),
          });

          alert("पेमेंट यशस्वीरित्या पूर्ण झाले!");

          // ✅ REDIRECT TO HOME PAGE
          navigate("/home");
        },

        prefill: {
          name: "Gram Panchayat",
          email: "gpseva@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#16a34a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert("पेमेंट अयशस्वी झाले");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">पेमेंट</h1>
        <p className="mb-6 text-gray-600">
          वेबसाईट नोंदणी शुल्क: <b>₹{amount}</b>
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
