const mongoose= require('mongoose');

const orderItemSchema= mongoose.Schema({
    productId: String,
    title: String,
    price: Number,
    quantity: Number,
    image : String
})

const orderSchema= mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    total: {type: Number, required: true},
    paymentIntentId: { type: String, required: true, unique: true },
    paymentStatus: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

module.exports= mongoose.model("Order",orderSchema);