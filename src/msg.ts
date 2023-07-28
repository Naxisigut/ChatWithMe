/* 通话记录 */
export const messages: Message[] = []

/** 增加用户询问信息
 * 
 * @param msg 
 * @returns 
 */
export const addMsgGo = async (msg: string) => {
  messages.push({
    role: 'user',
    content: msg
  })
  return msg
}

/** 增加bot回答信息
 * 
 * @param msg 
 * @returns 
 */
export const addMsgBack = async (msg: string) => {
  messages.push({
    role: 'assistant',
    content: msg
  })
  return msg
}