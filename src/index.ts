import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { appConfig } from "./server/config/appConfig";
import { aiController } from "./server/controller/aiController";
import { validateRequestBody } from "./server/middleware/validation";

const app = express();

app.use(cors(appConfig.corsConfig));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Define the endpoint with validation middleware
app.post("/water-gas-reading", validateRequestBody, aiController);

// App listening
app.listen(PORT, () => {
  console.log("API listening on port number", PORT);
});
