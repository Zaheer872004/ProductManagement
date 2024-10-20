import { Router } from "express";


const router = Router();

import v1ApiRoutes from "./v1/healthCheck.routes.js";

router.use("/v1", v1ApiRoutes);

export default router