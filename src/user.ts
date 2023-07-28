import inquirer from 'inquirer';
import { addMsgGo, clearRecord } from './msg.js';

export const userInput = async () => {
  const input = await inquirer.prompt({
    name: 'question', message: 'You: ', default: 'vue的作者是？', prefix: ''
  })
  return addMsgGo(input.question)
}

/** 用户输入特定字符检测
 *  
 * @param command 
 * return 是否需要获取回答
 */
export const inputCheck = (command: string) => {
  switch (command) {
    case 'exit':
      process.exit()
    case 'clear':
      clearRecord()
      return false
    default:
      return true
  }
}