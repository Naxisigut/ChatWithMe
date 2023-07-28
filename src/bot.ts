import colors from 'colors';
import { Configuration, OpenAIApi } from 'openai';
import { addMsgBack } from './msg.js';
import { spinner } from './loading.js';


colors.enable()
let Bot: OpenAIApi | undefined = undefined

/** 初始化bot
 * 
 */
export const initBot = () => {
  const configuration = new Configuration({
    basePath: 'https://api.chatanywhere.com.cn',
    apiKey: process.env.OPENAI_API_KEY,
  });
  Bot = new OpenAIApi(configuration)
}

/** 调用openAi接口，获取回答
 * 
 * @param messages 
 * @returns 
 */
export const getBotAnswer = async (messages: Message[]) => {
  spinner.start()
  const chatCompletion = await Bot.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  spinner.stop()
  const answer = chatCompletion.data.choices[0].message?.content!
  return addMsgBack(answer)
}

export const botAnswer = (answer: string) => {
  console.log(` ${'Bot: '.rainbow} ${answer.green}\r`);
}



