import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { appConfig } from "./server/config/appConfig";
import sequelize from './server/config/database';
import routes from "./server/router/router";

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

// Use the router
app.use("/", routes);

// App listening
app.listen(PORT, () => {
  console.log("API listening on port number", PORT);
});
