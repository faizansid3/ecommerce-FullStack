import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { clearCartLocal, fetchCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { items, loading, error } = useSelector((state) => state.cart);

  // ✅ Step 1: Get userId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id; // change to user.id if your backend sends that

  // ✅ Step 2: Fetch cart when component mounts
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  },[dispatch, userId]);

  // ✅ Step 3: Handle loading & error states
  if (loading) return <p className="p-6 text-gray-500">Loading your cart...</p>;
  if (error) {
  const errorMsg =
    typeof error === "string"
      ? error
      : error?.message || JSON.stringify(error);

  return <p className="p-6 text-red-500">Error: {errorMsg}</p>;
}
  // ✅ Step 4: Calculate total
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleProceedToPay=()=>{
    if(total>0){
      navigate("/payment", {state: {total}});
    }
    else{
      alert("Your cart is empty");
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleProceedToPay}
            >
              Proceed To Pay
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => dispatch(clearCartLocal())}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
