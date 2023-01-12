import { verifyJWT } from "../utils/jwt.js";
import { logError } from "../utils/log-error.js";
import { setErrorMessage } from "../utils/res.js";

export const authorization = (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
      setErrorMessage(res, 401, "Invalid token with no header");
      return;
    }

    const slices = authorizationHeader.split(" ");
    if (slices.length < 2) {
      setErrorMessage(res, 401, "Invalid token with invalid length");
      return;
    }

    const [prefix, accessToken] = slices;
    if (prefix != "Bearer") {
      setErrorMessage(res, 401, "Invalid token with incorrect prefix");
      return;
    }

    const payload = verifyJWT(accessToken);
    if (!payload) {
      setErrorMessage(res, 401, "Invalid token");
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    setErrorMessage(res, 500, "Something went wrong, please try again.");
    console.log({ error });
    logError(error.toString());
  }
};
