require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");
const { Pool } = require("pg");
const crypto = require("crypto");
const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'sw',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`)
  .then(() => console.log("DATABASE TABLES OK"))
  .catch(() => console.log("DATABASE TABLES ERROR"));

const PORT = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function hashPassword(password) {
  
function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(":");

  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(storedHash, "hex")
  );
}
const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email na password vinahitajika."
    });
  }

  try {
    const result = await pool.query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email.trim().toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Email au password si sahihi."
      });
    }

    const user = result.rows[0];

    if (!verifyPassword(password, user.password_hash)) {
      return res.status(401).json({
        message: "Email au password si sahihi."
      });
    }

    res.json({
      message: "Umeingia kikamilifu.",
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR");
    res.status(500).json({
      message: "Imeshindikana kuingia."
    });
  }
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email na password vinahitajika."
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password iwe na angalau herufi 8."
    });
  }

  try {
    const passwordHash = hashPassword(password);

    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email.trim().toLowerCase(), passwordHash]
    );

    res.json({
      message: "Akaunti imeundwa."
    });

  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email hiyo tayari imesajiliwa."
      });
    }

    console.error("SIGNUP ERROR");
    res.status(500).json({
      message: "Imeshindikana kutengeneza akaunti."
    });
  }
});
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
