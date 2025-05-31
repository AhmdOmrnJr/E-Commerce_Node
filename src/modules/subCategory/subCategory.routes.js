import { Router } from "express";
import { allowedExtensions, fileUpload } from "../../utils/multer.js";
import * as controllers from "./subCategory.controller.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validators from "./subCategory.validation.js";
import { validation } from "../../middlewares/validation.js";

const router = Router({ mergeParams: true });

router.post('/', fileUpload(allowedExtensions.image).single('image'), asyncHandler(controllers.createSubCategory))
router.put('/:subCategoryId', fileUpload(allowedExtensions.image).single('image'), validation(validators.updateSubCategory), asyncHandler(controllers.updateSubCategory))
// router.post('/', 
//   fileUpload(allowedExtensions.image).single('image'),
//   (req, res, next) => {
//     console.log('Multer processed file:', req.file);
//     next();
//   },
//   asyncHandler(controllers.createSubCategory)
// )

export default router;
