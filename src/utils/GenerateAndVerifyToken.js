import jwt from "jsonwebtoken";

export const generateToken = ({
  payload = {},
  signature = process.env.TOKEN_KEY,
  expiresIn = "1hour",
} = {}) => {
  const token = jwt.sign(payload, signature, { expiresIn });
  return token;
};

export const verifyToken = ({
  payload = "",
  signature = process.env.TOKEN_KEY,
}) => {
  if (!payload) {
    return false;
  }
  const decodedToken = jwt.verify(payload, signature);
  return decodedToken;
};
