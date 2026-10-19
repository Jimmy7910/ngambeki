require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");
const { Pool } = require("pg");
const crypto = require("crypto");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
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
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const hash = crypto.scryptSync(password, salt, 64);

  const storedHashBuffer = Buffer.from(storedHash, "hex");

  if (
    storedHashBuffer.length !== hash.length ||
    storedHashBuffer.toString("hex") !== storedHash
  ) {
    return false;
  }

  return crypto.timingSafeEqual(hash, storedHashBuffer);
}

app.use(express.json());

const allowedOrigin = "https://ngambeki-production.up.railway.app";

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && origin !== allowedOrigin) {
    return res.status(403).json({
      message: "Origin haijaruhusiwa."
    });
  }

  if (origin === allowedOrigin) {
    res.header("Access-Control-Allow-Origin", allowedOrigin);
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required");
}

app.set("trust proxy", 1);

app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: "user_sessions",
    createTableIfMissing: true
  }),
  name: "ngambeki.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 8 * 60 * 60 * 1000
  }
}));
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

    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    req.session.userId = user.id;
    req.session.email = user.email;

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

   res.json({
      message: "Umeingia kikamilifu.",
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error.message, error.code || "");
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

    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email.trim().toLowerCase(), passwordHash]
    );

    const user = result.rows[0];

    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    req.session.userId = user.id;
    req.session.email = user.email;

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    res.json({
      message: "Akaunti imeundwa na umeingia kikamilifu.",
      user: {
        id: user.id,
        email: user.email
      }
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
app.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.json({
      loggedIn: false
    });
  }

  try {
    const result = await pool.query(
      "SELECT id, email FROM users WHERE id = $1",
      [req.session.userId]
    );

    if (result.rows.length === 0) {
      return req.session.destroy(() => {
        res.clearCookie("ngambeki.sid", {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/"
        });

        res.json({
          loggedIn: false
        });
      });
    }

    res.json({
      loggedIn: true,
      user: {
        id: result.rows[0].id,
        email: result.rows[0].email
      }
    });
  } catch (error) {
    console.error("SESSION CHECK ERROR:", error.message);

    res.status(500).json({
      message: "Imeshindikana kuthibitisha akaunti."
    });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("LOGOUT ERROR:", error.message);

      return res.status(500).json({
        message: "Imeshindikana kutoka kwenye akaunti."
      });
    }

    res.clearCookie("ngambeki.sid", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/"
    });

    res.json({
      message: "Umetoka kwenye akaunti kikamilifu."
    });
  });
});
app.get("/history", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      message: "Ingia kwenye akaunti ili kuona historia yako."
    });
  }

  try {
    const result = await pool.query(
      "SELECT id, question, language, created_at FROM search_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100",
      [req.session.userId]
    );

    return res.json({
      history: result.rows
    });
  } catch (error) {
    console.error("SEARCH HISTORY READ ERROR:", error.message);

    return res.status(500).json({
      message: "Imeshindikana kupata historia yako."
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

    if (req.session.userId) {
      try {
        await pool.query(
          "INSERT INTO search_history (user_id, question, language) VALUES ($1, $2, $3)",
          [req.session.userId, question.trim(), language]
        );
      } catch (historyError) {
        console.error("SEARCH HISTORY SAVE ERROR:", historyError.message);
      }
    }

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
