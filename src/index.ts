import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { appConfig } from "./server/config/appConfig";
import { aiController } from "./server/controller/aiController";
import { listReadingsController } from "./server/controller/listReadingsController";
/* import { confirmReadingController } from "./server/controller/patchReadingController"; */
import { validateRequestBody } from "./server/middleware/validation";

import sequelize from './server/config/database';

const app = express();

app.use(cors(appConfig.corsConfig));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((error) => {
  console.error('Error synchronizing the database:', error);
});

// Define the endpoint with validation middleware
app.post("/water-gas-reading", validateRequestBody, aiController);
app.get("/:customer_code/list", listReadingsController);
/* app.patch("/water-gas-reading/confirm", confirmReadingController); */

// App listening
app.listen(PORT, () => {
  console.log("API listening on port number", PORT);
});
