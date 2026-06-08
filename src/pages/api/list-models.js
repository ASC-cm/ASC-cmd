import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    console.log("Listing available models...");

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "API key not configured",
        message: "Add GEMINI_API_KEY to your .env.local file",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // List available models
    const modelList = await genAI.listModels();

    console.log("Available models:", modelList);

    const availableModels = modelList.models.map((model) => ({
      name: model.name,
      displayName: model.displayName,
      description: model.description,
      supportedGenerationMethods: model.supportedGenerationMethods,
    }));

    return res.status(200).json({
      success: true,
      models: availableModels,
      totalModels: availableModels.length,
      apiKeyPreview: process.env.GEMINI_API_KEY.substring(0, 10) + "...",
    });
  } catch (error) {
    console.error("Error listing models:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      errorDetails: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }
}
