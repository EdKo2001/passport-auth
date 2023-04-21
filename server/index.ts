import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import passport from "passport";

import { authRoutes } from "./src/routes/api";

import { connectDB } from "./src/config";

import { accessLogger, errorLogger } from "./src/utils";

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(compression());
app.use(accessLogger);

app.use(passport.initialize());
// app.use(passport.session());
import "./src/config/passport";

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });
});

// Error handling middleware
app.use(errorLogger);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
