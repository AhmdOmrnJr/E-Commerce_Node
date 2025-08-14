import Joi from "joi";
import { generalFields } from "../../middlewares/validation.js";

export const createBrand = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    file: generalFields.file.optional(),
    // files: Joi.array(generalFields.file.required()).required(),
    subCategoryId: Joi.string().required()
}).required()