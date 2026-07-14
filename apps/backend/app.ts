import express, {Express} from "express";

// Routes imports
import allMoviesRoutes from "./src/api/v1/routes/allMoviesRoutes";


// initialize express application
const app: Express = express();


// allow express to parse json
app.use(express.json());

// mount routes
app.use("/api/v1", allMoviesRoutes);

// listen for requests on root and send simple text response
app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

export default app;