import express from "express";
import categoriesRoutes from "./routes/categories.routes.js";
import tasksRoutes from './routes/tasks.routes.js'
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(cors())
app.use('/api', categoriesRoutes)
app.use('/api', tasksRoutes)

app.listen(3500);
console.log("Server is running on port 3000");
