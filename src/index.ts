import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
dotenv.config()

const configuration = new Configuration({
  basePath: 'https://api.chatanywhere.com.cn',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const Messages: {role: 'user' | 'assistant', content: string}[] = []
;(async ()=>{
  while(true){

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: "Hello world"}],
    });
    const message = chatCompletion.data.choices[0].message 
    // Messages.push(message)
    console.log(message);
  }
})()


// console.log(process.env.OPENAI_API_KEY);