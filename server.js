require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  next();
});

app.use(express.static(__dirname));

app.post("/ask", async (req, res) => {
  const question = req.body.question;
  const language = req.body.language || "sw";

  if (!question || !question.trim()) {
    return res.json({
      answer: "Tafadhali niambie unahitaji msaada gani 😊"
    });
  }

  try {
    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions:
  `Wewe ni Ngambeki AI. Jibu kwa lugha iliyochaguliwa na mtumiaji.
   Lugha iliyochaguliwa ni: ${language}.
  Jibu kwa lugha hiyo kwa uwazi, kwa heshima, na kwa hatua zinazoeleweka.`,
      input: question.trim()
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);

    if (error.status === 429 || error.code === "credit_balance_exhausted") {
      return res.status(429).json({
        answer: "AI_CREDITS_EXHAUSTED"
      });
    }

    res.status(500).json({
      answer: "AI_UNAVAILABLE"
    });
  }
});

app.listen(PORT, () => {
  console.log("NGAMBEKI AI server running on port " + PORT);
});
