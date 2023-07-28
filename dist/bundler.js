#!/usr/bin/env node

import dotenv from 'dotenv';
import colors from 'colors';
import { Configuration, OpenAIApi } from 'openai';
import ora from 'ora';
import inquirer from 'inquirer';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/* 通话记录 */
let messages = [];
/** 增加用户询问信息
 *
 * @param msg
 * @returns
 */
const addMsgGo = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    messages.push({
        role: 'user',
        content: msg
    });
    return msg;
});
/** 增加bot回答信息
 *
 * @param msg
 * @returns
 */
const addMsgBack = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    messages.push({
        role: 'assistant',
        content: msg
    });
    return msg;
});
/** 清空记录
 *
 */
const clearRecord = () => {
    messages.length = 0;
};

// let spinner: Ora 
// export const loadingStart = () => {
//   spinner = ora('loading').start()
// } 
// export const loadingStop = () => {
//   spinner.stop()
// }
// let spinner
let loading;
const spinner = {
    start: () => {
        loading = ora('loading').start();
    },
    stop: () => {
        loading.stop();
    }
};

colors.enable();
let Bot = undefined;
/** 初始化bot
 *
 */
const initBot = () => {
    const configuration = new Configuration({
        basePath: 'https://api.chatanywhere.com.cn',
        apiKey: process.env.OPENAI_API_KEY,
    });
    Bot = new OpenAIApi(configuration);
};
/** 调用openAi接口，获取回答
 *
 * @param messages
 * @returns
 */
const getBotAnswer = (messages) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    spinner.start();
    const chatCompletion = yield Bot.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
    });
    spinner.stop();
    const answer = (_a = chatCompletion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
    return addMsgBack(answer);
});
/** 在控制台输出回答
 *
 * @param answer
 */
const botAnswer = (answer) => {
    console.log(` ${'Bot: '.rainbow} ${answer.green}\r`);
};

const userInput = () => __awaiter(void 0, void 0, void 0, function* () {
    const input = yield inquirer.prompt({
        name: 'question', message: 'You: ', prefix: ''
    });
    return addMsgGo(input.question);
});
/** 用户输入特定字符检测
 *
 * @param command
 * return 是否需要获取回答
 */
const inputCheck = (command) => {
    switch (command) {
        case 'exit':
            process.exit();
        case 'clear':
            clearRecord();
            return false;
        default:
            return true;
    }
};

dotenv.config();
initBot();
(() => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        const input = yield userInput();
        const isNeedAnswer = inputCheck(input);
        if (!isNeedAnswer)
            continue;
        const answer = yield getBotAnswer(messages);
        botAnswer(answer);
    }
}))();
// console.log(process.env.OPENAI_API_KEY);
