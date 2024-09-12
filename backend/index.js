import { config } from "dotenv";
import express from "express";
import cors from 'cors'
import { handleGPT } from "./controller/gpt.js";

config()

const app = express()
const port = process.env.DEV_PORT || 8000

app.use(cors())

app.use(express.json())

app.post('/', handleGPT)

app.listen(port, () => console.log(`listening on port ${port}`))
