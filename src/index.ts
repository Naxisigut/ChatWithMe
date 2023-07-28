import dotenv from 'dotenv';
import { initBot, getBotAnswer, botAnswer } from './bot.js';
import { messages } from './msg.js';
import { userInput } from './user.js';
import { spinner } from './loading.js';
dotenv.config()
initBot()

;(async ()=>{
  while(true){
    await userInput()
    spinner.start()
    const answer = await getBotAnswer(messages)
    spinner.stop()
    botAnswer(answer)
  }
})()


// console.log(process.env.OPENAI_API_KEY);