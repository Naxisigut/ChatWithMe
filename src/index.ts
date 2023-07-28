import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
// import readline from 'readline-promise';  // @ts-ignore
import inquirer from 'inquirer';
dotenv.config()

const configuration = new Configuration({
  basePath: 'https://api.chatanywhere.com.cn',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const messages: {role: 'user' | 'assistant', content: string}[] = []
;(async ()=>{
  while(true){

    const userInput = await inquirer.prompt({
      name: 'question', message: 'You: '
    })
    messages.push({
      role: 'user', content: userInput.question
    })


    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const answer = chatCompletion.data.choices[0].message?.content!
    messages.push({
      role: 'assistant',
      content: answer
    })
    console.log('bot: ' + answer);
  }
})()


// console.log(process.env.OPENAI_API_KEY);