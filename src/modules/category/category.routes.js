import { Router } from "express";
import { allowedExtensions, fileUpload } from "../../utils/multer.js";
import * as controllers from "./category.controller.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./category.validation.js";
import { validation } from "../../middlewares/validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";

const router = Router();
router.use("/:categoryId/subCategory", subCategoryRouter);
router.post(
  "/",
  fileUpload(allowedExtensions.image).single("image"),
  validation(validators.createCategory),
  asyncHandler(controllers.createCategory)
);
router.put(
  "/:categoryId",
  fileUpload(allowedExtensions.image).single("image"),
  validation(validators.updateCategory),
  asyncHandler(controllers.updateCategory)
);
router.get("/", asyncHandler(controllers.getAllCategories));

export default router;
