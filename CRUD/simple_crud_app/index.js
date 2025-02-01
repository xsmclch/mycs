import express from "express";
import mongoose from "mongoose";
import { router as productRoute } from "./routes/product.route.js";

const app = new express();

// middleware
// json
app.use(express.json());
// urlencoded
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/api/products", productRoute);

mongoose.connect("mongodb+srv://<username>:<password>@backenddb.xymvi.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to database");
        app.listen(3000, () => {
            console.log("Server at port 3000");
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });


app.get("/", (req, res) => {
    console.log(`req.params = ${req.params}`);
    const queryParams = req.query;
    if (queryParams.shutdown != undefined && queryParams.shutdown === "1") {
        res.send("Server is shuting down");
        process.exit(0);
    }
    const params = Object.entries(queryParams);
    console.log(`req.query = ${queryParams}, len: ${params.length}`);

    // 遍历并输出键值对
    for (const [key, value] of params) {
        console.log(`Key: ${key}, Value: ${value}`);
    }
    res.send(`Hello from Node API.\nYou've passed ${params.length} param(s)`);

});