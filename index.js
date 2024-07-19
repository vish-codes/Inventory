import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/user.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// routes
app.use("/api/v1", router);

app.listen(PORT, () => console.log("server on!"));

export { JWT_SECRET };
