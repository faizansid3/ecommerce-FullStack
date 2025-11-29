import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (activeTab === "history") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8000/orders/user/${user._id}`
      );

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex w-full mt-6">

        {/* LEFT SIDEBAR */}
        <div className="w-1/4 bg-white shadow-md p-5 h-screen">
          <h2 className="text-xl font-bold mb-6">Profile</h2>

          <ul className="space-y-4">
            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === "details" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("details")}
            >
              User Details
            </li>

            <li
              className={`cursor-pointer p-2 rounded-md ${
                activeTab === "history" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Order History
            </li>
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-3/4 p-6">

          {/* --- USER DETAILS TAB --- */}
          {activeTab === "details" && (
            <div>
              <h1 className="text-2xl font-bold">Hello, {user?.name}</h1>
              <p className="mt-2 text-gray-600">Email: {user?.email}</p>
              <p className="mt-2 text-gray-600">User ID: {user?._id}</p>
            </div>
          )}

          {/* --- ORDER HISTORY TAB --- */}
          {activeTab === "history" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Order History</h1>

              {loading ? (
                <p className="text-gray-500">Loading your orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order._id}
                      className="p-4 bg-white rounded-md shadow border"
                    >
                      <p><b>Order ID:</b> {order._id}</p>
                      <p><b>Total:</b> ${order.total.toFixed(2)}</p>
                      <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>

                      <button
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() =>
                          navigate(`/order-details/${order._id}`, {
                            state: { order }
                          })
                        }
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
