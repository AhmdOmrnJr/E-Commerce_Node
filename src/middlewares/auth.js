import userModel from "../../DB/models/user.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { verifyToken } from "../utils/tokenFunctions.js";

export const auth = () => {
  return asyncHandler(authFunction);
};

const authFunction = async (req, res, next) => {
  const { token } = req.headers;
  // console.log(token)
  if (!token) {
    return next(new Error("Please Login", { cause: "401" }));
  }
  //   if (!token.startsWith("Bearer ")) {
  //     return next(new Error("Wrong Prefix", { cause: "401" }));
  //   }

    // const tokenWithoutPrefix = token.split("Bearer ")[1];
    // const decodedToken = tokenDecode({ payload: tokenWithoutPrefix });
    // if (!decodedToken._id) {
    //   return next(new Error("Failed to decode Token", { cause: "400" }));
    // }

  const decodedToken = verifyToken({ token });
  if (!decodedToken._id) {
    return next(new Error("Failed to decode Token", { cause: "400" }));
  }

  const user = await userModel.findById(decodedToken._id, "-password");
  if (!user) {
    return next(new Error("Failed to retrieve User", { cause: "404" }));
  }

  req.user = user;

  next();
};
