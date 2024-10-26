import { Router } from "express";


const router = Router();

import v1ApiRoutes from "./v1/healthCheck.routes.js";
import v1UserApiRoutes from './v1/user.routes.js';


router.use("/v1", v1ApiRoutes);

router.use("/v1/user", v1UserApiRoutes)

export default router