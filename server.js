import express from "express";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

app.post("/chat", async (req, res) => {

  try {

    const prompt = req.body.prompt;

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

              parts: [{ text: prompt }]

            }

          ]

        })

      }

    );

    const data = await response.json();

    res.json({

      text:

        data?.candidates?.[0]?.content?.parts?.[0]?.text ||

        "No response"

    });

  } catch (err) {

    res.status(500).json({ error: err.message });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Server running ✔");

});
