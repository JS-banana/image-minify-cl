// 打印日志
const fs = require("graceful-fs")
const { promisify } = require("util")
const writeFile = promisify(fs.writeFile)

module.exports = async (outPath, file) => {
  const files = file.map(({ oldData, data, ...args }) => {
    return {
      oldData: oldData.length,
      data: data.length,
      ...args,
    }
  })
  return await writeFile(outPath, JSON.stringify(files, null, 4))
}
