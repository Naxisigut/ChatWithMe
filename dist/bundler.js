import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import colors from 'colors';
import inquirer from 'inquirer';
import ora from 'ora';

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

dotenv.config();
colors.enable();
const configuration = new Configuration({
    basePath: 'https://api.chatanywhere.com.cn',
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const messages = [];
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    while (true) {
        const userInput = yield inquirer.prompt({
            name: 'question', message: 'You: ', default: 'vue的作者是？', prefix: ''
        });
        messages.push({
            role: 'user', content: userInput.question
        });
        const spinner = ora('Loading unicorns').start();
        const chatCompletion = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });
        const answer = (_a = chatCompletion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        messages.push({
            role: 'assistant',
            content: answer
        });
        spinner.stop();
        console.log(` ${'Bot: '.rainbow} ${answer.green}\r`);
        // console.log(' ' + 'Bot: '.bgBlue + ' ' + answer.green);
    }
}))();
// console.log(process.env.OPENAI_API_KEY);
