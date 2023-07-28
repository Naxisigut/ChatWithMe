import dotenv from 'dotenv';
import { initBot, getBotAnswer, botAnswer } from './bot.js';
import { messages } from './msg.js';
import { userInput, inputCheck } from './user.js';
dotenv.config()
initBot()

;(async ()=>{
  while(true){
    const input = await userInput()

    const isNeedAnswer = inputCheck(input)
    if(!isNeedAnswer)continue
    
    const answer = await getBotAnswer(messages)
    botAnswer(answer)
  }
})()


// console.log(process.env.OPENAI_API_KEY);