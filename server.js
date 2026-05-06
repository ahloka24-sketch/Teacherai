import express from "express";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

// اقرأ المفتاح من Railway Variables

const API_KEY = process.env.GEMINI_API_KEY;

// اختبار

app.get("/", (req, res) => {

  res.send("Server is running ✔");

});

// AI endpoint

app.post("/chat", async (req, res) => {

  try {

    const prompt = req.body.prompt;

    if (!prompt) {

      return res.status(400).json({ error: "No prompt sent" });

    }

    if (!API_KEY) {

      return res.status(500).json({ error: "GEMINI_API_KEY is missing in Railway Variables" });

    }

    const response = await fetch(

      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          contents: [

            {

              parts: [

                {

                  text: "أنت معلم ذكي. اشرح السؤال التالي خطوة بخطوة:\n" + prompt

                }

              ]

            }

          ]

        })

      }

    );

    const data = await response.json();

    const answer =

      data?.candidates?.[0]?.content?.parts?.[0]?.text ||

      data?.error?.message ||

      "لم يتم الحصول على رد";

    res.json({ text: answer });

  } catch (error) {

    res.status(500).json({

      error: error.message || "Server error"

    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Server running on port " + PORT);

});
