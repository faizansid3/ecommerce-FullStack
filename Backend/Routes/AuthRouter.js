const { signup, login } = require('../controllers/AuthController')
const { signupValidation, loginValidation } = require('../Middlewares/Validation')

const router=require('express').Router()

router.post('/login',login)
router.post('/signup',signup)


module.exports= router