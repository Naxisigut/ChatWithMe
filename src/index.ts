// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const chatCompletion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{role: "user", content: "Hello world"}],
// });
// console.log(chatCompletion.data.choices[0].message);
import dotenv from 'dotenv';
dotenv.config()

console.log(process.env);
console.log(typeof process.env.test);