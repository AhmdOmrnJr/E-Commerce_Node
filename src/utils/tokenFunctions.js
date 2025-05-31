import jwt from "jsonwebtoken";

export const generateToken = ({
  payload = {},
  secret = process.env.TOKEN_KEY,
  expiresIn = "1h", // or 3600 (seconds)
} = {}) => {
  if (!secret) throw new Error("Token secret is required");
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = ({
  token,
  secret = process.env.TOKEN_KEY,
} = {}) => {
  if (!token) return false;
  if (!secret) throw new Error("Token secret is required");

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return false;
  }
};
