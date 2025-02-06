import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";
import "dotenv/config"

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.atndp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 3000;

MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    console.log("successfully connected to mongodb...")
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
