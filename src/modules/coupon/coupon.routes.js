import { Router } from "express";
import * as controllers from './coupon.controller.js'
import { asyncHandler } from "../../utils/errorHandling.js";

const router = Router()

router.post('/', asyncHandler(controllers.createCoupon))

export default router;