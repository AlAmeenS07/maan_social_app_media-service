import { Router } from "express";
import { ImageService } from "../services/image.service";
import { ImageController } from "../controllers/image.controller";

const router = Router();

const imageService = new ImageService()
const imageController = new ImageController(imageService)

router.post("/upload-url", imageController.generateUploadUrl);

router.get("/view-url", imageController.generateViewUrl);

export default router;