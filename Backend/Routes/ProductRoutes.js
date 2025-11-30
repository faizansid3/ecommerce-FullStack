const express= require('express');
const { authenticateUser, authorizeRoles } = require('../Middlewares/AuthMiddleware');
const { addProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct } = require('../controllers/ProductController');
const router=express.Router();

router.post("/add",authenticateUser,authorizeRoles("admin"),addProduct);
router.put("/update/:id",authenticateUser,authorizeRoles("admin"),updateProduct);
router.delete("/delete/:id",authenticateUser,authorizeRoles("admin"),deleteProduct);


router.get("/all",getAllProducts);
router.get("/:id",getSingleProduct)

module.exports= router;