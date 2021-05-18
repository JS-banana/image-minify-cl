// common
const program = require("commander")

// version 版本信息
module.exports = program.version(require("../package.json").version, "-v,--version")
