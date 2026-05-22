import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ result: "Gemini API key missing in .env.local" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Analyze this resume and return:
1. ATS Score out of 100
2. Missing skills
3. Strengths
4. Weaknesses
5. Final suggestions

Resume:
${resume}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ result: text });
  } catch (error) {
    return Response.json({
      result: "AI error. Check API key or Gemini model.",
    });
  }
}