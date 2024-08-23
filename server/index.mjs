import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";
const app = express();


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes"
});


app.use(limiter);

dotenv.config();

console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
	model: "gpt-4o-mini",
	messages: [
		{ role: "system", content: "You are a helpful assistant." },
		{
			role: "user",
			content: "Write a haiku about recursion in programming.",
		},
	],
});

console.log(completion.choices[0].message);
app.listen(3001, () => {
	console.log("listening on 3001");
});
