import Joi from "joi";
import { generalFields } from "../../middlewares/validation.js";

export const createSubCategory = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    file: generalFields.file.required(),
    // files: Joi.array(generalFields.file.required()).required(),
}).required()

export const updateSubCategory = Joi.object({
    subCategoryId: Joi.string().required(),
    name: Joi.string().min(4).max(20).optional(),
    file: generalFields.file.optional(),
    // files: Joi.array(generalFields.file.required()).required(),
}).required()

