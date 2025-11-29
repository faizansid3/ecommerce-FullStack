import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import Navbar from '../components/Navbar';
import { addToCartBackend } from "../redux/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const [editingReview, setEditingReview] = useState(null);
  const [editText, setEditText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Load product details
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  // Load reviews
  useEffect(() => {
    fetch(`http://localhost:8000/reviews/getReviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Error fetching reviews:", err));
  }, [id]);


  // Add to cart
  const handleAddToCart = () => {
    if (!user?._id) return alert("Please login first");

    dispatch(addToCartBackend({ userId: user._id, product }))
      .unwrap()
      .then(() => toast.success("Added to cart!"))
      .catch(() => toast.error("Failed to add item"));
  };


  // Submit Review
  const handleReviewSubmit = () => {
    if (!user) return alert("Please login first");
    if (newReview.trim() === "") return alert("Review cannot be empty");

    const reviewData = {
      userId: user._id,
      productId: id,
      username: user.name,
      rating,
      comment: newReview
    };

    fetch("http://localhost:8000/reviews/addReview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(data => {
        setReviews(prev => [data, ...prev]);
        setNewReview("");
        setRating(5);
      })
      .catch(err => console.error("Error posting review:", err));
  };


  // Start editing
  const startEdit = (review) => {
    setEditingReview(review._id);
    setEditText(review.comment);
  };

  // Save edited review
  const saveEdit = (reviewId) => {
    fetch(`http://localhost:8000/reviews/editReview/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: editText })
    })
      .then(res => res.json())
      .then(updated => {
        setReviews(reviews.map(r => (r._id === reviewId ? updated : r)));
        setEditingReview(null);
      })
      .catch(err => console.error("Error editing review:", err));
  };


  // Delete review
  const deleteReview = (reviewId) => {
    if (!window.confirm("Delete review?")) return;

    fetch(`http://localhost:8000/reviews/deleteReview/${reviewId}`, {
      method: "DELETE"
    })
      .then(() => {
        setReviews(reviews.filter(r => r._id !== reviewId));
      })
      .catch(err => console.error("Error deleting review:", err));
  };


  if (!product) return <p className="text-center mt-10">Loading...</p>;


  return (
    <>
      <Navbar />

      {/* Product Section */}
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-amber-50 p-6 rounded shadow">
          <img src={product.image} className="w-full h-[400px] object-contain" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-green-600 mt-2">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <button
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-8 pb-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {/* Write New Review */}
        <div className="bg-slate-50 border p-4 rounded shadow mb-6">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border p-2 rounded mb-3"
          />

          <div className="flex items-center gap-3 mb-3">
            <span className="font-medium">Rating:</span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map(r => (
                <option key={r} value={r}>{r} ⭐</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleReviewSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Post Review
          </button>
        </div>

        {/* Display Reviews */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map(review => (
              <div key={review._id} className="border p-4 rounded shadow-sm">

                {/* Username + Rating */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{review.username}</p>
                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                {/* Comment OR Edit Box */}
                {editingReview === review._id ? (
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border p-2 rounded mt-2"
                  />
                ) : (
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                )}

                {/* Edit / Save / Delete Buttons */}
                {user?._id === review.userId && (
                  <div className="flex gap-4 mt-3">

                    {editingReview === review._id ? (
                      <>
                        <button
                          className="text-green-600"
                          onClick={() => saveEdit(review._id)}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600"
                          onClick={() => setEditingReview(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600"
                          onClick={() => startEdit(review)}
                        >
                          Edit
                        </button>

                        <button
                          className="text-red-600"
                          onClick={() => deleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}

                  </div>
                )}

              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
