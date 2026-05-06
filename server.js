import express from "express";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

// اختبار

app.get("/", (req, res) => {

  res.send("Server is running ✔");

});

// AI endpoint

app.post("/chat", async (req, res) => {

  const prompt = req.body.prompt;

  if (!prompt) {

    return res.json({ error: "No prompt sent" });

  }

  // هنا لاحقًا تربط Gemini API

  res.json({

    text: "وصلني السؤال: " + prompt

  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});
