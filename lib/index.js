;("use strict")

//<>包裹的为必选参数
//[]为选填参数
//带有...的参数为剩余参数的集合。

import program from "commander"
// 1. version
import "./common.js"
// 2. start
import "./start.js"
// 该命令要放在最后
program.parse(process.argv)
