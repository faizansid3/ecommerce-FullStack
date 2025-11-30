const { signup, login } = require('../controllers/AuthController')
const { authenticateUser, authorizeRoles } = require('../Middlewares/AuthMiddleware')
const { signupValidation, loginValidation } = require('../Middlewares/Validation')


const router=require('express').Router()

router.post('/login',login)
router.post('/signup',signup)


router.get(
    "/admin-only",
    authenticateUser,
    authorizeRoles("admin"),
    (req,res)=>{
        res.json({ message: "Admin content access granted." });
    }
)
router.get(
  "/delivery-only",
  authenticateUser,
  authorizeRoles("delivery"),
  (req, res) => {
    res.json({ message: "Delivery partner access granted." });
  }
);

module.exports= router