# image-minify-cli

## 描述

`image-minify-cli`是为解决项目使用时手动压缩图片的繁琐操作，通过`cli`命令一键压缩。

建议在发布前执行一次即可，压缩完成后会在当前目录下生成日志`imagemin.log`方便查看。

## 安装

`npm install image-minify-cli`

`pnpm add image-minify-cli`

`yarn add image-minify-cli`

## 使用

查看版本：`imagemin -v`

开始压缩：`imagemin start`

默认配置：

jpg压缩插件：`imagemin-jpegtran`
png压缩插件：`imagemin-pngquant`

文件入口：当前目录下的 `./src.assets`
文件出口：同入口（压缩完成后直接替换源文件）

```js
const imagemin_fn = async (input, output) => {
  const result = await imagemin(input, {
    destination: output,
    plugins: [
      imageminJpegtran({
        progressive: true, // 开启无损压缩
        arithmetic: true, // 开启算法
      }),
      imageminPngquant({
        // speed: 10,
        quality: [0.3, 0.5], // 压缩质量
      }),
    ],
  })
  return result
}
```
