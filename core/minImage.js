// 文件夹层级
const path = require("path")
const globby = require("globby")
const imageminJpegtran = require("imagemin-jpegtran")
const imageminPngquant = require("imagemin-pngquant")
const imagemin = require("./imagemin")

module.exports = async function completeDir({ input, output, ...agrs }) {
  if (!input) {
    throw new TypeError(`Expected an path!`)
  }
  // if (outPath) {
  // }
  let filePaths = await globby(input, { onlyDirectories: true })

  if (!filePaths) return Promise.reject("该文件夹为空！")

  filePaths = filePaths.map((path) => `./${path}/`)
  filePaths.push(input + "/")

  // output
  return Promise.all(
    filePaths.map(async (current_path) => {
      const current_input = current_path + "*.{jpg,JPG,jpeg,JPEG,png}"
      let current_output = ""

      if (output) {
        current_output = current_path.replace(input, path.resolve(process.cwd(), output))
      }

      const files = await imagemin_fn([current_input], current_output, agrs)
      return files
    })
  )
}

// 执行函数
const imagemin_fn = async (input, output, { quality } = agrs) =>
  await imagemin(input, {
    destination: output,
    plugins: [
      imageminJpegtran({
        progressive: true, // 开启无损压缩
        arithmetic: true, // 开启算法
      }),
      imageminPngquant({
        // speed: 10,
        quality, // 压缩质量
      }),
    ],
  })
