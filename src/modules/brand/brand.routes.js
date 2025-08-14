import { Router } from "express";
import { allowedExtensions, fileUpload } from "../../utils/multer.js";
import { validation } from "../../middlewares/validation.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as controllers from "./brand.controller.js";
import * as validators from "./brand.validation.js";

const router = Router();

router.post(
  "/:subCategoryId",
  fileUpload(allowedExtensions.image).single("logo"),
  validation(validators.createBrand),
  asyncHandler(controllers.createBrand)
);

export default router;
