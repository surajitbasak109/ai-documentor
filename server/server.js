import express from "express";
import cors from "cors";
import { auth } from "./controllers/auth-controller.js";
import { pool } from "./db/db.js";
import { schema } from "./db/schema.js";

const app = express();

// whole app level middlewares
app.use(cors());
app.use(express.json());

// auth controller
app.use("/auth", auth);

app.listen(process.env.PORT || 3000, () => {
  pool.query(schema);
  console.log(`Listening on ${process.env.PORT || 3000}`);
});
