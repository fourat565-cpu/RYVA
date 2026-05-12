import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getFashionRecommendation(userProfile: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are the RYVA AI Stylist. RYVA is a luxury fashion brand fusing Streetwear, Old Money, and Sportswear.
    Slogan: "RULE THE AURA".
    
    User Profile:
    - Vibe/Preference: ${userProfile.vibe || "Streetwear"}
    - Height: ${userProfile.height || "Not specified"}
    - Weight: ${userProfile.weight || "Not specified"}
    - Body Type/Build: ${userProfile.body || "Not specified"}
    - Skin Tone: ${userProfile.skin || "Not specified"}
    - Eye Color: ${userProfile.eye || "Not specified"}
    - Hair Color: ${userProfile.hair || "Not specified"}
    
    Based on this profile, provide:
    1. A personalized style analysis (The "Aura Assessment").
    2. Recommended RYVA collection (Streetwear, Old Money, or Sportswear).
    3. Key clothing combinations from the collection.
    4. Color palette advice based on their features.
    
    Format the response in Markdown. Use a clear, luxury-toned, and sophisticated voice.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Stylist Error:", error);
    return "## THE AURA IS CLOUDED\n\nThe AI Stylist is currently unavailable. Please rule your aura manually by exploring our collections.";
  }
}
