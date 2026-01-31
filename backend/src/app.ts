import express from "express";
import { connectDB } from "./utils/db";

const app = express();
app.use(express.json());

connectDB();

app.get("/", (_req, res) => {
    res.json({status: "OK"});
});


export default app;