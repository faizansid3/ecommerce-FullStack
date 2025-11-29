const Order= require("../Models/Order")
const Cart= require("../Models/cart");
const Stripe= require("stripe")
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder= async(req,res)=>{
    try{
        const {userId,items,total,paymentIntentId}=req.body;

        if (!userId || !paymentIntentId || !items || typeof total !== "number") {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const pi= await stripe.paymentIntents.retrieve(paymentIntentId);
        if(!pi) {
          return res.status(400).json({ message: "PaymentIntent not found" });
        }
        
        const newOrder= new Order({
            userId,
            items,
            total,
            paymentIntentId,
            paymentStatus: pi.status
        })
        await newOrder.save();

        await Cart.findOneAndUpdate({ userId }, { items: [] }); //clear the users cart
        res.status(201).json({ message: "Order created", orderId: newOrder._id });
    }
    catch(error){
        console.error("createOrder error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}


const fetchOrders= async(req,res)=>{
    const {userId}=req.params;
    try{
        if(!userId){
            return res.status(400).json({message: "userId is required"})
        }
        const orders= await Order.find({userId}).sort({createdAt:-1});
        if(!orders){
            return res.status(404).json({message: "No orders found for this user"})
        }
        res.status(200).json({orders})
    }
    catch(error){
        console.error("fetchOrders error:", error);
        res.status(500).json({message: "Internal server error", error});
    }
}

module.exports={createOrder,fetchOrders};