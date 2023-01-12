import { openai } from "../utils/open-ai-config.js";
import { SERVICE_TYPES } from "./service-types.js";

const adjustMetaParameters = (type, metaparameters) => {
  switch (type) {
    case SERVICE_TYPES.GRAMMAR_CORRECTION:
      return { ...metaparameters, top_p: 1.0, max_tokens: 60 };
    case SERVICE_TYPES.KEYWORDS:
      return {
        ...metaparameters,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
      };
    case SERVICE_TYPES.SUMMARIZE:
      return {
        ...metaparameters,
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1.0,
      };
    case SERVICE_TYPES.ESSAY_OUTLINE:
      return {
        ...metaparameters,
        temperature: 0.3,
        max_tokens: 150,
        top_p: 1.0,
      };
    default:
      return metaparameters;
  }
};

const defaultMetaParameters = {
  temperature: 0,
  max_tokens: 0,
  top_p: 0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
};

export const documentService = async (type, prompt) => {
  const metaparameters = adjustMetaParameters(type, defaultMetaParameters);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${type} ${prompt}`,
      ...metaparameters,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
