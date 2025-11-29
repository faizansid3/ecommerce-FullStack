// ✅ Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// ✅ Import routes AFTER dotenv is loaded
const AuthRouter = require("./Routes/AuthRouter");
const CartRouter = require("./Routes/CartRoutes");
const PaymentRoutes = require("./Routes/PaymentRoutes");
const OrderRoutes= require("./Routes/OrderRoutes")
const reviewRoutes= require("./Routes/reviewRoutes")

// ✅ Connect to database (now has access to .env vars)
require("./Models/db");

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Middleware setup

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(bodyParser.json());

// ✅ Routes
app.use("/auth", AuthRouter);
app.use("/cart", CartRouter);
app.use("/payment", PaymentRoutes);
app.use("/orders",OrderRoutes);
app.use("/reviews", reviewRoutes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Stripe key loaded: ${process.env.STRIPE_SECRET_KEY ? "✅ Yes" : "❌ No"}`);
});
