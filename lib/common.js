// common
import program from "commander"
import packageObj from "../package.json"

// version 版本信息
export default program.version(packageObj.version, "-v,--version")
