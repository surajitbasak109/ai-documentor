import express from "express";
import { authorization } from "../middlewares/authorization.js";
import {
  setErrorMessage,
  setInternalErrorMessage,
  setMessage,
} from "../utils/res.js";
import { pool } from "../db/db.js";

export const document = express.Router();

document.use(authorization);

// Insert new document
document.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;

    if (!title) {
      setErrorMessage(res, 422, "Title is required");
      return;
    }

    const documentInsertQuery = `INSERT INTO documents (title, content, created_at, updated_at, creator)
	VALUES ($1, $2, $3, $4, $5)`;
    const currentTime = new Date();
    await pool.query(documentInsertQuery, [
      title,
      content,
      currentTime,
      currentTime,
      id,
    ]);

    setMessage(res, "Document created");
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

// Get all documents
document.get("/", async (req, res) => {
  try {
    const { id } = req.user;
    const selectQuery = `SELECT * FROM documents where creator = $1`;
    const response = await pool.query(selectQuery, [id]);
    setMessage(res, null, { documents: response.rows });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

// search documents
document.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const { id } = req.user;

    if (!keyword) {
      setMessage(res, null, { results: [] });
	  return;
    }

    const searchQuery = `
		SELECT * FROM documents
		WHERE (creator = $1)
		and (title like $2 or content like $2)
	`;

    const searchString = `%${keyword}%`;
    const response = await pool.query(searchQuery, [id, searchString]);
    setMessage(res, null, { results: response.rows });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

// fetch single document
document.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const documentSelectOneQuery = `
		SELECT * FROM documents WHERE id = $1
	`;
    const response = await pool.query(documentSelectOneQuery, [id]);
    setMessage(res, null, { result: response.rows[0] });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

// delete document
document.delete("/:id", async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const documentDeleteQuery = `
		delete from documents where id = $1 and creator = $2
	`;
    await pool.query(documentDeleteQuery, [id, userId]);
    setMessage(res, "Document deleted");
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

// update document
document.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { title, content } = req.body;
    const documentUpdateQuery = `
		UPDATE documents set title = $1, content = $2, updated_at = $3
		WHERE id = $4 AND creator = $5
	`;
    const updated_at = new Date();
    await pool.query(documentUpdateQuery, [
      title,
      content,
      updated_at,
      id,
      userId,
    ]);
    setMessage(res, "Document updated");
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});
