import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckOutForm";

// ✅ Load your publishable key

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_URL);

const Payment = () => {
  const location= useLocation();
  const total= location.state?.total || 0;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-center">Complete Your Payment</h2>
        <p className="text-center mb-4 text-gray-700">Amount to Pay: <b>${total.toFixed(2)}</b></p>

        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} /> {/* ✅ pass total to CheckoutForm */}
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
