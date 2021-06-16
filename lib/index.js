;("use strict")

//<>包裹的为必选参数
//[]为选填参数
//带有...的参数为剩余参数的集合。
const program = require("commander")
const useMinImage = require("./start")

let optionConfig = {
  input: "./src/assets",
  output: "",
  quality: [0.3, 0.5],
}

async function main() {
  program
    .version(require("../package.json").version, "-v,--version")
    .option("-q,--quality <numbers...>", "设置压缩图片质量。")
    .option("-i,--input <input>", "图片入口路径。")
    .option("-o,--output <output>", "图片出口路径。")
    .command("start")

  await program.parseAsync(process.argv)

  console.log(program.args)

  const { quality, input, output, version } = program.opts()
  // console.log(quality, input, output)

  if (quality && (!Array.isArray(quality) || quality.length !== 2)) {
    throw Error(
      "Set the dithering level using a fractional number between 0 (none) and 1 (full). @example [0.3, 0.5]"
    )
  }

  // { input: './src/assets/', output: '', quality: [ 0.2, 0.5 ] }
  optionConfig = {
    input: input || optionConfig.input,
    output: output || optionConfig.output,
    quality: quality ? quality.map((n) => Number(n)) : optionConfig.quality,
  }

  if (program.args.includes("start")) {
    useMinImage(optionConfig)
  }
  // useMinImage(optionConfig)
}

module.exports = main()
