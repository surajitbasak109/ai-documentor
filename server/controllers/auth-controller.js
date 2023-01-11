import express from "express";
import { pool } from "../db/db.js";
import { bcryptComparePassword, bcryptEncription } from "../utils/bcrypt.js";
import { jwtGenerator } from "../utils/jwt.js";
import { logError } from "../utils/log-error.js";
import { setErrorMessage } from "../utils/res.js";

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
    res.status(500).send({ error });
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

    const passwordIsCorrect = bcryptComparePassword(password, user.password);

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
    setErrorMessage(res, 500, "Something went wrong");
    console.log({ error });
    logError(error.toString());
  }
});
