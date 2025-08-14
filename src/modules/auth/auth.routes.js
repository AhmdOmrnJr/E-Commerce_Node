import { Router } from "express";
import { validation } from "../../middlewares/validation.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import * as validationSchemas from './auth.validation.js'
import * as controllers from './auth.controller.js';

const router = Router();

router.post('/signup', validation(validationSchemas.signUpSchema), asyncHandler(controllers.signUp))
router.get('/confirmLink/:token', validation(validationSchemas.confirmEmailSchema), asyncHandler(controllers.confirmEmail))
router.post('/login', validation(validationSchemas.logInSchema), asyncHandler(controllers.logIn))

export default router;