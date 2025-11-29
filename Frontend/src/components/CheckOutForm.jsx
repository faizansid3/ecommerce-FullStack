import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartLocal } from "../redux/slices/cartSlice";

const CheckOutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateOrderOnServer=async(paymentIntentId)=>{
    try{
      const storedUser= JSON.parse(localStorage.getItem("user"));
      const userId= storedUser?._id;

      const payload={
        userId,
        paymentIntentId,
        items: cartItems,
        total,
      }
      const res= await fetch("http://localhost:8000/orders/create",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      })
      const data= await res.json();

      return {ok: res.ok,data}
    }
    catch(error){
      console.error("createOrder error", err);
      return { ok: false, data: err };
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ send the real total
      const res = await fetch("http://localhost:8000/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();
      if (!data.clientSecret) throw new Error("Failed to get client secret");

      // ✅ confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) setMessage(result.error.message);
      else if (result.paymentIntent.status === "succeeded")
        setMessage("✅ Payment successful!");

      const paymentIntent= result.paymentIntent;
      if(paymentIntent && paymentIntent.status==="succeeded"){
        const {ok,data}= await handleCreateOrderOnServer(paymentIntent.id);

      if(!ok){
          setMessage("Payment succeeded but order saving failed.");
          console.error("Order save failed", data);
          setLoading(false);
          return;
      }
      setMessage("✅ Payment and order successful!");
      dispatch(clearCartLocal()); //clear cart after successful order
      navigate("/order-success", { state: { orderId: data.orderId } });
    }
    else{
      setMessage("Payment failed.");
    }

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-3 mb-4 rounded-md" />
      <button
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default CheckOutForm;
