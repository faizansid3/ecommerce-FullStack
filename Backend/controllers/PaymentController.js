const Stripe = require("stripe");
console.log("Stripe key loaded:", process.env.STRIPE_SECRET_KEY ? "✅ Yes" : "❌ No");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent= async(req,res)=>{
    try{
        const {amount}= req.body;
        const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,  // if amount = 100 → $1.00
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.status(200).json({clientSecret: paymentIntent.client_secret});
    }
    catch(error){
        res.status(500).json({ message: "Error creating payment intent", error });
    }
}
module.exports= {createPaymentIntent};