import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import readlineSync from 'readline-sync';
dotenv.config()

const configuration = new Configuration({
  basePath: 'https://api.chatanywhere.com.cn',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const messages: {role: 'user' | 'assistant', content: string}[] = []
;(async ()=>{
  while(true){

    const userInput = readlineSync.question('You: ')
    messages.push({
      role: 'user', content: userInput
    })

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    const message = chatCompletion.data.choices[0].message?.content!
    messages.push({
      role: 'assistant',
      content: message
    })
    console.log('mentor: ' + message);
    // readlineSync.
    // console.log(message);
  }
})()


// console.log(process.env.OPENAI_API_KEY);