import { Router } from "express";

import { getDashboardMetrics } from "../controllers/dashboardControllers";

const router = Router();

router.get("/", getDashboardMetrics); //get request

export default router;
