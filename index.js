// require("./lib/start")

const useMinImage = require("./lib/start")

/**
 * @example imagemin({quality:[0.3,0.5],input:'./src/asstes',output:'./src'})
 * @param {Object} config quality/input/output
 */
module.exports = async (config) => await useMinImage(config)
