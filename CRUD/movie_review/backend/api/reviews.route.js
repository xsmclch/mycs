import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.get("/movie/:id", ReviewsCtrl.apiGetReviews);
router.post("/new", ReviewsCtrl.apiPostReview);
router
  .route("/:id")
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
