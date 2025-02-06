import mongoose from "mongoose";
import app from "./mongooseServer.js";
import "dotenv/config"

const uri = "mongodb://127.0.0.1:27017/test_db";
// const mongo_username = process.env.MONGO_USERNAME;
// const mongo_password = process.env.MONGO_PASSWORD;
// const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.atndp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
    .catch(e => console.log("Failed to connect mongodb!", e.message))
    .then(() => {
        console.log("Successfully connected to mongodb!");
        app.listen(process.env.PORT, () => {
            console.log(`Server is now listening on port ${process.env.PORT}...`)
        })
    });

