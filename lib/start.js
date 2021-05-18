// const program = require("commander")
import program from "commander"
import imageminJpegtran from "imagemin-jpegtran"
import imageminPngquant from "imagemin-pngquant"
import imagemin from "./imagemin.js"
import log from "../utils/chalk.js"

const isDev = process.env.NODE_ENV !== "production"

export default program
  .command("start")
  .description("start compress images")
  .action(async function () {
    log.green("🎉 欢迎使用imagemin压缩图片~")
    log.green("🎉 不传参使用默认配置处理~")
    log.green("🎉 开始压缩图片------->>>>")

    const INPUT_path = ["./assets/**/*.{jpg,JPG,jpeg,JPEG,png}"]
    const OUTPUT_path = "./zip/"

    const start_time = Date.now()
    const files = await imagemin_fn(INPUT_path, OUTPUT_path)
    const end_time = Date.now()

    const speed_time = end_time - start_time

    console.log(`压缩耗时：` + log.green(speed_time, false) + "ms")
    console.log(`files：${files.length}`)

    // compressImages()
  })

// 执行函数
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
