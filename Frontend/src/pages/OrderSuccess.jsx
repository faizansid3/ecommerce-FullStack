import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const location= useLocation();
    const {orderId}= location.state || {};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Order placed successfully!</h2>
        {orderId && <p className="mb-4">Order ID: <b>{orderId}</b></p>}
        <Link className="text-blue-600" to="/home">Continue shopping</Link>
      </div>
    </div>
  )
}

export default OrderSuccess
