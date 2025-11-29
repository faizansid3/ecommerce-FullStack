const express= require('express');
const {addToCart,getCart, updateCartItem, removeCartItem}= require("../controllers/CartController");
const router= express.Router();

router.get("/:userId",getCart)
router.post("/add",addToCart)
router.put("/update",updateCartItem)
router.delete("/remove",removeCartItem)

module.exports= router;