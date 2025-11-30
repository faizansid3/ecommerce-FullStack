const Product= require("../Models/Product")

const addProduct= async (req,res)=>{
    try{
        const {title,description,price,image,category}= req.body;
        const product= await Product.create({
            title,
            description,
            category,
            price,
            image
        });
        res.status(201).json({
            message:"Product added successfully",
            product,
        })
    }
    catch(error){
        res.status(500).json({ message: "Error adding product", error });
    }
}
const updateProduct= async(req,res)=>{
    try{
        const productId= req.params.id
        const updated= await Product.findByIdAndUpdate(productId,req.body,{new:true});

        res.status(200).json(updated)

    }
    catch(err){
        res.status(500).json({ message: "Error updating product", error });
    }
}

const deleteProduct= async(req,res)=>{
    try{
        const productId= req.params.id
        await Product.findByIdAndDelete(productId);
        res.status(200).json({message:"Product deleted successfully"});
    }
    catch(error){
        res.status(500).json({ message: "Error deleting product", error });
    }
}

const getAllProducts= async(req,res)=>{
    try{
        const products= await Product.find();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({ message: "Error fetching products", error });
    }
}

const getSingleProduct= async(req,res)=>{
    try{
        const productId= req.params.id;
        const product= await Product.findById(productId);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);

    }
    catch(error){
        res.status(500).json({ message: "Error fetching product", error });
    }
}
module.exports={ 
    addProduct,
    updateProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct
}