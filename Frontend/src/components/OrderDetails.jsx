import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state?.order;

  if (!order) {
    return (
      <div className="p-6">
        <p>No order data found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 p-1.5 rounded-2xl text-white border-none bg-blue-500  cursor-pointer"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-4">Order Details</h1>

      <div className="bg-white shadow-md p-5 rounded-lg">
        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Total Amount:</b> ${order.total.toFixed(2)}</p>
        <p><b>Payment Status:</b> {order.paymentStatus}</p>
        <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Items:</h2>

        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item._id} className="flex gap-4 bg-gray-50 p-4 rounded-md shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <p className="font-bold">{item.title}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
