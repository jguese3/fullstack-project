import express, { Express } from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Got response from backend!");
});

app.use("/movies", movieRoutes);

export default app;