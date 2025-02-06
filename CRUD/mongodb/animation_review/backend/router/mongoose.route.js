import Controller from "../controller/mongoose.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    if (req.query.shutdown == "1") {
        res.send("<h1>Server is shuting down now</h1>");
        process.exit(0);
    }
    res.send("Welcome to the backend api root!");
})


router.get("/animation/:animationID", Controller.getController);
router.post("/animation/new", Controller.postController);
router.route("/:id")
    .put(Controller.putController)
    .delete(Controller.deleteController);

export default router;
