import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const checkGeminiAction = async (message: string) => {
  const prompt = `
    You are a friendly, motivational fitness coach chatbot inside a workout tracker.
    Based on the user promt, determine if the user wants you to build a workout routine or not.
    Then only answer with "yes" or "no" and nothing else.
    User Promt: ${message}
  `;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

export const getGeminiMsg = async (message: string) => {
  const prompt = `
    You are a friendly, motivational fitness coach chatbot.
    Only talk about workouts, gym routines, exercise form, and nutrition for fitness. If the user asks about anything else, politely decline to answer and move on.
    However if the user greets you, you can respond with a friendly greeting and move on to fitness topics
    Answer the questions in short.
    Don't write lengthy things. Don't use formatting like bold, italics, underline, title, H1, H2, etc.
    Do not include Markdown or HTML in your response.
    Only answer in simple text and if necessary use short lists with bullet points or numbers.
    If the user asks you to create a workout routine, include realistic sets with lbs and reps. Only include the following exercises: Bicep Curl, Hammer Curl, Leg Extension, Calf Extension.
    Don't use the same sets like same lbs values.
    Question: ${message}
  `;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  let hasAction = false;
  const isActionFromAI = await checkGeminiAction(message);
  if (isActionFromAI?.trim().toLowerCase() === 'yes') {
    hasAction = true;
  } else {
    hasAction = false;
  }

  const actionData = getGeminiMsgData(response.text ?? '');

  const returnData = {
    text: response.text,
    hasAction: hasAction,
    actionData: actionData,
  };

  return returnData;
};

export const getGeminiMsgData = async (message: string) => {
  const prompt = `
    Extract the information from the message and return a JSON object.
    Respond only with the JSON object and nothing else. 
    The JSON object should have the exact following structure:
    {
      "exerciseTitle": "string (e.g., Workout Day 1)",
      "exerciseList": [
        {
          "title": "string (exercise name)",
          "sets": [
            { "lbs": number, "reps": number }
          ]
        }
      ]
    }
    Message: ${message}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  let rawText =
    response.text ?? response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    rawText = rawText.replace(/```json\s*|\s*```/g, '').trim();

  let planData;
  try {
    planData = JSON.parse(rawText);
  } catch (err) {
    console.error('Failed to parse JSON:', err);
    planData = null;
  }

  return planData;
};
