import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path"
import { fileURLToPath } from "url";
import { userRouter } from "./routes/userRoutes.js";
import { recipesRouter } from "./routes/recipeRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect("mongodb://localhost:27017/Recipe");

app.listen(3001, () => console.log("Server started"));
