import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET;

export const jwtGenerator = (payload) =>
  jwt.sign(payload, jwtSecretKey, { expiresIn: "24hr" });

export const verifyJWT = (accessToken) => jwt.verify(accessToken, jwtSecretKey);
