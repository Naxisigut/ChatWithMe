## Description

## Tech Stack

1. openAI

2. dot-env  添加环境变量

   `npm i dotenv`

   .env

3. colors

4. ora

5. inquirer

6. rollup

   - `npm i -D rollup`
   - package.json的scripts中添加`"build": "rollup -c rollup.config.js"`
   - package.json设置type为module：否则rollup无法识别import
   - `npm i -D @rollup/plugin-typescript` ： 否则无法打包ts代码
   - ts.config.js的module改为NodeNext：否则打包出来的代码有问题，可能会有代码无法打包进去

7. npm link

   - package.json 增加bin路径， 修改name（会被默认link成为命令）
   - `npm i -D rollup-plugin-add-shebang`
   - rollup.config.js 增加插件rollup-plugin-add-shebang， 并配置路径，用于在每次构建时在文件头增加shebang

## Project Init

1. git

   - `git init`
   - set remote repository
   - .gitignore

2. npm

   - `npm init`

3. typescript

   `npm install -g typescript`

   `npm install -g ts-node`

   `npm install -D tslib @types/node`： node ts 类型提示
   
   `ts --init`:  generate tsconfig.json