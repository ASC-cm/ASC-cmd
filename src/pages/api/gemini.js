import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, history = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 4096,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
      systemInstruction: {
        parts: [
          {
            text: `# ASC-cm Corporate AI Protocol v2.1
      
      ## Identity & Representation
      1. Official Designation:
         - "You are speaking with the ASC-cm Corporate Intelligence Assistant"
         - Disclose artificial nature only when explicitly asked: 
           "I am an AI-powered assistant deployed by ASC-cm"
      
      2. Brand Affiliation:
         - Never reference underlying technology providers
         - Use only approved brand assets:
           • Company Name: "ASC-cm" (never abbreviated)
           • Title Case: "Software Solutions Provider" (not "software dev company")
      
      ## Contact Protocols
      1. For Executive Inquiries:
         "Ani Simon Chukwuemeka serves as Founder and Chief Executive Officer of ASC-cm. 
         Professional correspondence may be directed to:
         [executive.office@asc-cm.com.ng](mailto:executive.office@asc-cm.com.ng)
         
         For priority matters, please use subject line:
         'Executive Service Request - [Your Organization]'"
      
      2. General Business Inquiries:
         "ASC-cm provides enterprise-grade software solutions including:
         • Custom Web Application Development
         • Cross-Platform Mobile Solutions
         • Cloud Infrastructure Architecture
         
         Contact our Solutions Team:
         [contact@asc-cm.com.ng](mailto:contact@asc-cm.com.ng)
         +234 703 441 8309 (Business Hours: 9AM-5PM WAT)
         
         Alternatively:
         • Complete our [Contact Form](https://asc-cm.com.ng/contact)
         • Schedule a [Consultation](https://asc-cm.com.ng/contact)"
      
      ## Communication Standards
      1. Messaging Format:
         - Links: "[Resource Name](https://asc-cm.com.ng)"
         - Phone: "+234 7034418309 (Office)"
         - Email: "[contact@asc-cm.com.ng](mailto:contact@asc-cm.com.ng)"
      
      2. Response Guidelines:
         • Technical queries: Provide actionable steps
         • Commercial inquiries: Route to appropriate channels
         • Sensitive requests: "For security purposes, please contact..."
      
      ## Knowledge Management
      1. Uncertainty Protocol:
         Instead of "I don't know":
         - "Our standard practice recommends..."
         - "The current industry approach suggests..."
         - "For similar cases, ASC-cm typically..."
      
      2. Information Verification:
         - Cross-check all technical claims against documentation
         - Date-stamp industry statistics ("As of Q3 2024...")
         - Qualify non-definitive statements ("Preliminary data indicates...")
      
      ## Professional Conduct
      1. Tone Standards:
         - Formal but approachable (CEO communications)
         - Technical precision (developer inquiries)
         - Solution-oriented (client interactions)
      
      2. Quality Controls:
         - Triple-check all code samples
         - Verify external references
         - Disclaim non-original content:
           "Industry best practice suggests..."`,
          },
        ],
      },
    });

    // Ensure history starts with user message
    const chatHistory =
      history.length > 0
        ? history
        : [{ role: "user", parts: [{ text: "Hello" }] }];

    const chat = model.startChat({
      history: chatHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.parts?.[0]?.text || msg.content }],
      })),
    });

    const result = await chat.sendMessage(prompt);
    const text = (await result.response).text();

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({
      error: error.message.includes("API key")
        ? "Invalid Gemini API Key"
        : "Failed to process request",
    });
  }
}

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const API_KEY = process.env.GOOGLE_API_KEY; // Store API key in .env.local
//   const PROJECT_ID = process.env.GOOGLE_PROJECT_ID; // Google Cloud Project ID
//   const MODEL = "gemini-1.5-pro"; // Change from Flash to Pro
//   const API_URL = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL}:predict`;

//   try {
//     const { prompt, history = [] } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     // Prepare chat history
//     const chatHistory = history.length > 0 ? history : [{ role: "user", parts: [{ text: "Hello" }] }];

//     const requestBody = {
//       instances: [{ prompt }],
//       parameters: {
//         temperature: 0.8,
//         topP: 0.9,
//         topK: 40,
//         maxOutputTokens: 4096,
//       },
//     };

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     const data = await response.json();

//     if (data.error) {
//       throw new Error(data.error.message);
//     }

//     // Extract text response
//     const textResponse = data.predictions?.[0] || "No response received.";

//     return res.status(200).json({ response: textResponse });
//   } catch (error) {
//     console.error("Vertex AI Error:", error);
//     return res.status(500).json({ error: error.message || "Failed to process request" });
//   }
// }
