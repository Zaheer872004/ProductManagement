import { Router } from "express";

const router = Router();    

import { healthCheckController } from "../../controller/index.js"


router.route("/health-check").get(healthCheckController)

export default router