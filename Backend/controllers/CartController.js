const Cart = require("../Models/cart");

const getCart= async(req,res)=>{
    try{
        const userId= req.params.userId;
        const cart= await Cart.findOne({userId})

        if(!cart){
            return res.status(200).json({items: []})
        }
        res.status(200).json(cart)

    }
    catch(error){
        res.status(500).json({ message: "Error fetching cart", error });
    }
}
const addToCart= async(req,res)=>{
    try{
         const {userId,productId, title,price,image}= req.body;
         let cart= await Cart.findOne({userId})
         if(!cart){
            cart= new Cart({
                userId,
                items: [{productId, title,price,image, quantity:1}],
            })
         }
         else{
            const existingItem= cart.items.find((item)=> item.productId===productId)
            if(existingItem){
                existingItem.quantity+=1
            }
            else{
                cart.items.push({productId, title, price, image, quantity: 1})
            }
         }
         await cart.save();
         res.status(200).json(cart);
    }
    catch(error){
        res.status(500).json({ message: "Error adding to cart", error });
    }
};
const updateCartItem= async(req,res)=>{ 
    try{
        const {userId, productId, action}= req.body;
        const cart= await Cart.findOne({userId});

        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }
        const item= cart.items.find((item)=> item.productId== productId);
        if(!item){
            return res.status(404).json({ message: "Item not found" });
        }
        if (action === "increase") item.quantity += 1;
        if (action === "decrease" ) {
            if(item.quantity > 1)
            item.quantity -= 1;
            else{
                cart.items = cart.items.filter(i => i.productId !== productId);
            }
        }

        await cart.save();
        res.status(200).json(cart);
    }
    catch(error){
        return res.status(500).json({message : "error updating",error});
    }
}
const removeCartItem= async(req,res)=>{
    try{
        const {userId,productId}=req.body;
        const cart= await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = cart.items.filter((item) => item.productId !== productId);

        await cart.save();
        res.status(200).json(cart);
    }
    catch(error){
        res.status(500).json({ message: "Error removing cart item", error });
    }
}

module.exports= {addToCart,getCart,updateCartItem,removeCartItem}