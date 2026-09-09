

const express = require("express");
const router = express.Router({ mergeParams:true }); // Sabse important line
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Post Review Route
router.post("/", 
    isLoggedIn, 
    validateReview, 
    wrapAsync(reviewController.createReview) 
);

// Delete Review Route
router.delete("/:reviewId", 
    isLoggedIn, 
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;