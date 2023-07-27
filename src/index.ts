import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import readlineSync from 'readline-sync';
import readline from 'readline-promise';  // @ts-ignore
dotenv.config()
// process.stdin.setEncoding('utf8');

// readlineSync.setDefaultOptions({
  // print: (display, encoding)=>{
  //   console.log("display =", display)
  //   console.log("encoding =", encoding)
  // }
// })

const configuration = new Configuration({
  basePath: 'https://api.chatanywhere.com.cn',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// async function getUserInput() {
//   try {
//     const userInput = await rl.questionAsync('You: ');
//     console.log(userInput);
//   } catch (error) {
//     console.error(error);
//   } 
// }

// getUserInput()


const messages: {role: 'user' | 'assistant', content: string}[] = []
;(async ()=>{
  while(true){

    // const userInput = readlineSync.question('You: ', {})
    const userInput = await rl.questionAsync('You: ')
    messages.push({
      role: 'user', content: userInput
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