import { MongoClient } from "mongodb";
import fs from "fs";

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connectAndTest(db_name, col_name, new_collection_name) {
    try {
        await client.connect();
        console.log("Successfully connected to local MongoDB");

        // 创建或者切换到database  
        const db = client.db(db_name);

        // 集合改名
        if (new_collection_name !== undefined) {
            await db.collection(col_name).rename(new_collection_name);
            col_name = new_collection_name;
        }

        // 创建或者切换到collection
        const collection = db.collection(col_name);

        // 1. 创建唯一索引（如果已存在则忽略）
        await collection.createIndex({ Tester: 1 }, { unique: true });

        // insert
        // const newone = await collection.insertOne({ Tester: "CZUi", xp: ["yandere", "loli"] });
        // console.log("Successfully inserted!", newone);
        // const rawData = await fs.promises.readFile("data.json", "utf-8");
        // const newData = JSON.parse(rawData);
        // const insertData = await collection.insertMany(newData);
        // console.log("Succefully inserted", insertData);

        // update
        const update = await collection.updateOne({ Tester: "azusa" }, { $set: { ref: "animation" } });
        if (!update) {
            console.log("Cannot update...");
        } else if (update.modifiedCount) {
            console.log("Successfully update", update);
        } else {
            console.log("Nothing changed...");
        }

        await collection.updateMany({ ref: "animate" }, { $set: { ref: "animation" } });

        // find
        const result = await collection.findOne({ Tester: "CZUi" });
        if (result) {
            console.log("Successfully find", result);
        } else {
            console.log("Cannot find...");
        }

        // ListAll
        const all = collection.find();
        for await (const doc of all) {
            console.log(doc);
        }

        // findloli
        const lolis = collection.find({
            height: { $lt: 145 }
        })
        console.log("Here are characters with lolis' height");
        for await (const loli of lolis) {
            console.log(loli);
        }

        // findAnimateCharacters
        // const ani_chars = collection.find({
        //     $or:
        //         [
        //             { ref: "animate" },
        //             { ref: { $exists: false } }
        //         ]
        // });
        const ani_chars = collection.find({
            ref: "animation"
        });
        console.log("Here are characters from animation");
        for await (const ani_char of ani_chars) {
            console.log(ani_char);
        }

    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

connectAndTest("test_db", "simple_local_connect").catch(console.error);