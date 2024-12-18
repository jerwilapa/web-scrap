const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

// Function to fetch webpage content
exports.fetchWebContent = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $("body").text(); // Extract main body text
  } catch (error) {
    throw new Error("Failed to fetch webpage content");
  }
};

// Function to summarize text using ChatGPT API
exports.summarizeText = async (text) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // You can use "gpt-4" if available
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes text.",
          },
          {
            role: "user",
            content: `Summarize this text:\n\n${text}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Include API key
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      "Error summarizing text:",
      error.response?.data || error.message
    );
    throw new Error("Failed to summarize text");
  }
};
