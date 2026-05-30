import axios from "axios";

export const askAi = async (message) => {
  try {
    if (!message || !Array.isArray(message) || message.length === 0) {
      throw new Error("Message array is empty.");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: message,
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "X-OpenRouter-Title": "GenUI", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
      },
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }

    return content;
  } catch (error) {
    console.error("OpenRouter Error: ", error?.response?.data || error.message);
    throw new Error("OpenRouter API Error.");
  }
};
