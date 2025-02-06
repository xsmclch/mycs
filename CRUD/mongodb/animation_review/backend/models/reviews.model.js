import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        animationID: {
            type: Number,
            required: [true, "Please enter animation ID"],
        },

        user: {
            type: String,
            required: [true, "Please enter your name"],
        },

        review: {
            type: String,
            required: [true, "Please enter your review"],
        },
    },

    {
        timestamps: true,
    }
);

export const Review = mongoose.model("animation_reviews_mongoose", reviewSchema);