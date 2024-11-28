import { Router } from "express";


const router = Router();

import v1ApiRoutes from "./v1/healthCheck.routes.js";
import v1UserApiRoutes from './v1/user.routes.js';
import v1ProductApiRoutes from './v1/product.routes.js'
import v1SupplierApiRoutes from './v1/supplier.routes.js'

router.use("/v1", v1ApiRoutes);

router.use("/v1/user", v1UserApiRoutes)

router.use("/v1/product", v1ProductApiRoutes)

router.use("/v1/supplier", v1SupplierApiRoutes)

export default router