import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCartBackend } from "../redux/slices/cartSlice";

const  ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const handleAddToCart = ()=>{ 
      const user= JSON.parse(localStorage.getItem("user"));
      const userId= user?._id;

      if(!userId){
        alert("Please log in to add items to your cart.");
        return;
      }
      
      dispatch(addToCartBackend({userId,product}))
        .unwrap()
        .then(() => toast.success("Added to cart!"))
        .catch((err) => toast.error("Error adding to cart"));
    }
  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
    onClick={()=> navigate(`/product/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-contain mb-4"
      />
      <h3 className="text-sm font-semibold mb-2 text-center">{product.title}</h3>
      <p className="font-bold mb-2">${product.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
