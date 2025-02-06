import { Review } from "../models/reviews.model.js";

// TODO

export default class mongooseDAO {
    static async createReview(animID, user, review) {
        try {
            const reviewDoc = {
                animationID: animID,
                user,
                review
            }
            return await Review.create(reviewDoc);
        } catch (e) {
            console.error("Failed to post a review", e.message);
            return { error: e.message };
        }
    }
    // ... existing code ...

    static async readReviews(animID) {
        try {
            return await Review.find({ animationID: parseInt(animID) });
        } catch (e) {
            console.error("Failed to get reviews", e.message);
            return { error: e.message };
        }
    }

    static async updateReview(ID, user, review) {
        try {
            return await Review.findByIdAndUpdate(
                ID,
                { user, review },
                { new: true }
            );
        } catch (e) {
            console.error("Failed to update a review", e.message);
            return { error: e.message };
        }
    }

    static async deleteReview(ID) {
        try {
            return await Review.findByIdAndDelete(ID);
        } catch (e) {
            console.error("Fail to delete review", e.message);
            return { error: e.message };
        }
    }
}