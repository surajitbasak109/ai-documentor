import express from "express";
import { authorization } from "../middlewares/authorization.js";
import { documentService } from "../services/open-ai-service.js";
import { SERVICE_TYPES } from "../services/service-types.js";
import {
  setErrorMessage,
  setInternalErrorMessage,
  setMessage,
} from "../utils/res.js";

export const functionality = express.Router();

functionality.use(authorization);

functionality.post("/grammar-correction", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    setErrorMessage(res, 422, "Prompt is required");
    return;
  }

  try {
    const response = await documentService(
      SERVICE_TYPES.GRAMMAR_CORRECTION,
      prompt
    );
    setMessage(res, null, { results: response.data.choices[0].text });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

functionality.post("/keywords-extraction", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    setErrorMessage(res, 422, "Prompt is required");
    return;
  }

  try {
    const response = await documentService(SERVICE_TYPES.KEYWORDS, prompt);
    setMessage(res, null, { results: response.data.choices[0].text });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

functionality.post("/summarize", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    setErrorMessage(res, 422, "Prompt is required");
    return;
  }

  try {
    const response = await documentService(SERVICE_TYPES.SUMMARIZE, prompt);
    setMessage(res, null, { results: response.data.choices[0].text });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});

functionality.post("/essay-outline", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    setErrorMessage(res, 422, "Prompt is required");
    return;
  }

  try {
    const response = await documentService(SERVICE_TYPES.ESSAY_OUTLINE, prompt);
    setMessage(res, null, { results: response.data.choices[0].text });
  } catch (error) {
    setInternalErrorMessage(res, error);
  }
});
