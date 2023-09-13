import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { router } from "./routes";

dotenv.config({path : "../.env"});

const port = Number(process.env.PORT) || 2000;
const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(router);

httpServer.listen(port, "localhost", () => console.log("API running"));