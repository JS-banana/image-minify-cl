const chalk = require("chalk")
// import chalk from "chalk"
const colors = ["green", "blue", "yellow", "red"]
const consoleColors = {}
/* console color */
colors.forEach((color) => {
  consoleColors[color] = function (text, isConsole = true) {
    return isConsole ? console.log(chalk[color](text)) : chalk[color](text)
  }
})
module.exports = consoleColors
