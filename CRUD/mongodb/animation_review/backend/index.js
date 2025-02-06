import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import DAO from "./dao/reviews.reviewDAO.js";
import app from "./server.js";
import "dotenv/config"

// const uri = "mongodb://192.168.10.45:27017";
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.atndp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

// TODO
// mongoose.connect(uri)
//     .catch(e => console.log("Failed to connect mongodb!", e.message))
//     .then(async (clt) => {
//         console.log("Successfully connected to mongodb!");
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is now listening on port ${process.env.PORT}...`)
//         })
//     });

client.connect()
    .catch(e => console.log("Failed to connect mongodb!", e.message))
    .then(async (clt) => {
        console.log("Successfully connected to mongodb!");
        await DAO.connectToReviews(clt);
        app.listen(process.env.PORT, () => {
            console.log(`Server is now listening on port ${process.env.PORT}...`)
        })
    });

