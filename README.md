<div align="center">
  <h1>image-minify-cli</h1>
  <P>
    <a href="https://github.com/JS-banana/image-minify-cli/stargazers" target="_black">
      <img src="https://img.shields.io/github/stars/JS-banana/image-minify-cl?color=%23ffca28&logo=github&style=flat-square" alt="stars" />
    </a>
    <a href="https://www.npmjs.com/package/image-minify-cli" target="_black">
      <img src="https://img.shields.io/npm/v/image-minify-cli.svg?style=flat" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/image-minify-cli" target="_black">
      <img src="https://img.shields.io/npm/dm/image-minify-cli" alt="downloads" />
    </a>
     <a href="https://github.com/JS-banana" target="_black">
      <img src="https://img.shields.io/badge/Github-JS--banana-brightgreen?&logo=github&style=flat-square" alt="author" />
    </a
  </p>
  <img src="imagemin.png" width="600"  alt="logo" />
</div>

<!-- # image-minify-cli -->

## ✨ 描述

`image-minify-cli`是为解决项目使用时手动压缩图片的繁琐操作，通过`cli`命令一键压缩。

建议在发布前执行一次即可，压缩完成后会在当前目录下生成日志`imagemin.log`方便查看。

<!-- ![imagemin](imagemin.png) -->

<!-- ![imagemin-log](imagemin-log.png) -->

## 📦 安装

```shell
pnpm add -D image-minify-cli
# or
yarn add image-minify-cli -D
# or
npm install image-minify-cli -D
```

## 🚀 使用

- ***默认配置***：

  - 支持图片格式：`.{jpg,JPG,jpeg,JPEG,png}`
  - jpg压缩插件：`imagemin-jpegtran`
  - png压缩插件：`imagemin-pngquant`
  - 文件入口：当前目录下的 `./src/assets`
  - 文件出口：同入口（压缩完成后直接替换源文件）

一.***以插件形式使用***

1. 根目录下创建 `imagemin.js` 文件

    ```js
    const imagemin = require("image-minify-cli")
    imagemin({ 
      quality: [0.3, 0.5], 
      input: "./src/asstes", 
      output: "./src" 
    })
    ```

2. 执行脚本

    `node imagemin.js`

二.***命令行使用***

*该功能需要全局安装，推荐先使用第一种方式*

```bash
# 1. 查看版本
imagemin -v
# 2. 查看版本
# 注意空格，编译结果为 [0.3,0.5] 
imagemin --quality 0.3 0.5 # --quality 可简写为 -q
# 3. 图片入口路径
# 注意路径写法
imagemin --input ./src/assets # --input 可简写为 -i
# 4. 图片入口路径。
# 图片出口路径
imagemin --output ./src/assets # --output 可简写为 -o
# 开始压缩
imagemin start
```

```shell
pnpm add image-minify-cli -g
# or
yarn global add image-minify-cli
# or
npm install image-minify-cli -g
```

## ✅ Todo

- [x] 自定义配置
- [x] 命令行动态传参

## 👀 更新日志

- 2021.06.15：自定义配置、命令行动态传参
