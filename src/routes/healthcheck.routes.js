import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";

const router = new Router();

router.route('/api/v1/healthcheck').get(healthCheck)
// router.get('/api/v1/healthcheck', healthCheck);

export default router;