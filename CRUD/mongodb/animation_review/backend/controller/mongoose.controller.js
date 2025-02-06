import DAO from "../dao/mongooseDAO.js";

export default class Controller {
    static async postController(req, res) {
        try {
            const animID = req.body.animationID;
            const user = req.body.user;
            const review = req.body.review;
            const reviewDoc = await DAO.createReview(animID, user, review);
            res.status(201).json(reviewDoc);
            console.log("Successfully post a review...");
        } catch (e) {
            console.error("Failed to post a review!", e.message);
            res.status(500).json({ error: e.message });
        }
    }
    static async getController(req, res) {
        try {
            const animID = req.params.animationID;
            const reviews = await DAO.readReviews(animID);
            if (!reviews) {
                res.status(404).json({ error: "Not Found" });
                return;
            }
            res.status(200).json(reviews);
        } catch (e) {
            console.error("getController error!", e.message);
            res.status(500).json({ error: e.message });
        }
    }
    static async putController(req, res) {
        try {
            const id = req.params.id;
            const user = req.body.user;
            const review = req.body.review;
            const result = await DAO.updateReview(id, user, review);
            res.status(201).json(result);
        } catch (e) {
            console.error("Failed to update!", e.message);
            res.status(500).json({ error: e.message });
        }
    }
    static async deleteController(req, res) {
        try {
            const id = req.params.id;
            const result = await DAO.deleteReview(id);
            res.status(200).json(result);
            console.log("Successfully deleted a review");
        } catch (e) {
            console.error("Failed to delete a review", e.message);
            res.status(500).json({ error: e.message });
        }
    }
}
