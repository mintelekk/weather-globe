import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import forecastRoute from "./routes/forecast.route";
import { refreshForecast } from "./services/forecast.service";

refreshForecast(); // Run once on startup

setInterval(() => {
  refreshForecast();
}, 15 * 60 * 1000); // every 15 minutes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/forecast", forecastRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
