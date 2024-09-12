import { config } from "dotenv";
import OpenAI from "openai";
import { pipeline } from "node:stream/promises"

config()

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
export const handleGPT = async (req, res) => {
    try {
        const { message, prevMessage } = req.body
        if (!message) {
            return res.status(400).json('please enter a message')
        }
        const payload = prevMessage ? [
            {
                role: "system",
                content: "You are an expert software developer. Assist users with writing, debugging, and optimizing code in various programming languages. Explain your solutions clearly and help users understand the concepts behind the code."
            },
            ...prevMessage,
            {
                role: "user",
                content: `${message}`,
            },
        ] : [
            {
                role: "system",
                content: "You are an expert software developer. Assist users with writing, debugging, and optimizing code in various programming languages. Explain your solutions clearly and help users understand the concepts behind the code."
            },
            {
                role: "user",
                content: `${message}`,
            },
        ]

        const completion = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: payload,
            stream: true,
        })

        for await (const chunk of completion) {
            res.write(chunk.choices[0]?.delta.content || "");
        }
        res.end();
    } catch (err) {
        res.status(500).send(err)
    }
}
