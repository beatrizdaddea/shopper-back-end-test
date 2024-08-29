import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { appConfig } from "./server/config/appConfig";
import { aiController } from "./server/controller/aiController";

const app = express();
app.use(
  cors({
    origin: appConfig.corsConfig.origin,
    methods: appConfig.corsConfig.methods,
    allowedHeaders: ["Content-Type", "application/json"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

// Get Gemini API Response
app.post("/water-gas-reading", aiController);

// App listening
app.listen(PORT, () => {
  console.log("API listening on port number", PORT);
});