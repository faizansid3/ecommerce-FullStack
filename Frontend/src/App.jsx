import { Route, Routes } from "react-router-dom";
import OrderDetails from "./components/OrderDetails";
import Cart from "./pages/Cart";
import Home from "./pages/home";
import Login from "./pages/login";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment"; // ✅ Import Payment page
import Profile from "./pages/Profile";
import Signup from "./pages/signup";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
