import { ObjectId } from "mongodb";

let reviews;

export default class DAO {
    static async connectToReviews(client) {
        if (reviews) {
            return;
        } else {
            // local
            // reviews = await client.db("test_db").collection("animation_reviews");
            // cloud
            reviews = await client.db("reviews").collection("animation_reviews");
        }
    }
    static async createReview(animID, user, review) {
        try {
            const reviewDoc = {
                animationID: animID,
                user,
                review
            }
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error("Failed to post a review", e.message);
            return { error: e.message };
        }
    }
    static async readReviews(animID) {
        try {
            const cursor = reviews.find({ animationID: parseInt(animID) });
            return await cursor.toArray();
        } catch (e) {
            console.error("Failed to get reviews", e.message);
            return { error: e.message };
        }
    }
    static async updateReview(ID, user, review) {
        try {
            // 忽略即可，因为ID为String，这里识别为了Number
            return await reviews.updateOne({ _id: new ObjectId(ID) }, {
                $set:
                    { user: user, review: review }
            })
        } catch (e) {
            console.error("Failed to update a review", e.message);
            return { error: e.message };
        }
    }
    static async deleteReview(ID) {
        try {
            // 忽略即可，因为ID为String，这里识别为了Number
            return await reviews.deleteOne({ _id: new ObjectId(ID) });
        } catch (e) {
            console.error("Fail to delete review", e.message);
            return { error: e.message };
        }
    }
}