import { Router } from "express";
import { getForecastSnapshot } from "../services/forecast.service";

const router = Router();

router.get("/", (req, res) => {
  res.json(getForecastSnapshot());
});

export default router;
