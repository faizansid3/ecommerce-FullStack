const Review = require("../Models/Review.js");

// Add a review
const AddReview = async (req, res) => {
  try {
    const { userId, productId, username, rating, comment } = req.body;

    if (!userId || !productId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({
      userId,
      productId,
      username,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews for a product
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit review
const editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment } = req.body;

    const updated = await Review.findByIdAndUpdate(
      reviewId,
      { comment },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error editing review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { AddReview, getReviews, editReview, deleteReview };
