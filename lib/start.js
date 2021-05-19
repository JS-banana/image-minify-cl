const program = require("commander")
const imageminJpegtran = require("imagemin-jpegtran")
const imageminPngquant = require("imagemin-pngquant")
const imagemin = require("./imagemin.js")
const log = require("../utils/chalk.js")
const fs = require("graceful-fs")
const { promisify } = require("util")
const globby = require("globby")
const ora = require("ora")

const writeFile = promisify(fs.writeFile)

// const INPUT_path = ["./assets/**/*.{jpg,JPG,jpeg,JPEG,png}"]
const INPUT_path = "./src/assets"
const OUTPUT_path = ""

module.exports = program
  .command("start")
  .description("start compress images")
  .option("-n,--quality <numbers...>")
  .action(async function (args) {
    // console.log(args)
    console.log("✅ " + log.green("欢迎使用imagemin压缩图片~", false))
    console.log("✅ " + log.green("不传参使用默认配置处理~", false))
    console.log("默认配置：")
    console.log("jpg格式：插件（imagemin-jpegtran）、压缩质量（无损压缩、开启算法）")
    console.log("png格式：插件（imagemin-pngquant）、压缩质量（[0.3, 0.5]）")
    // console.log("✅ " + log.blue("开始压缩图片...", false))
    const process = ora("✅ " + log.blue("开始压缩图片...", false))

    process.start()
    process.text = "正在压缩..."
    process.color = "cyan"
    const start_time = Date.now()

    const filePaths = await completeDir(INPUT_path, OUTPUT_path)
    const files = filePaths.flat(Infinity) // 数组扁平化

    const end_time = Date.now()
    process.text = "完成"
    process.succeed()

    const speed_time = end_time - start_time // 记录耗时

    console.log("✅ " + log.yellow("压缩成功↓↓↓", false))
    console.log("-------------------")
    console.log(`压缩耗时：` + log.red(speed_time, false) + " ms")
    console.log("-------------------")
    console.log(`文件数量：` + log.red(files.length, false) + " 个")
    console.log("-------------------")

    const oldDataSize = files.reduce(
      (total, currentValue) => total + currentValue.oldData.length,
      0
    )
    const currentDataSize = files.reduce(
      (total, currentValue) => total + currentValue.data.length,
      0
    )
    const percent = 100 - Math.floor((currentDataSize / oldDataSize) * 100) + "%"
    console.log("原始文件大小： " + log.red(formatBytes(oldDataSize), false))
    console.log("压缩之后大小： " + log.red(formatBytes(currentDataSize), false))
    console.log("压缩比： " + log.red(percent, false))

    console.log("-------------------")
    console.log("✅ " + log.blue("开始打印日志...", false))
    await writeFileToLog("./imagemin.log", files)
    console.log("✅ 打印完成： " + log.yellow("imagemin.log", false))
  })

// 文件夹层级

async function completeDir(INPUT_path, outPath) {
  if (!INPUT_path) {
    throw new TypeError(`Expected an path!`)
  }
  // if (outPath) {
  // }
  let filePaths = await globby(INPUT_path, { onlyDirectories: true })
  filePaths = filePaths.map((path) => `./${path}/`)
  filePaths.push(INPUT_path + "/")

  return Promise.all(
    filePaths.map(async (path) => {
      const input = path + "*.{jpg,JPG,jpeg,JPEG,png}"
      const files = await imagemin_fn([input], path)
      return files
    })
  )
}

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

// 打印日志
async function writeFileToLog(outPath, file) {
  const files = file.map(({ oldData, data, ...args }) => {
    return {
      oldData: oldData.length,
      data: data.length,
      ...args,
    }
  })
  await writeFile(outPath, JSON.stringify(files, null, 4))
}

// Javascript中将字节大小转换为的KB、MB、GB
function formatBytes(a, b) {
  if (0 == a) return "0 Bytes"
  var c = 1024,
    d = b || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c))
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}
