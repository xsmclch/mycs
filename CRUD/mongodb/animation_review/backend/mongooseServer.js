import express from "express";
import cors from "cors";
import router from "./router/mongoose.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    if (req.query.shutdown == "1") {
        res.send("<h1>Server is shuting down now</h1>");
        process.exit(0);
    }
    res.send("<h1>Success!</h1>");
})

app.use("/api/v1/reviews", router);

export default app;