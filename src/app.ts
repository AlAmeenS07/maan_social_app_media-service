import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/app.middleware";
import imageRouter from "./routes/image.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Media Service Running...");
});

app.use("/api/v1/image", imageRouter);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Media Service running on http://localhost:${PORT}`);
});