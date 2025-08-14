import joi from "joi";
import { generalFields } from "../../middlewares/validation.js";

export const signUpSchema = {
  body: joi.object().required().keys({
    userName: generalFields.userName,
    email: generalFields.email,
    password: generalFields.password,
    cpassword: generalFields.cpassword,
    gender: joi.string().required(),
    dateOfBirth: joi.string().optional(),
    phone: joi.number().optional(),
  }),
};

export const confirmEmailSchema = {
  params: joi.object().required().keys({
    token: joi.string().required(),
  }),
};

export const logInSchema = {
  body: joi.object().required().keys({
      email: generalFields.email,
      password: generalFields.password,
    }),
};
