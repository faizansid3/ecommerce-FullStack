const express = require("express");
const router = express.Router();
const {AddReview, getReviews, editReview, deleteReview}= require("../controllers/ReviewController")

router.post("/addReview", AddReview);
router.get("/getReviews/:productId", getReviews);
router.put("/editReview/:reviewId",editReview)
router.delete("/deleteReview/:reviewId",deleteReview)

module.exports = router;