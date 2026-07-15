import express, {Express} from "express";
import cors from "cors";

// Routes imports
import allMoviesRoutes from "./src/api/v1/routes/allMoviesRoutes";


// initialize express application
const app: Express = express();


// enable CORS for frontend requests
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// allow express to parse json
app.use(express.json());

// mount routes
app.use("/api/v1", allMoviesRoutes);

// listen for requests on root and send simple text response
app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

export default app;