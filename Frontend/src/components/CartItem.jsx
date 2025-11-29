import { useDispatch } from "react-redux";
import {
  removeCartItemBackend,
  updateCartItemBackend
} from "../redux/slices/cartSlice";


const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const user= JSON.parse(localStorage.getItem("user"));
  const userId= user?._id;

  const handleIncrease = (e) => {
     e.preventDefault();
     dispatch(updateCartItemBackend({ userId, productId: item.productId, action: "increase" }));
  }
  const handleDecrease = (e) => {
     e.preventDefault();
    dispatch(updateCartItemBackend({ userId, productId: item.productId, action: "decrease" }));
  };
  const handleRemove = (e) => {
     e.preventDefault();
    dispatch(removeCartItemBackend({ userId, productId: item.productId }));
  };

  return (
    <div className="flex items-center justify-between border p-3 rounded-md shadow-sm mb-3">
      <div className="flex items-center gap-3">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          cursor="pointer"
          type="button"
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer" 
          onClick={handleDecrease}
        >−</button>
        <span>{item.quantity}</span>
        <button 
          cursor="pointer"
          type="button"
          className="px-2 py-1 bg-gray-200 rounded cursor-pointer"  
          onClick={handleIncrease}
        >+</button>
      </div>

      <div className="flex items-center gap-2">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <button  
          type="button"
          className="text-red-500 cursor-pointer" 
          onClick={handleRemove}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;
