import express from "express";
import cors from "cors";

// database 
import { pool } from "./db/db.js";
import { schema } from "./db/schema.js";

// controllers
import { auth } from "./controllers/auth-controller.js";
import { document } from "./controllers/document-controller.js";
import { functionality } from "./controllers/functionality-controller.js";

const app = express();

// whole app level middlewares
app.use(cors());
app.use(express.json());

// auth controller
app.use("/auth", auth);

// document controller
app.use("/documents", document);

// functionality controller
app.use("/func", functionality);

app.listen(process.env.PORT || 3000, () => {
  pool.query(schema);
  console.log(`Listening on ${process.env.PORT || 3000}`);
});
