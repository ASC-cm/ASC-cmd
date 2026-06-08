import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    console.log("Testing Gemini API with multiple model attempts...");

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "API key not found",
        instructions: "Add GEMINI_API_KEY=your_key_here to .env.local",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const testPrompt = "Hello, what is 2+2?";

    // Try different model names
    const modelAttempts = [
      "gemini-1.0-pro",
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-1.0-pro-001",
      "models/gemini-pro",
    ];

    const results = [];

    for (const modelName of modelAttempts) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(testPrompt);
        const response = await result.response;
        const text = response.text();

        results.push({
          model: modelName,
          success: true,
          response: text,
        });

        console.log(`✅ ${modelName}: Success`);

        // Stop on first success
        break;
      } catch (modelError) {
        results.push({
          model: modelName,
          success: false,
          error: modelError.message,
        });
        console.log(`❌ ${modelName}: ${modelError.message}`);
      }
    }

    const successfulModel = results.find((r) => r.success);

    if (successfulModel) {
      return res.status(200).json({
        success: true,
        workingModel: successfulModel.model,
        response: successfulModel.response,
        allAttempts: results,
        apiKeyLength: process.env.GEMINI_API_KEY.length,
        apiKeyFirstChars: process.env.GEMINI_API_KEY.substring(0, 10),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "No model worked. Try updating @google/generative-ai package.",
        allAttempts: results,
        suggestions: [
          "Update package: npm install @google/generative-ai@latest",
          "Check API key validity",
          "Enable Generative Language API in Google Cloud Console",
        ],
      });
    }
  } catch (error) {
    console.error("Test failed completely:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      errorType: error.constructor.name,
      stack: error.stack,
    });
  }
}
