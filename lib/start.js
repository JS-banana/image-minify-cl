const log = require("../utils/chalk.js")
const ora = require("ora")
const formatBytes = require("../utils/formatBytes")
const writeFileToLog = require("../utils/writeFileToLog")
const minImage = require("../core/minImage")

// const INPUT_path = ["./assets/**/*.{jpg,JPG,jpeg,JPEG,png}"]

module.exports = async function useMinImage(config) {
  // 启动日志输出
  startLog()
  // ora
  const process = ora("✅ " + log.blue("开始压缩图片...", false))
  process.start()
  process.text = "正在压缩..."
  process.color = "cyan"

  try {
    const start_time = Date.now()
    const filePaths = await minImage(config)
    // 输出信息
    outInfo(filePaths, process, start_time)
  } catch (error) {
    // 错误捕获
    process.text = "错误"
    process.stop()
    log.red("压缩失败！！！")
    console.log(error)
  }
}

// 2.
function startLog() {
  console.log("✅ " + log.green("欢迎使用imagemin压缩图片~", false))
  console.log("✅ " + log.green("不传参使用默认配置处理~", false))
  console.log("默认配置：")
  console.log("jpg格式：插件（imagemin-jpegtran）、压缩质量（无损压缩、开启算法）")
  console.log("png格式：插件（imagemin-pngquant）、压缩质量（[0.3, 0.5]）")
  // console.log("✅ " + log.blue("开始压缩图片...", false))
}

// 3.
async function outInfo(filePaths, process, start_time) {
  // 使用 Infinity，可展开任意深度的嵌套数组
  const files = filePaths.flat(Infinity)

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

  const oldDataSize = files.reduce((total, currentValue) => total + currentValue.oldData.length, 0)
  const currentDataSize = files.reduce((total, currentValue) => total + currentValue.data.length, 0)
  const percent = 100 - Math.floor((currentDataSize / oldDataSize) * 100) + "%"
  console.log("原始文件大小： " + log.red(formatBytes(oldDataSize), false))
  console.log("压缩之后大小： " + log.red(formatBytes(currentDataSize), false))
  console.log("压缩比： " + log.red(percent, false))

  console.log("-------------------")
  console.log("✅ " + log.blue("开始打印日志...", false))
  await writeFileToLog("./imagemin.log", files)
  console.log("✅ 打印完成： " + log.yellow("imagemin.log", false))
}
