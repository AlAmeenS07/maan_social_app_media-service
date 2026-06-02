import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/app.middleware";
import imageRouter from "./routes/image.routes";
import { metricsMiddleware } from "./middlewares/metrics.middleware";
import register from "./config/prom.client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// app.use(cors());
app.use(express.json());

app.use(metricsMiddleware)

app.get("/", (req, res) => {
  res.send("Media Service Running...");
});

app.use(process.env.API_IMAGE_ROUTE as string || "/api/v1/image", imageRouter);

app.get(process.env.API_METRICS_ROUTE as string, async (_req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});


app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Media Service running on http://localhost:${PORT}`);
});