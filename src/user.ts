import inquirer from 'inquirer';
import { addMsgGo } from './msg.js';

export const userInput = async () => {
  const input = await inquirer.prompt({
    name: 'question', message: 'You: ', default: 'vue的作者是？', prefix: ''
  })
  return addMsgGo(input.question)
}