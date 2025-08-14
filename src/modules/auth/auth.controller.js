import userModel from "../../../db/models/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";
import {
  verifyToken,
  generateToken,
} from "../../utils/GenerateAndVerifyToken.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { userName, email, password, gender, dateOfBirth } = req.body;

  const userCheck = await userModel.findOne({ email }).select("email");
  if (userCheck) {
    return next(new Error("email already exist", { cause: 409 }));
  }

  const newUser = new userModel({
    userName,
    email,
    password,
    gender,
    dateOfBirth,
  });

  const token = generateToken({
    payload: { _id: newUser._id, email: newUser.email },
  });
  if (!token) {
    return next(new Error("token generation failed", { cause: 400 }));
  }

  const confirmationLink = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}/auth/confirmLink/${token}`;
  const message = `<a href = ${confirmationLink}>Click To Confirm Email</a>`;
  const sent = await sendEmail({
    to: email,
    message,
    subject: "Email Confirmation",
  });
  if (!sent) {
    return next(new Error("Email Sending Failed", { cause: 400 }));
  }
  await newUser.save();
  res.status(201).json({ message: "signed up, please confirm your email" });
};

// ==================== confirm email =======================

export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const decodedToken = verifyToken({ payload: token });
  if (!decodedToken._id) {
    return next(new Error("token decoding failed", { cause: 400 }));
  }

  const user = await userModel.findById(decodedToken._id, "-_id isConfirmed");
  if (user.isConfirmed) {
    return res.status(200).json({ message: "already confirmed" });
  }

  const userUpdate = await userModel.updateOne(
    { _id: decodedToken._id },
    { isConfirmed: true }
  );
  if (!userUpdate.modifiedCount) {
    return next(new Error("Email Confirmation failed", { cause: 400 }));
  }

  res.status(200).json({ message: "done" });
};

// ======================== login =========================

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, isConfirmed: true });
  if (!user) {
    return next(new Error("invalid Email or Password", { cause: 400 }));
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(new Error("invalid Email or Password", { cause: 400 }));
  }
  const token = generateToken({
    payload: {
      _id: user._id,
      email: user.email,
      isLoggedIn: true,
    },
  });

  const loggedIn = await userModel.findOneAndUpdate(
    { _id: user._id },
    { isLoggedIn: true }
  );
  if (!loggedIn) {
    return next(new Error("invalid Email or Password", { cause: 500 }));
  }

  res.status(200).json({ message: "loggedIn Successfully", token });
};