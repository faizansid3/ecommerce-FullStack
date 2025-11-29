const express=require("express");
const { createOrder ,fetchOrders} = require("../controllers/OrderController");

const router= express.Router();

router.post("/create",createOrder)
router.get("/user/:userId",fetchOrders)
module.exports= router;