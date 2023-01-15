import express from "express";
import { pool } from "../db/db.js";
import { bcryptComparePassword, bcryptEncription } from "../utils/bcrypt.js";
import { jwtGenerator } from "../utils/jwt.js";
import { logError } from "../utils/log-error.js";
import { setErrorMessage, setInternalErrorMessage } from "../utils/res.js";
import PasswordValidator from "password-validator";

const schema = new PasswordValidator();
schema
  .is()
  .min(8, "Password must have at least 8 characters")
  .is()
  .max(30, "Password must have maximum 30 characters")
  .has()
  .uppercase(1, "Password must have at least one uppercase letter")
  .has()
  .lowercase(1, "Password must have at least one lowercase letter")
  .has()
  .digits(1, "Password msut have at least one digit")
  .has()
  .not()
  .spaces()
  .has()
  .symbols();

export const auth = express.Router();

auth.post("/register", async (req, res) => {
  try {
    const { email, fullname, password } = req.body;

    if (!fullname) {
      setErrorMessage(res, 422, "Full name is required");
      return;
    }

    if (!email) {
      setErrorMessage(res, 422, "Email is required");
      return;
    }

    if (!password) {
      setErrorMessage(res, 422, "Password is required");
      return;
    }

    const validatePassword = schema.validate(password, { details: true });

    if (validatePassword.length > 0) {
      setErrorMessage(res, 422, "Weak password", { reason: validatePassword });
	  return;
    }

    const emailExistsQuery = `
		SELECT * from users where email = $1
	`;

    const userExists = await pool.query(emailExistsQuery, [email]);
    if (userExists.rows.length > 0) {
      setErrorMessage(res, 400, "Email already exists");
      return;
    }

    const hashedPassword = await bcryptEncription(password);
    const userInsertQuery = `INSERT INTO users (fullname, email, password)
	VALUES ($1, $2, $3) returning id`;

    const response = await pool.query(userInsertQuery, [
      fullname,
      email,
      hashedPassword,
    ]);
    const { id } = response.rows[0];

    const payload = {
      id,
      fullname,
      email,
    };

    const access_token = jwtGenerator(payload);
    res.send({
      access_token,
    });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

auth.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      setErrorMessage(res, 422, "Email is required");
      return;
    }

    if (!password) {
      setErrorMessage(res, 422, "Password is required");
      return;
    }

    const userExistsQuery = `SELECT * FROM users WHERE email = $1`;
    const userExists = await pool.query(userExistsQuery, [email]);

    if (!userExists.rows.length > 0) {
      setErrorMessage(res, 400, "Invalid email or password");
      return;
    }

    const user = userExists.rows[0];

    const passwordIsCorrect = await bcryptComparePassword(password, user.password);

    if (!passwordIsCorrect) {
      setErrorMessage(res, 400, "Invalid email or password");
      return;
    }

    const access_token = jwtGenerator({
      id: user.id,
      fullname: user.fullname,
      email,
    });

    res.send({
      access_token,
    });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});
