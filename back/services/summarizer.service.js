const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

exports.fetchWebContent = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $("body").text(); // Extract main body text
  } catch (error) {
    throw new Error("Failed to fetch webpage content");
  }
};

exports.summarizeText = async (text) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `Summarize this text:\n\n${text}`,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Include API key
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    throw new Error("Failed to summarize text");
  }
};
