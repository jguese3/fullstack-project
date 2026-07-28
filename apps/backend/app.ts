import express, { Express } from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes";
import allMoviesRoutes from "./src/api/v1/routes/allMoviesRoutes";
import { clerkMiddleware } from "@clerk/express";

const app: Express = express();

// enable CORS for frontend requests
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// add clerk middleware
app.use(clerkMiddleware());

// allow express to parse json
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Got response from backend!");
});

app.use("/movies", movieRoutes);
app.use("/api/v1", allMoviesRoutes);

export default app;
