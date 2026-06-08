import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== API CALL STARTED ===");
    console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
    console.log(
      "API Key first chars:",
      process.env.GEMINI_API_KEY?.substring(0, 10) + "...",
    );

    const { prompt, history = [] } = req.body;
    console.log("Prompt received:", prompt);
    console.log("History length:", history.length);

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY is not configured");
      return res.status(500).json({
        response: "Configuration error: API key missing.",
        success: false,
      });
    }

    // Initialize model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    // Create a more specific system prompt
    const systemPrompt = `You are a helpful assistant for ASC-cm (Ani Simon Chukwuemeka - Creative Mind), a software development company.

Company Details:
- Founder & CEO: Ani Simon Chukwuemeka
- Contact Email: contact@asc-cm.com.ng (general), executive.office@asc-cm.com.ng (executive)
- Phone: +234 703 441 8309
- Website: https://asc-cm.com.ng
- Location: Nigeria (exact office address not specified on website)
- Business Hours: 9:00 AM - 6:00 PM WAT (Weekdays)

Services:
1. Custom Web Applications
2. Mobile Solutions (iOS, Android)
3. Cloud Architecture (AWS, Azure, GCP)
4. API Integration
5. Digital Transformation
6. Technical Consulting

Portfolio includes projects in:
- Financial Technology
- Healthcare Systems
- E-commerce Platforms
- Education Technology
- Logistics & Supply Chain

Pricing: Custom quotes based on project requirements.

You should answer questions about the company, its services, team, and offerings. If you don't know something specific, say so honestly but suggest contacting the company directly for detailed information.

Important: Respond conversationally and helpfully.`;

    // Start chat with history
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
      history: [
        {
          role: "user",
          parts: [{ text: "Who are you?" }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I am the ASC-cm Corporate Intelligence Assistant, here to help you learn about ASC-cm's software development services and company information.",
            },
          ],
        },
        ...history.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      ],
      systemInstruction: systemPrompt,
    });

    console.log("Sending request to Gemini API...");

    // Send message
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(
      "✅ Gemini API Response received:",
      text.substring(0, 100) + "...",
    );

    return res.status(200).json({
      response: text,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Gemini API Error Details:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Check for specific error types
    if (
      error.message.includes("API key") ||
      error.message.includes("authentication")
    ) {
      console.error("🔑 Authentication issue - check your API key");
      return res.status(401).json({
        response:
          "Authentication error with AI service. Please contact ASC-cm directly at contact@asc-cm.com.ng",
        success: false,
        error: "API authentication failed",
      });
    } else if (
      error.message.includes("quota") ||
      error.message.includes("resource exhausted")
    ) {
      console.error("💰 API quota exceeded");
      return res.status(429).json({
        response:
          "AI service is temporarily unavailable due to high demand. Please contact ASC-cm directly:\n• Email: contact@asc-cm.com.ng\n• Phone: +234 703 441 8309",
        success: false,
        error: "API quota exceeded",
      });
    } else if (
      error.message.includes("network") ||
      error.message.includes("fetch")
    ) {
      console.error("🌐 Network error");
      return res.status(503).json({
        response:
          "Network connectivity issue. Please check your internet connection or contact ASC-cm directly.",
        success: false,
        error: "Network error",
      });
    }

    // Generic error
    return res.status(500).json({
      response:
        "I apologize, but I'm experiencing technical difficulties. For immediate assistance, please contact ASC-cm directly:\n• Email: contact@asc-cm.com.ng\n• Phone: +234 703 441 8309\n• Website: https://asc-cm.com.ng",
      success: false,
      error: error.message,
    });
  }
}
