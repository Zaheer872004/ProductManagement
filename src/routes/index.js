import { Router } from "express";


const router = Router();

import v1ApiRoutes from "./v1/healthCheck.routes.js";
import v1UserApiRoutes from './v1/user.routes.js';
import v1ProductApiRoutes from './v1/product.routes.js'

router.use("/v1", v1ApiRoutes);

router.use("/v1/user", v1UserApiRoutes)

router.use("/v1/product", v1ProductApiRoutes)

export default router