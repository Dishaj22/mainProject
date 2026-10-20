const express = require("express");
require("dotenv").config();

const app = express();

// Load API Key from .env
const API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(express.static("public"));
app.use(express.json());

// GET Route
app.get("/", (req, res) => {
    res.send("Ask Gemini Server is Running...");
});

// POST Route
app.post("/ask", async (req, res) => {

    try {

        const question = req.body.question;

        // Validation
        if (!question) {
            return res.json({
                answer: "Please enter a question."
            });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
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
                                    text: question
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data);

        // Gemini API Error
        if (data.error) {
            return res.json({
                answer: data.error.message
            });
        }

        const answer =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No answer received.";

        res.json({
            answer: answer
        });

    } catch (error) {

        console.error(error);

        res.json({
            answer: "Something went wrong!"
        });

    }

});

// Start Server
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});