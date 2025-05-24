import { Router } from "express";
import upload from "../lib/multerConfig";
import { addImage, getImageById, getImages } from "../controllers/image";
import { checkToken } from "../middleware";

import dotenv from "dotenv";
dotenv.config();

const imageRouter = Router();
imageRouter.use(checkToken);

imageRouter.get("/", getImages);
imageRouter.post("/", upload.single("image"), addImage);
imageRouter.get("/:public_id", getImageById);

export default imageRouter;















































































