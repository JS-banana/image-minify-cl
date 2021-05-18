//fs 增强模块 https://www.npmjs.com/package/fs-extra
const fs = require("fs-extra");

//写入文件
function write(path, str) {
  fs.writeFileSync(path, str);
}
//拷贝文件
function copyTemplate(from, to) {
  from = path.join(__dirname, from);
  write(to, fs.readFileSync(from, "utf-8"));
}
